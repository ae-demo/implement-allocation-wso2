# Cost tracking

## Purpose

Engagement managers and finance see the cost of allocations per engagement and per consultant, and engagement travel expenses are recorded and sent to NetSuite.

Needs: F3.

## User Stories

- F4.1 As an engagement manager, I see the allocation cost of each of my engagements over a date range.
- F4.2 As an engagement manager, I see the cost of each consultant allocated to my engagement over a date range.
- F4.3 As finance, I see allocation cost per engagement across all engagements over a date range.
- F4.4 As finance, I see allocation cost per consultant across all engagements over a date range.
- F4.5 As a resource manager, I see allocation cost per consultant and per engagement over a date range.
- F4.6 As an engagement manager, I record travel expenses against my engagement, for allocations marked as requiring travel.
- F4.7 As an engagement manager, I submit an engagement's travel expenses to NetSuite.
- F4.8 As an engagement manager, I see whether an engagement's travel expenses have been submitted to NetSuite.
- F4.9 As finance, I see an engagement's travel expenses alongside its allocation cost.

## Decisions

- Cost totals are shown in a single reporting currency, USD; NetSuite performs the conversion from other currencies.
- Allocation cost is the consultant's hourly rate × allocated hours (percentage of the standard week) over the date range, per product-wide.
- Cost views are per engagement and per consultant over a date range.
- Travel expenses are recorded by the engagement manager and pushed to NetSuite when the user submits them, not automatically.
- Travel expenses are held in the currency of the engagement's country.
- Cost shown covers allocations as planned, not actual hours worked.

## Out of Scope

- Monthly breakdowns and CSV export.

