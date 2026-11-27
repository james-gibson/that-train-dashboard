---
title: RNG comprehension tests
description: Six probes that test our model of OpenTTD's random generator before anything is built on it. Stage: design.
order: 4
updated: 2026-11-26
stage: design
---

# RNG comprehension tests

**Question.** Does the team's model of OpenTTD's random generator survive measurement — and which
claim fails first?

Three things the team wants rest on the same four claims: a desync check it can trust, forks it can
reason about, and a chunk boundary it can defend. The claims are cheap to state and none of them is
tested. These probes test the model before the work that depends on it.

## The model under test

| Claim | What it says | Read from |
| --- | --- | --- |
| C1 | The generator is an event counter, not a clock: draws happen at event sites, so the count is a property of world content, not of elapsed time. | [`Randomizer::Next`](https://github.com/OpenTTD/OpenTTD/blob/d48d693d7f/src/core/random_func.cpp#L41-L48), [`RunTileLoop`](https://github.com/OpenTTD/OpenTTD/blob/d48d693d7f/src/landscape.cpp#L805-L844) |
| C2 | The step is a bijection on 2⁶⁴, so any two `(state[0], state[1])` pairs imply an exact draw count and the earlier state can be recovered. | same step |
| C3 | A release build checks one 32-bit word, every `sync_freq` frames (100 by default), and only if the client reaches the check. | [`SendSync`](https://github.com/OpenTTD/OpenTTD/blob/d48d693d7f/src/network/network_server.cpp#L674-L687), [`NETWORK_SEND_DOUBLE_SEED`](https://github.com/OpenTTD/OpenTTD/blob/d48d693d7f/src/network/network_internal.h#L20-L37) |
| C4 | A draw can be attributed to a call site and to a company. Whether it is attributable to a *company* is the open measurement. | the `RANDOM_DEBUG` trace |

C1 and C2 are why a draw count can be recovered at all. C3 is the whole of the multiplayer safety
argument. C4 decides whether per-company streams are worth a patch.

## The harness

Railhead at `6158e15` gives three things free: a sealed start state whose replay recomputes a
checksum ([proof of play](https://james-gibson.github.io/le.railhead/verify/proof-of-play)), forks
that are already reseeded and budgeted, and `gamespeed 0` at 3,000–5,000 game days a second. It does
not give a draw trace. That is a `-DRANDOM_DEBUG` build, which also switches on the per-frame,
double-word sync a release build does not have — so the census probes read a different engine from
the one the players ran. The fork probe does not: reseed is Railhead's own patch.

One gate matters more than the flag. `Random()` only writes a line when `_networking` is on **and a
game client is attached** (or, on a server, client socket 0 is live), so an arm driven through the
admin port alone records an empty trace for reasons that have nothing to do with the generator. A
spectator client has to be joined before the first census or the null result lies.

Cost first: one engine build, four small scenarios, one afternoon. Nothing here needs a second
machine, and nothing here is a finding.

## The probes

**P1 — the prediction sheet.** Before any probe runs, write the verdict of each one below from the
source alone: pass or fail, and the number. Score them after the runs and publish the misses, not
the score. The environment's own move applies — abstention is an answer, and a confident wrong
answer is worth less than an admitted unknown. A census tests the engine; this tests the model of
it, and the two failures are different findings.

**P2 — the null map.** Three predictions on a 64×64 grass map with no towns, industries, trees or
vehicles, no GRF setting the ambient-sound misc bit, and disasters off. First, 10,000 ticks (about
135 game days) leave `state[0]` unchanged and the trace empty. Second, 60,000 ticks (about 810 days)
produce **at most one** draw — from the disaster timer, which reseeds its own delay before it checks
whether disasters are enabled, so the draw exists whatever the setting. Third, set a NewGRF misc bit
that enables the ambient-sound callback and the trace gains one entry per visited clear tile:
sixteen a tick at 64², 65,536 at 4096², plus tile 0 once every 256 ticks. The draw is spent before
the callback checks whether sound is on. Pass if each delta is exact; a single unexplained entry is
the finding.

**P3 — the census.** One 300-day task under `-DRANDOM_DEBUG` with a client attached, bucketed by
call site, by `_current_company`, and by whether a command ran that frame. Also record trace bytes
per game day and draws per command, because that prices the "log the draws" proposal before anyone
designs it.

Verdict rule fixed before the run: if fewer than half the draws are company-attributed, per-company
streams are cosmetic and this page says so. If more than half are, the prediction was wrong and
that is the finding.

**P4 — rewind is a counter, not a world.** From a later state pair `(a, b)`, invert the step with
`s = rotl(b + 1, 3)` and `t = rotl(a − s − 1, 7) ⊕ 0x1234567F`, and check three things: `(s, t)`
equals the earlier pair taken from the savegame's `DATE` chunk; the step count equals the number of
trace entries between the frames; and the set of call sites is non-empty. A rewind of zero steps is
a reset, not a quiet world. This is the only probe that derives a draw count from data a savegame
already holds.

**P5 — one word, one hundred frames.** Build a pair of states with equal `state[0]` and different
`state[1]`: from `(s, t)`, take `s′ = s + 1` and
`t′ = rotl(rotr(t ⊕ 0x1234567F, 7) − 1, 7) ⊕ 0x1234567F`. Run both through a release build and a
`RANDOM_DEBUG` build. Prediction: release accepts the pair and debug rejects it, because the second
word is only sent when `NETWORK_SEND_DOUBLE_SEED` is defined, and it is defined only under
`RANDOM_DEBUG`. If release accepts, "the client would notice" is a sampled claim and this page stops
making it.

**P6 — how far a reseed spreads.** Railhead reseeds every fork, so the perturbation costs nothing to
obtain. Fork one task at one tick, reseed, and run both arms 7,400 ticks (about 100 days) with no
input; record the first divergent tick, the first divergent tile and the divergent area at the end.
Repeat on four content classes: empty, one town, one industry, one train. Prediction: the empty map
never diverges; the town diverges at its first growth draw; the industry at its production draw; the
train only through a stop or a breakdown. That ordering is the content ordering of the stream, and
it is what "a fork shows a possible future" has never priced. Which generators the patch moves is a
measurement, not an assumption.

## The counter-case

Every probe can pass and the study still fail. If P3 confirms the prediction, the model is right and
the reason for a per-company split is gone — the value of the study is that it kills the idea for
the price of one build. The census also describes the engine we built, not the game we play: the
flag is ours, and a number taken on our build is not a fact about OpenTTD until the patch is pinned
and diffed the way Railhead is.

The residue no probe here removes: none of them can say which tile diverged. Rewind counts draws,
the trace names a call site, and a checkpoint diff names a tile. Three instruments, three answers,
and no probe substitutes one for another.

## Provenance and status

- OpenTTD 16.0 at `d48d693d7f`, the pinned submodule.
- Railhead `6158e15`, the pin these docs publish against; its engine patches are the harness P6
  runs on.
- No run is recorded, so none of the four fields in [what we record](/ops/data) exists yet. The
  first arm fills the version, the map and seed, the scenario file and the dashboard commit; until
  then this page is a design and nothing on it is a finding.
