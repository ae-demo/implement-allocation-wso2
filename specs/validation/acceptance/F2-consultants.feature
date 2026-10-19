Feature: F2 Consultants

  @story-F2.1 @story-F2.2
  Rule: A resource manager adds a consultant by picking an employee from People App

    Scenario: Adding an employee as a consultant
      Given "Dilani Fernando" is an employee in People App and not yet a consultant
      When Nimal, a resource manager, adds Dilani as a consultant
      Then Dilani is in the consultants list and her department and country are shown from People App

    @negative
    Scenario: An employee is not added twice
      Given "Dilani Fernando" is already a consultant
      When Nimal tries to add Dilani again
      Then the consultants list still has exactly one entry for Dilani

  @story-F2.3
  Rule: A cost rate is hourly, in a chosen currency, effective from a date

    Scenario: Setting a rate in pounds
      Given "Ana Silva" is a consultant with no rate
      When Nimal sets her rate to 65.00 GBP per hour effective from "2026-03-01"
      Then Ana's rate history has one rate of 65.00 GBP effective from "2026-03-01"

    @negative
    Scenario: A rate without an amount is refused
      Given "Ana Silva" is a consultant with no rate
      When Nimal tries to set a rate with no hourly amount
      Then Ana's rate history is empty

  @story-F2.4
  Rule: Earlier rates are kept and the rate in force depends on the date

    Scenario: A later rate does not replace the earlier one
      Given "Ravi Perera" has a rate of 55.00 USD from "2025-01-01"
      When Nimal sets a rate of 60.00 USD effective from "2026-01-01"
      Then Ravi's rate history lists both rates and the rate in force on "2025-06-01" is 55.00 USD

  @story-F2.5
  Rule: A resource manager can list and search consultants

    Scenario: Searching by name
      Given consultants "Ravi Perera", "Maya Fernando" and "Ana Silva" exist
      When Nimal searches consultants for "Maya"
      Then only "Maya Fernando" is listed

  @story-F2.6
  Rule: A deactivated consultant can no longer be allocated

    @negative
    Scenario: Allocating an inactive consultant is refused
      Given "Tharindu Bandara" is a deactivated consultant and "Globex Data Services" is Active
      When Nimal tries to allocate Tharindu to "Globex Data Services"
      Then "Globex Data Services" has no allocation for Tharindu

  @story-F2.7
  Rule: Finance can see consultants and their cost rates but cannot change them

    Scenario: Finance reads a rate
      Given "Ravi Perera" has a rate of 60.00 USD in force
      When Sanduni, a finance analyst, opens Ravi's consultant page
      Then she sees 60.00 USD per hour

    @negative
    Scenario: Finance cannot set a rate
      Given "Ravi Perera" has a rate of 60.00 USD in force
      When Sanduni tries to set Ravi's rate to 99.00 USD
      Then Ravi's rate history is unchanged
