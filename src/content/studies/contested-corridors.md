---
title: Contested corridors
description: A dated pre-plan, a cheap triage tier, and a frontier call only on escalation — against a script fleet that collides with itself. Stage: design.
order: 5
updated: 2026-11-26
stage: design
---

# Contested corridors

**Question.** When three companies converge on the same town, does a dated pre-plan plus a cheap
triage tier beat the scripts' race to lay track first?

The arena's own record says the scripts win: AAAHogEx ended at about £180M against £41.3M for the
best model, and five of eleven scripts beat it in every seed. The scripts win because they route —
town by population, station to station, under a profit rule — and a frontier model laying tiles by
hand is competing on the one axis it loses. What the scripts cannot do is notice that three of them
have reached the same conclusion. The collision is a negative externality nobody prices, and by the
time the track meets, the capital is spent.

## The decomposition

| Tier | Runs on | Job | What it costs | Failure mode |
| --- | --- | --- | --- | --- |
| Script | every tick | route, lay, schedule | nothing per decision | converges with its neighbours; cannot price the collision |
| Triage | per turn or per event | is this a collision, a deadlock, a phantom profit — and how sure | ~100 ms, typed output | confidently wrong, and suppression looks like calm |
| Frontier | at plan time, on escalation | choose between priced options | tokens and wall clock | only as good as the brief |

`rh wait` is the only place game time passes, so the world is frozen while any tier thinks. That is
why the third tier can be slow without being late — and why the design's job is to make its calls
rare, not fast.

## The mechanism: a dated pre-plan

Every player submits a plan against the same calendar: corridor, date, capacity, expected revenue,
risk. The broker resolves conflicts **once, before tick 0** — by first declaration, by expected
value, or by auction — and the result is a reservation the scripts can route against. The collision
becomes an allocation decided at plan time instead of a race decided by whoever's track lands first.

The frontier model is then asked a closed question with the prices already computed: *these two
options are expected to bring in X and Y, at risks r and s — choose.* One call per planning window,
a letter back, plus a reason for the record. No per-turn deliberation, no latency, and nothing to
parse.

## The corpus

The team holds a longitudinal savegame: the same world, copied as it grew. That is a sequence of
states with no forward-only bias, and the bet is that a model which learns it **in reverse** — from
`save[n+1]` back to `save[n]` — sees constraints that forward play never samples, because forward
play only ever visits the states it reaches.

Three probes, cheapest first:

1. **Reconstitute.** Given `save[n]` and `save[n+1]`, recover what changed and what plan produced it.
2. **Postdict.** Given `save[n]` alone, predict `save[n+K]` and score against the copy that exists.
3. **Transfer.** Use whatever plan grammar the reverse pass infers as the prior the plan broker
   proposes from. Does it beat a forward-only baseline?

The bet is falsifiable in one specific way: if the copies carry no action log, the inverse is
underdetermined — many plans produce the same state — and reverse learning becomes a hypothesis
generator, not a measurement. The first probe settles which case we are in.

## Arms

- **A — scripts only.** The control: a fixed script fleet, three seeds, the `arena` horizon.
- **B — scripts + triage.** Triage labels and prices contested corridors; the broker allocates by a
  fixed rule. No frontier calls.
- **C — scripts + triage + frontier.** The frontier tier chooses among the broker's priced options
  at each planning window.
- **D — C with the triage threshold deliberately mistuned**, to show what suppression costs.

Every arm runs the full mandate and the run-off, because last-minute window dressing is the failure
the run-off exists to catch. Recorded per arm: revenue, capital spent on abandoned track, corridors
contested, corridors yielded, and the month each queue appears.

## Labels, and the digest

Triage is scored, not trusted. The replay gives the labels — did the trains meet, did the corridor
earn, did the queue persist — so precision and recall are measurable, and the escalation threshold
is tuned against them rather than against a feeling. At 5% error on a thousand events, fifty wrong
escalations is a budget problem and fifty suppressed collisions is a finding.

The digest is the open design decision. The frontier tier sees only the brief, so whoever writes the
brief decides what it can see. It is a fixed schema — date, corridors with expected revenue and risk,
fleet, cash, loan for each holder, commitments already made, the question — and it is logged like any
other input, so "the model played badly" cannot hide "the summariser hid the collision".

## The counter-case

Every arm can beat the control and the study still fail. A dated pre-plan freezes a bad plan: the
broker can allocate a corridor correctly and still be wrong about the town. The triage tier can be
accurate on average and useless on the events that matter, because those are the rare ones. And the
corpus is one company's timeline — reverse learning may recover that company's habits rather than the
game's constraints, which is a sample of one wearing a longer word.

## Provenance and status

- OpenTTD 16.0 at `d48d693d7f`, the pinned submodule; Railhead `6158e15` for the task families, the
  run-off and the replay.
- The savegame corpus is not described here yet: its version, map, seed and the dates of its copies
  are the fields the first arm must fill. If its version disagrees with the engine, it is a separate
  corpus, not a longer one.
- No run is recorded. Nothing on this page is a finding.
