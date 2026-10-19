# Technical decisions

- \[architecture\] One service owns engagements, consultants, allocations, costs and travel expenses, and one web app serves all three roles. *assumed* (all)
- \[architecture\] The Finance directory group is reused for the finance role, because its members are the finance staff who read these figures. *assumed* (F1, F2, F3, F4)
- \[data-model\] Cost is computed on request from allocations and rates, never stored. *assumed* (F4)
- \[data-model\] Working time counts Monday to Friday at 8 hours a day times the allocation percentage. *assumed* (F3, F4)
- \[data-model\] An engagement stores its owner's name and email from the sign-in token, so notices can be sent. *assumed* (F1, F3)
- \[security\] An engagement manager reads and changes their own engagements through /me/engagements paths. *assumed* (F1, F3, F4)
- \[allocation-api\] Consultants are matched to People App employees by work email. *assumed* (F2)
- \[allocation-api\] An allocation is checked for over-allocation before saving through a separate check operation. *assumed* (F3)
- \[allocation-api\] A list returns 20 records per page. *assumed* (all)