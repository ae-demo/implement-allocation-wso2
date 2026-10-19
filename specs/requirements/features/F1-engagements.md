# Engagements

## Purpose

Engagement managers create and manage customer engagements that consultants are allocated to.

## User Stories

- F1.1 As an engagement manager, I create an engagement with a name, a customer and a country.
- F1.2 As an engagement manager, I edit the name, customer and country of my engagements.
- F1.3 As an engagement manager, I move my engagement from Draft to Active, and from Active to Closed.
- F1.4 As an engagement manager, I see a list of my own engagements with their status.
- F1.5 As a resource manager, I see all engagements and filter them by status.
- F1.6 As finance, I see all engagements and filter them by status.

## Decisions

- An engagement has a name, a customer and a country.
- An engagement's status is Draft, Active or Closed.
- An engagement manager sees only the engagements they own; resource managers and finance see all.
- The engagement manager who creates an engagement owns it.
- Consultants can be allocated only to Draft or Active engagements, not Closed ones.

## Out of Scope

- Engagement budgets, start and end dates (allocations carry the periods).