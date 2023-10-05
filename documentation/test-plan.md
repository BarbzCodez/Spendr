# Test Plan for Spendr

## Changelog

| Version | Change Date | By                                                     | Description                                            |
| ------- | ----------- | ------------------------------------------------------ | ------------------------------------------------------ |
| 0.1     | 10/02/2023  | [Daniel La Rocque](https://github.com/dlarocque)       | Created initial testing plan template in markdown.     |
| 0.2     | 10/03/2023  | [Daniel La Rocque](https://github.com/dlarocque)       | Wrote initial draft for test plan.                     |
| 0.3     | 10/04/2023  | [Barbara Guzman Romero](https://github.com/dlarocque)  | Fixed the tables, added Victoria back as a QA Analyst  |

## 1. Introduction

### 1.1 Scope

This test plan covers unit, integration, acceptance, regression, and load testing for the Spendr application, targeting both frontend and backend components.

### 1.2 Roles and Responsibilities

| Name                  | UMNet ID  | GitHub username | Role                                                |
| --------------------- | --------- | --------------- | --------------------------------------------------- |
| Daniel La Rocque      | larocq17  | dlarocque       | Backend Developer, Test Manager, Security Analyst   |
| Victoria Kogan        | koganv    | VictoriaKGN     | Frontend Developer, QA Analyst                      |
| Mark Lysack           | lysackm   | lysackm         | Backend Developer, DevOps Developer                 |
| Barbara Guzman Romero | guzmanrb  | BarbzCodez      | Frontend Developer, QA Analyst                      |
| Ethan Ducharme        | duchar36  | DucharmeEthan   | Backend Developer, Database Administrator           |

### 1.3 Role definitions

- **Backend Developer**:  Responsible for implementing and testing backend functionality.
- **Frontend Developer**: Tasked with implementing and testing user interface and experience.
- **Test Manager**: Coordinates backend testing, ensuring coverage and criteria are met.
- **QA Analyst**: Responsible for the overall quality of the application, involved in all types of testing.
- **Security Analyst**: Ensures the application meets all security guidelines and passes security testing.
- **Database Administrator**:  Responsible for database setup, maintenance, and data integrity.
- **DevOps Developer**: Manages CI/CD pipelines, deployments, and environment configurations.

## 2. Test Methodology

### 2.1 Test Levels

- **Unit Testing**: Test individual components or functions for correctness.
- **Integration Testing**: Test the data exchange and interaction between integrated components.
- **Acceptance Testing**: Validate that the system meets end-user requirements.
- **Regression Testing**: Ensure new changes have not broken existing functionalities.
- **Load Testing**: Verify system behavior under heavy loads.

### Unit Tests

1. User Management
   - Return `201 Created` upon POST request to `/register` with valid payload.
   - Return `409 Conflict` upon POST request to `/register` with an already used username.
   - Return `200 OK` upon POST to `/login` with correct credentials.
   - Return `401 Unauthorized` upon POST to `/login` with incorrect credentials.
   - Verify session termination upon POST to `/logout`.
   - Return `200 OK` upon DELETE to `/account` from authenticated session.
   - Return `200 OK` upon PATCH to `/account/username` with valid new username.
   - Return `200 OK` upon PATCH to `/account/password` with valid old and new password.
   - Return `200 OK` upon PATCH to `/account/password` with valid old and new security question or answer.
   - Return `401 Unauthorized` upon accessing protected resource after `/logout`.
2. Expense Entry and History
   - Return `201 Created` upon POST to `/expense` with valid payload.
   - Return `200 OK` upon DELETE to `/expense/{id}` with valid expense ID.
   - Return `200 OK` upon PATCH to `/expense/{id}` with valid updates.
   - Return `200 OK` upon GET to `/expense/{id}`.
   - Return `200 OK` upon GET to `/expenses`.
   - Return correct expenses in payload upon GET to `/expenses`.
   - Return `400 Bad Request` upon POST to `/expense` with invalid payload.
   - Return `404 Not Found` upon DELETE to `/expense/{nonExistingId}`.
   - Return `404 Not Found` upon PATCH to `/expense/{nonExistingId}`.
   - Return `401 Unauthorized` upon POST to `/expense` without valid session.
3. Budget Management
   - Return `201 Created` upon POST to `/budget` with valid payload for setting a budget.
   - Return `200 OK` upon PATCH to `/budget/{id}` with valid updates.
   - Return `200 OK` upon DELETE to `/budget/{id}` with a valid budget ID.
   - Return `200 OK` upon GET to `/budgets` to retrieve all set budgets.
   - Return `400 Bad Request` upon POST to `/budget` with invalid payload.
   - Return `404 Not Found` upon DELETE to `/budget/{nonExistingId}`.
   - Return `404 Not Found` upon PATCH to `/budget/{nonExistingId}` with invalid updates.
   - Return `200 OK` upon GET to `/budget/{id}` with a valid budget ID.
   - Return `401 Unauthorized` upon POST to `/budget` without valid session
4. Expense Analytics
   - Return `200 OK` upon GET to `/analytics` to retrieve analytics data.
   - Return `200 OK` upon POST to `/analytics/timeframe` with valid time frame payload.
   - Verify correct expense comparison upon GET to `/analytics/compare?timeFrame1={timeFrame1}&timeFrame2={timeFrame2}`.
   - Verify spending patterns upon GET to `/analytics?category=food`.
   - Return `400 Bad Request` upon POST to `/analytics/timeframe` with invalid time frame.
   - Verify alert generation upon significant variations in spending patterns.
   - Return `401 Unauthorized` upon GET to `/analytics` without valid session.
   - Return `404 Not Found` upon accessing non-existing analytics endpoint.
5. Group Expense Splitting
   - Return `201 Created` upon POST to `/groupExpense` with valid payload for adding an expense.
   - Verify other members' usernames are prompted upon POST to `/groupExpense`.
   - Return `200 OK` upon PATCH to `/groupExpense/{id}/markPaid` to mark a group expense as paid.
   - Return `200 OK` upon GET to `/groupExpense/{id}` to retrieve status of 'paid' by all other users.
   - Verify updated expense amounts upon setting contributions (even or custom percentages).
   - Return `200 OK` upon DELETE to `/groupExpense/{id}/removeSelf` to remove oneself from a group expense.
   - Return `400 Bad Request` upon POST to `/groupExpense` with invalid payload.
   - Return `404 Not Found` upon DELETE to `/groupExpense/{nonExistingId}`.
   - Return `404 Not Found` upon PATCH to `/groupExpense/{nonExistingId}` with invalid updates.
   - Return `401 Unauthorized` upon POST to `/groupExpense` without valid session.

#### Integration Tests

### 2.2 Test Completeness

- 100% back-end code coverage
- All unit, integration, regression, and acceptance tests pass
- All tests will be ran against each commit in each pull request

## 3. Resource & Environment Needs

### 3.1 Testing Tools

**General Tools:**

- **Bug-tracking tool**: GitHub Issues
- **Automation tools**: Jest
- **CI/CD**: GitHub Actions

**Backend**:

- Jest
- Chai

### 3.2 Test Environment

It mentions the minimum hardware requirements that will be used to test the Application.

**Example**, following software's are required in addition to client-specific software.

- Windows 10
- Docker-compose
- Chrome (latest version)

## 4. Terms/Acronyms

Make a mention of any terms or acronyms used in the project

| Term/Acronym | Definition                                       |
| ------------ | ------------------------------------------------ |
| API          | Application Program Interface                    |
| AUT          | Application Under Test                           |
| QA           | Quality Assurance                                |
| CI/CD        | Continuous Integration / Continuous Deployment   |
