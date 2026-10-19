# WSO2 Allocation

## Problem Statement

WSO2 delivery teams need to set up customer engagements, decide which consultants work on them and when, and know what those allocations cost. Without a single place for this, allocations and their costs are hard to see and compare.

## Solution

An allocation application where engagement managers create engagements, resource managers allocate consultants to them for a period, and finance tracks the resulting cost per engagement and per consultant.

## Actors

- Engagement manager: creates and manages engagements and sees the allocations and cost of their own engagements.
- Resource manager: maintains consultants and their cost rates and allocates consultants to engagements.
- Finance: views allocation costs across all engagements and consultants.

## Features

- F1 [Engagements](features/F1-engagements.md)
- F2 [Consultants](features/F2-consultants.md)
- F3 [Allocations](features/F3-allocations.md)
- F4 [Cost tracking](features/F4-cost-tracking.md)

## Product-wide

See [Product-wide](product-wide.md).

## Out of Scope

- Timesheets and actual hours worked; cost is computed from allocations only. *assumed*

## Open Questions

1. Currency for cross-country totals and the NetSuite push trigger — see Product-wide open questions.

