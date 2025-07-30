# Final Test Report - Clean City App

## Summary
- Manual testing completed for user registration, login, pickup, feedback, and admin pages.
- Found 5 major defects, 3 of which were high severity.
- Tests executed using browser inspection, console logs, and form validation checks.

## Key Findings
- Plain text password storage is a critical issue.
- Location filter for "Eldoret" had a logic bug.
- Admin panel has no authorization guard — anyone can change data.

## Lessons Learned
- Always validate form inputs properly.
- Ensure data access functions check roles/permissions.
- Avoid plain text password storage — use hashing in real apps.

## Evidence
- Screenshots and test case markdowns attached in `/tests`
- Console errors logged during validation
