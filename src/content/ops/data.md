---
title: What we record
description: Version, seed, scenario, arm, figures — and the things that are deliberately not collected.
order: 2
updated: 2026-11-13
stage: standing
---

# What we record

Every run record carries:

| Field | Why |
| --- | --- |
| OpenTTD version | behaviour changes between versions; a result without a version is not reproducible |
| Map and seed | the same scenario with a different seed is a different experiment |
| Scenario file | the only way to re-run the shock exactly |
| Arm and month | which variation, and when the observation starts |
| Exported figures | revenue, stock, delays, vehicle counts |
| Wall-clock time | how long a re-run costs, which decides whether anyone will |

## What we do not collect

- **Player names and chat.** Not research data, and a privacy liability.
- **Anything from a real economy.** The model is a toy; importing real series would invite a causal
  claim the design cannot support.
- **Telemetry.** The dashboard is a static site. There is no analytics, and the absence is
  deliberate — [the parent project](https://james-gibson.github.io/le.gume/pitch/missing-isotopes)
  prices what analytics would cost.
