---
title: Timetable discipline under load
description: A schedule that works at modelled demand, pushed until it stops working. Stage: analysis.
order: 3
updated: 2026-11-13
stage: analysis
---

# Timetable discipline under load

**Question.** At what demand does a working timetable stop working?

## Design

One line, one timetable, demand stepped by 20% per arm until the first sustained delay. Each arm
runs long enough for the queue to either clear or become the steady state — the distinction the
first draft of this study got wrong.

## What the numbers show so far

The line absorbs the first two steps without a delay worth recording, and then fails between the
third and fourth. The failure is not gradual: the queue appears in one month and stays.

## What the analyst refuses to conclude

That the failure point is a property of the timetable. It may be a property of the map, the vehicle
count, or the step size. The next arm holds the timetable fixed and varies the fleet, which is the
only way to separate those.
