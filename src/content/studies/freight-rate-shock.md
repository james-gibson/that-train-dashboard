---
title: A freight-rate shock
description: Double one lane's rate and watch what the network does. Stage: running.
order: 1
updated: 2026-11-13
stage: running
---

# A freight-rate shock

**Question.** If one freight lane's rate doubles, does the network re-route, absorb the cost, or
stall?

## Design

- One map, one seed, one scenario file, recorded in [the run log](/ops/data).
- Baseline: 24 in-game months at the standard rate.
- Shock: the same map and seed, rate doubled at month 12, 24 months observed.
- Measured: vehicles in transit, station stock, revenue per lane, and the month the first vehicle
  idles.

## What we expect

The naive answer is that traffic shifts to the parallel lane. The interesting failure is the one
where it does not: the vehicles are already committed, the station stock backs up, and the cost
lands on the stations rather than the route.

## Status

Running. The baseline is recorded; the shock arm is scheduled for the next review. Nothing on this
page is a finding yet.
