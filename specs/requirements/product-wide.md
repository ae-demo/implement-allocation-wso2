# Product-wide

Rules that apply to more than one feature.

## Requirements

- P1 Users sign in through SSO. \[org default\] Applies to: all.
- P2 Allocation cost is computed as the consultant's cost rate × allocated time over the allocation period. Applies to: F3, F4.
- P3 Amounts are shown in a single currency. Applies to: F2, F4. *assumed*

## Decisions

- Consultants and their cost rates are maintained in this app, not imported.
- Employee directory: People App — the business already uses it. Its role here is open (see questions).
- Finance system: NetSuite — the business already uses it. Its role here is open (see questions).
- Identity provider: Asgardeo — the business already uses it; this conflicts with the org default of SSO through Thunder (see questions).
- Transactional email: an email service the business already uses; its role here is open (see questions).

## Open Questions

1. Asgardeo vs Thunder: should sign-in go through Asgardeo (e.g. Thunder federating to it), or Thunder alone as the org default?
2. What does People App supply — consultant identities only, or also cost rates? This affects the earlier decision that consultants are maintained in this app.
3. What does NetSuite do for this product — receive allocation costs, supply rates or budgets, or something else?
4. What is the email service used for — notifying consultants and managers of allocations, cost alerts, or something else?