# Product-wide

Rules that apply to more than one feature.

## Requirements

- P1 Users sign in through SSO via Thunder, which federates to Asgardeo. \[org default\] Applies to: all.
- P2 Allocation cost is computed as the consultant's cost rate × allocated time over the allocation period. Applies to: F3, F4.
- P3 Amounts are held in the currency of the country the consultant travels to; NetSuite performs currency conversions. Applies to: F3, F4.

## Decisions

- Consultants' cost rates are maintained in this app; consultant identity and employee information come from People App.
- Employee information: People App — the business already uses it.
- Finance system: NetSuite — the business already uses it; engagement travel-related expenses are pushed to it, and it performs currency conversions.
- Identity provider: Asgardeo — the business already uses it, federated through Thunder.
- When allocating a consultant to an engagement, the allocation is marked as requiring travel or not; travel-related expenses of the engagement are pushed to NetSuite.
- Transactional email: an email service the business already uses; it notifies consultants and managers of allocations.

## Open Questions

1. When cost is totalled across engagements in different countries, which currency is the total shown in?
2. Is the push of travel expenses to NetSuite automatic or user-triggered, and what did "travelled across the function" mean for who sees them?