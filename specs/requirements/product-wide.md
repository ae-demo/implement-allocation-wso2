# Product-wide

Rules that apply to more than one feature.

## Requirements

- P1 Users sign in through SSO via Thunder, which federates to Asgardeo. \[org default\] Applies to: all.
- P2 Allocation cost is computed as the consultant's cost rate × allocated time over the allocation period. Applies to: F3, F4.
- P3 Costs are reported in a single reporting currency; amounts in other currencies are converted using NetSuite's conversion. Applies to: F2, F4. *assumed*

## Decisions

- Consultants' cost rates are maintained in this app; consultant identity and employee information come from People App.
- Employee information: People App — the business already uses it.
- Finance system: NetSuite — the business already uses it; engagement travel-related expenses are pushed to it, and it performs currency conversions.
- Identity provider: Asgardeo — the business already uses it, federated through Thunder.
- Transactional email: an email service the business already uses; it notifies consultants and managers of allocations.

## Open Questions

1. Which currency is the reporting currency, and in which currency are consultant cost rates held?
2. Travel expenses: who records them on an engagement, and is the push to NetSuite automatic or triggered by a user? (Assumed to belong to Engagements and Cost tracking once settled.)