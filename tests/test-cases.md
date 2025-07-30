# Test Cases - Clean City App

## 1. User Registration
| Test ID | Description | Steps | Expected Result | Status |
|--------|-------------|-------|-----------------|--------|
| TC01 | Register with valid data | Fill all fields and submit | User is registered successfully | Passed|
| TC02 | Register with existing email | Use email already in database | Error: User already exists | Passed |
| TC03 | Register with short password | Enter 2-char password | Error: Password too short | Passed |

## 2. Login
| TC04 | Valid login | Enter correct email/password | Redirect to dashboard | Pending |
| TC05 | Invalid login | Enter wrong password | Show error message | Pending |

## 3. Pickup Request Form
| TC06 | Submit valid request | Fill all fields and submit | Success message | Pending |
| TC07 | Submit with short name | Enter name with 2 letters | Show validation error | Pending |
| TC08 | Submit without location | Leave location empty | Show location error | Pending |

## 4. Feedback Form
| TC09 | Submit valid feedback | Fill all fields | Feedback saved | Pending |
| TC10 | Missing request ID | Leave requestId blank | Show error | Pending |

## 5. Admin Features
| TC11 | Admin updates status | Select request and new status | Status updates | Pending |
| TC12 | Admin dashboard shows stats | Load admin page | Stats visible | Pending |
