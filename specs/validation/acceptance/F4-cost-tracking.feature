Feature: F4 Cost tracking

  @story-F4.1 @story-F4.2
  Rule: An engagement manager sees the cost of their own engagements and each consultant's share

    Scenario: Cost of a fully allocated week
      Given Priya owns "Acme Integration Platform" and Ravi, at 60.00 USD per hour, is allocated 100% from Monday "2026-01-05" to Friday "2026-01-09"
      When Priya views the cost of her engagements from "2026-01-05" to "2026-01-09"
      Then "Acme Integration Platform" shows 40 hours and 2,400 USD, and Ravi's share is 2,400 USD

    @negative
    Scenario: Another manager's cost is not shown
      Given Kasun owns "Globex Data Services" with allocated consultants
      When Priya views the cost of her engagements
      Then "Globex Data Services" is not listed

  @story-F4.3 @story-F4.4 @story-F4.5
  Rule: Finance and resource managers see cost per engagement and per consultant across all engagements

    Scenario: Cost per consultant across engagements
      Given Maya is allocated 50% to "Acme Integration Platform" and 50% to "Globex Data Services" for the week of "2026-02-02"
      When Sanduni, a finance analyst, views cost per consultant for "2026-02-02" to "2026-02-06"
      Then Maya is listed once with the cost of both allocations combined

    Scenario: A resource manager sees the same cost per engagement
      Given allocations exist on two engagements owned by different managers
      When Nimal, a resource manager, views cost per engagement for the period
      Then both engagements are listed

    @negative
    Scenario: An engagement manager cannot see cost per consultant across all engagements
      Given Maya is allocated to engagements owned by Priya and by Kasun
      When Priya tries to view cost per consultant across all engagements
      Then she is refused and sees no cost for Kasun's engagement

  @story-F4.6
  Rule: Travel expenses are recorded only on allocations that require travel

    Scenario: Recording a hotel expense
      Given Priya owns "Acme Integration Platform" and Ravi's allocation requires travel
      When Priya records a "Hotel, 5 nights" expense of 980.00 for Ravi dated "2026-01-09"
      Then the engagement lists the expense with status Draft

    @negative
    Scenario: An expense on an allocation without travel is refused
      Given Priya owns "Acme Integration Platform" and Maya's allocation does not require travel
      When Priya tries to record a 100.00 expense for Maya
      Then the engagement's travel expenses are unchanged

  @story-F4.7 @story-F4.8
  Rule: An engagement manager submits travel expenses to NetSuite and sees whether they were submitted

    Scenario: Submitting a Draft expense
      Given Priya has a Draft travel expense on "Acme Integration Platform"
      When Priya submits the engagement's travel expenses
      Then the expense has status Submitted

    @negative
    Scenario: NetSuite refuses the submission
      Given Priya has a Draft travel expense and NetSuite is unavailable
      When Priya submits the engagement's travel expenses
      Then the expense still has status Draft

  @story-F4.9
  Rule: Finance sees travel expenses alongside allocation cost

    Scenario: Finance reads submitted and draft expenses
      Given "Acme Integration Platform" has one Submitted and one Draft travel expense
      When Sanduni, a finance analyst, opens the travel expenses
      Then both expenses are listed with their status

    @negative
    Scenario: Finance cannot record an expense
      Given "Acme Integration Platform" has a travelling allocation
      When Sanduni tries to record a travel expense on it
      Then the engagement's travel expenses are unchanged
