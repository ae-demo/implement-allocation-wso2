# Allocations

## Purpose

Resource managers allocate consultants to engagements for a period and an amount of time.

Needs: F1, F2.

## User Stories

- F3.1 As a resource manager, I allocate a consultant to an engagement for a start and end date at a percentage of a standard working week.
- F3.2 As a resource manager, I mark an allocation as requiring a travel request or not.
- F3.3 As a resource manager, I edit or end an allocation.
- F3.4 As a resource manager, I am warned when a consultant's allocations exceed 100% in a period, and can still save.
- F3.5 As a resource manager, I see all allocations of a consultant over time.
- F3.6 As a resource manager, I see all allocations of an engagement.
- F3.7 As an engagement manager, I see the allocations of my own engagements.
- F3.9 As an engagement manager, I am notified by email when an allocation on my engagement is created, changed or ended.
- F3.10 As a resource manager, I notify the consultant by email when they are allocated, changed or ended (sent by the system). *assumed*

## Decisions

- Allocated time is a percentage of a standard working week over a start–end date range.
- Over-allocation beyond 100% warns but is allowed.
- An allocation marked as requiring travel uses the engagement's country as the travel country; no separate destination is captured.
- Each allocation is marked as requiring a travel request or not.
- Consultants and managers are notified by email of allocations.
- Allocations can be made only to active consultants and to Draft or Active engagements.
- A consultant's cost rate applies as it stands on each day of the allocation (see Consultants). *assumed*
- The standard working week is 40 hours. *assumed*

