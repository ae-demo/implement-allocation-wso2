# Consultants

## Purpose

Resource managers maintain the directory of consultants and their cost rates.

## User Stories

- F2.1 As a resource manager, I add a consultant by picking an employee from People App.
- F2.2 As a resource manager, I see the consultant's employee information as held in People App.
- F2.3 As a resource manager, I set a consultant's hourly cost rate in a chosen currency, effective from a date.
- F2.4 As a resource manager, I see a consultant's rate history, including the rate in force on a given date.
- F2.5 As a resource manager, I list and search consultants.
- F2.6 As a resource manager, I deactivate a consultant so they can no longer be allocated. *assumed*
- F2.7 As finance, I see consultants and their cost rates. *assumed*

## Decisions

- Consultants are picked from People App employees; identity and employee information come from People App.
- A cost rate is per hour per consultant, with an effective-from date; earlier rates are kept as history.
- Each rate has its own currency.
- A rate change applies to allocation time from its effective date onward, not retroactively. *assumed*

## Out of Scope

- Editing employee information (People App owns it).