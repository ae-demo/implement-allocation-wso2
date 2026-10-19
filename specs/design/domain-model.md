# Data model

Engagements are owned by an engagement manager. Consultants are People App employees with a history of hourly cost rates. An allocation places a consultant on an engagement for a period at a percentage of a 40-hour week, and travel expenses hang off allocations marked as requiring travel.

```mermaid
erDiagram
    ENGAGEMENT {
        string id PK
        string name
        string customer
        string country
        string status "DRAFT, ACTIVE, CLOSED"
        string ownerId "signed-in subject of the creator"
        string ownerName
        string ownerEmail
    }
    CONSULTANT {
        string id PK
        string employeeEmail "People App identity"
        string name
        boolean active
    }
    CONSULTANT_RATE {
        string id PK
        string consultantId FK
        decimal hourlyRate
        string currency
        date effectiveFrom
    }
    ALLOCATION {
        string id PK
        string engagementId FK
        string consultantId FK
        date startDate
        date endDate
        int percentage "of a 40 hour week"
        boolean travelRequired
        string status "ACTIVE, ENDED"
    }
    TRAVEL_EXPENSE {
        string id PK
        string engagementId FK
        string allocationId FK
        date expenseDate
        string description
        decimal amount
        string currency
        string status "DRAFT, SUBMITTED"
        datetime submittedAt
    }
    ENGAGEMENT ||--o{ ALLOCATION : has
    CONSULTANT ||--o{ ALLOCATION : works_on
    CONSULTANT ||--o{ CONSULTANT_RATE : priced_by
    ALLOCATION ||--o{ TRAVEL_EXPENSE : incurs
    ENGAGEMENT ||--o{ TRAVEL_EXPENSE : carries
```

Employee details (department, country, reporting lead) are read live from People App and are not stored. Cost is computed on request from allocations and rates, never stored.