Feature: F3 Allocations

  @story-F3.1
  Rule: A resource manager allocates an active consultant to a Draft or Active engagement for a period at a share of a 40 hour week

    Scenario: Allocating a consultant at half time
      Given "Globex Data Services" is Active and "Ravi Perera" is an active consultant
      When Nimal allocates Ravi to it from "2026-02-02" to "2026-04-30" at 50%
      Then the engagement shows an allocation for Ravi from "2026-02-02" to "2026-04-30" at 50%

    @negative
    Scenario: An end date before the start date is refused
      Given "Globex Data Services" is Active and "Ravi Perera" is an active consultant
      When Nimal tries to allocate Ravi from "2026-04-30" to "2026-02-02" at 50%
      Then the engagement has no allocation for Ravi

  @story-F3.2
  Rule: Each allocation is marked as requiring a travel request or not

    Scenario: Marking an allocation as needing travel
      Given "Acme Integration Platform" is Active and "Maya Fernando" is an active consultant
      When Nimal allocates Maya to it at 100% with travel required
      Then the allocation of Maya is marked as requiring travel

  @story-F3.3
  Rule: A resource manager can edit or end an allocation

    Scenario: Ending an allocation
      Given Maya is allocated to "Acme Integration Platform"
      When Nimal ends the allocation
      Then the allocation has status Ended and still appears in Maya's history

    @negative
    Scenario: Finance cannot end an allocation
      Given Maya is allocated to "Acme Integration Platform"
      When Sanduni, a finance analyst, tries to end the allocation
      Then the allocation is still Active

  @story-F3.4
  Rule: Over-allocation beyond 100% warns but is still allowed

    Scenario: A second allocation takes Ravi to 130%
      Given Ravi is allocated 100% to "Acme Integration Platform" from "2026-02-02" to "2026-03-27"
      When Nimal allocates Ravi 30% to "Globex Data Services" for "2026-03-02" to "2026-03-13"
      Then Nimal is warned that Ravi would be at 130%, and after saving both allocations exist

  @story-F3.5
  Rule: A resource manager sees all allocations of a consultant over time

    Scenario: Viewing Maya's allocations
      Given Maya is allocated to "Acme Integration Platform" and to "Globex Data Services"
      When Nimal opens Maya's consultant page
      Then both allocations are listed with their periods

  @story-F3.6
  Rule: A resource manager sees all allocations of an engagement

    Scenario: Viewing an engagement's allocations
      Given Ravi and Maya are allocated to "Acme Integration Platform"
      When Nimal opens "Acme Integration Platform"
      Then Ravi and Maya are both listed

  @story-F3.7
  Rule: An engagement manager sees the allocations of their own engagements only

    @negative
    Scenario: Another manager's allocations are not visible
      Given Kasun owns "Globex Data Services" with Ana allocated
      When Priya, who does not own it, opens the allocations of "Globex Data Services"
      Then Priya is refused and sees no allocation for Ana

  @story-F3.8
  Rule: Finance sees all allocations but changes none

    Scenario: Finance lists every allocation
      Given allocations exist on "Acme Integration Platform" and "Globex Data Services"
      When Sanduni opens the allocations list
      Then allocations of both engagements are listed

  @story-F3.9 @story-F3.10
  Rule: Managers and consultants are notified by email when an allocation is created, changed or ended

    Scenario: Allocation notice after creation
      Given Priya owns "Acme Integration Platform" and "Ravi Perera" has the email "ravi@wso2.example"
      When Nimal allocates Ravi to "Acme Integration Platform"
      Then an email notice about the allocation is sent to Priya and to "ravi@wso2.example"

    @negative
    Scenario: A refused allocation sends no notice
      Given "Contoso Identity Rollout" is Closed
      When Nimal tries to allocate Ravi to "Contoso Identity Rollout"
      Then no email notice is sent
