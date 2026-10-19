Feature: F1 Engagements

  @story-F1.1
  Rule: An engagement manager can create an engagement with a name, a customer and a country

    Scenario: Creating a Draft engagement
      Given Priya is an engagement manager
      When Priya creates an engagement named "Acme Integration Platform" for customer "Acme Corp" in "United States"
      Then "Acme Integration Platform" is in her list with status Draft and Priya as owner

    @negative
    Scenario: An engagement without a customer is refused
      Given Priya is an engagement manager
      When Priya tries to create an engagement named "No Customer Project" with no customer
      Then her list of engagements does not contain "No Customer Project"

  @story-F1.2
  Rule: Only the owner of an engagement can edit it

    Scenario: Priya renames her engagement
      Given Priya owns an engagement named "Northwind API Migration"
      When Priya renames it to "Northwind API Modernisation"
      Then her list shows "Northwind API Modernisation" with the same customer and country

    @negative
    Scenario: Another manager cannot edit it
      Given Priya owns an engagement named "Northwind API Migration"
      When Kasun, another engagement manager, tries to rename it to "Hijacked"
      Then the engagement is still named "Northwind API Migration"

  @story-F1.3
  Rule: An engagement moves from Draft to Active, and from Active to Closed

    Scenario: Activating and closing an engagement
      Given Priya owns a Draft engagement named "Globex Data Services"
      When Priya activates it and then closes it
      Then the engagement has status Closed

    @negative
    Scenario: A Closed engagement takes no new allocations
      Given a Closed engagement named "Contoso Identity Rollout" and an active consultant "Ravi Perera"
      When Nimal, a resource manager, tries to allocate Ravi to "Contoso Identity Rollout"
      Then "Contoso Identity Rollout" has no allocation for Ravi

  @story-F1.4
  Rule: An engagement manager sees only the engagements they own

    @negative
    Scenario: Another manager's engagement is not listed
      Given Priya owns "Acme Integration Platform" and Kasun owns "Initech Support Uplift"
      When Priya opens her list of engagements
      Then the list contains "Acme Integration Platform" and not "Initech Support Uplift"

  @story-F1.5
  Rule: A resource manager sees all engagements and can filter them by status

    Scenario: Filtering by Draft
      Given engagements exist with status Draft, Active and Closed
      When Nimal, a resource manager, filters the engagements by status Draft
      Then every engagement listed has status Draft and includes engagements owned by different managers

  @story-F1.6
  Rule: Finance sees all engagements and can filter them by status

    Scenario: Filtering by Active
      Given engagements exist with status Draft, Active and Closed
      When Sanduni, a finance analyst, filters the engagements by status Active
      Then every engagement listed has status Active

    @negative
    Scenario: Finance cannot create an engagement
      Given Sanduni is a finance analyst
      When Sanduni tries to create an engagement named "Finance Project"
      Then no engagement named "Finance Project" exists
