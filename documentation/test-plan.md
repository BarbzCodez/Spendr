# Test Plan for Spendr

## Changelog

| Version | Change Date | By                                                     | Description                                           |
| ------- | ----------- | ------------------------------------------------------ | ----------------------------------------------------- |
| 0.1     | 10/02/2023  | [Daniel La Rocque](https://github.com/dlarocque)       | Created initial testing plan template in markdown.    |
| 0.2     | 10/03/2023  | [Daniel La Rocque](https://github.com/dlarocque)       | Wrote initial draft for test plan.                    |
| 0.3     | 10/04/2023  | [Barbara Guzman Romero](https://github.com/BarbzCodez) | Fixed the tables, added Victoria back as a QA Analyst |
| 0.4     | 10/08/2023  | [Daniel La Rocque](https://github.com/dlarocque)       | Added final unit tests and added integration tests    |

## 1. Introduction

### 1.1 Scope

This test plan covers unit, integration, acceptance, regression, and load testing for the Spendr application, targeting both frontend and backend components.

### 1.2 Roles and Responsibilities

| Name                  | UMNet ID | GitHub username | Role                                              |
| --------------------- | -------- | --------------- | ------------------------------------------------- |
| Daniel La Rocque      | larocq17 | dlarocque       | Backend Developer, Test Manager, Security Analyst |
| Victoria Kogan        | koganv   | VictoriaKGN     | Frontend Developer, QA Analyst                    |
| Mark Lysack           | lysackm  | lysackm         | Backend Developer, DevOps Developer               |
| Barbara Guzman Romero | guzmanrb | BarbzCodez      | Frontend Developer, QA Analyst                    |
| Ethan Ducharme        | duchar36 | DucharmeEthan   | Backend Developer, Database Administrator         |

### 1.3 Role definitions

- **Backend Developer**: Responsible for implementing and testing backend functionality.
- **Frontend Developer**: Tasked with implementing and testing user interface and experience.
- **Test Manager**: Coordinates backend testing, ensuring coverage and criteria are met.
- **QA Analyst**: Responsible for the overall quality of the application, involved in all types of testing.
- **Security Analyst**: Ensures the application meets all security guidelines and passes security testing.
- **Database Administrator**: Responsible for database setup, maintenance, and data integrity.
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
   1. Return `201 Created` upon POST request to `/users/register` with valid payload.
   2. Return `400 Bad Request` upon POST request to `/users/register` with an already used username.
   3. Return `200 OK` and a JWT upon POST to `/users/login` with correct credentials.
   4. Return `400 Bad Request` upon POST to `/users/login` with incorrect credentials.
   5. Return `200 OK` upon POST to `/users/reset-password` with the correct security answer.
   6. Return `400 Bad Request` upon POST to `/users/reset-password` with the incorrect security answer.
   7. Return `400 Bad Request` upon POST to `/users/reset-password` with a missing payload.
   8. Return `200 OK` upon PUT to `/users` with valid new user data.
   9. Return `400 Bad Request` upon PUT to `/users` with a new username that already exists.
   10. Return `200 OK` upon DELETE to `/users` from authenticated session.
2. Expense Entry and History
   1. Return `201 Created` upon POST to `/expenses` with a valid new expense.
   2. Return `200 OK` upon DELETE to `/expenses/:id` with valid expense ID.
   3. Return `200 OK` upon PATCH to `/expenses/:id` with valid updates.
   4. Return `200 OK` and correct expenses upon GET to `/expenses`.
   5. Return `200 OK` and correct expense upon GET to `/expenses/:id` with a valid expense ID.
   6. Return `400 Bad Request` upon POST to `/expenses/:id` with an invalid payload.
   7. Return `400 Bad Request` upon POST to `/expenses/:id` with an invalid expense value.
   8. Return `404 Not Found` upon DELETE to `/expenses/:id` with a non-existent expense ID.
   9. Return `404 Not Found` upon PATCH to `/expenses/:id` with a non-existent expense ID.
   10. Return `400 Bad Request` upon PATCH to `/expenses/:id` with an invalid expense.
3. Budget Management
   1. Return `201 Created` upon POST to `/budgets` with valid payload for setting a budget.
   2. Return `200 OK` upon PUT to `/budgets/:id` with valid budget.
   3. Return `200 OK` upon DELETE to `/budgets/:id` with a valid budget ID.
   4. Return `200 OK` and all the correct budgets upon GET to `/budgets` to retrieve all set budgets.
   5. Return `200 OK` and the correct budget upon GET to `/budget/:id` to retrieve a specific budget.
   6. Return `400 Bad Request` upon POST to `/budgets` with invalid payload.
   7. Return `404 Not Found` upon DELETE to `/budgets/:id` with a budget ID that does not exist.
   8. Return `404 Not Found` upon PUT to `/budgets/:id` with an invalid payload.
   9. Return `400 Bad Request` upon GET to `/budgets/:id` with a budget ID that does not exist.
   10. Return `400 Bad Request` upon POST to `/budgets` with an negative budget amount.
4. Expense Analytics
   1. Return `200 OK` and average amount spent per day for a month upon GET to `/analytics/average-daily/` with a valid year and month.
   2. Return `400 Bad Request` upon GET to `/analytics/average-daily` for a month in the future.
   3. Return `400 Bad Request` upon GET to `/analytics/average-daily` with invalid date formats.
   4. Return `200 OK` and average amount spent per day for a month for a category upon GET to `/analytics/average-daily/` with a valid year, month, and category.
   5. Return `400 Bad Request` upon GET to `/analytics/average-daily` for a category that does not exist.
   6. Return `400 Bad Request` upon GET to `/analytics/average-daily` with a missing payload.
   7. Return `200 OK` and average amount spent per month since the first month upon GET to `/analytics/average-monthly`.
   8. Return `200 OK` and total amount spent for each category upon GET to `/analytics/amount/`.
   9. Return `200 OK` and total amount spent for a specific category upon GET to `/analytics/amount` with an existing category.
   10. Return `400 Bad Request` upon GET to `/analytics/amount` with a category that does not exist.
5. Group Expense Splitting
   1. Return `201 Created` upon POST to `/group-expenses` with valid amount, breakdown, and users that exist.
   2. Return `200 OK` and correct group expense data upon GET to `/group-expenses/:id` with an existing group expense ID.
   3. Return `200 OK` upon PUT to `/group-expenses/:id/paid` to mark a group expense as paid.
   4. Return `200 OK` upon GET to `/group-expenses/:id/paid` to retrieve status of 'paid' by all other users.
   5. Return `200 OK` and all group expense data upon GET to `/group-expenses`.
   6. Return `200 OK` upon PUT to `/group-expenses/:id/opt-out` to opt out of a group expense.
   7. Return `200 OK` upon DELETE to `/group-expenses/:id` to delete a group expense, as the creator of the expense with a valid group expense ID.
   8. Return `400 Bad Request` upon POST to `/group-expenses` with a negative expense value.
   9. Return `400 Bad Request` upon POST to `/group-expenses` including a username that does not exist.
   10. Return `400 Bad Request` upon GET to `/group-expenses/:id` with a group expense ID that does not exist.

### Integration Tests

1. After creating a new user with a POST request to `/users/register`, the new user data is found in the database with the hashed security answer and password.
2. After a client obtains JWT from signing in via POST to `/users/login`, the JWT can be used to make request to an authorized route.
3. After a client sends the correct security answer via POST to `/users/reset-password`, their password is successfully hashed and updated in the database.
4. After a client sends new user data via POST to `/account/`, their new user data is updated in the database.
5. After an expense is created via POST to `/expenses`, the user can then fetch the expense they just created via GET to `/expenses/:id`.
6. After an expense is deleted via POST to `/expenses/:id`, the expense no longer exists in the database, and they can no longer fetch the expense they just deleted via GET to `/expenses/:id`.
7. After an expense is created via POST to `/expenses`, it correctly contributes to the current months average daily spending retrieved from `/analytics/average-daily`.
8. After a user deletes their account via DELETE to `/account`, all data in the database associated with their user is deleted, except for group expenses.
9. After a user creates a group expense via POST to `/group-expenses`, and marks it as paid via `/group-expenses/:id`, the expense is added to their expenses in the database.
10. After a user creates a budget via POST to `/budgets`, the budget exists in the database and is associated with their account.

### 2.2 Test Completeness

- 100% back-end code coverage according to Jest
- 10 Integration tests
- Acceptance tests function as they are described in markdown files
- All unit, integration, regression, and acceptance tests pass
- All tests will be ran against each commit in each pull request
- Regression tests must pass on the most recent commit in master

## 3. Resource & Environment Needs

### 3.1 Testing Tools

**General Tools:**

- **Bug-tracking tool**: GitHub Issues
- **Automation tools**: Jest
- **Code coverage**: Jest
- **CI/CD**: GitHub Actions

**Backend**:

- Jest
- Chai
- Supertest

### 3.2 Test Environment

- Windows 10 or Ubuntu 22
- Docker-compose (latest version)
- Chrome (latest version)

## 4. Terms/Acronyms

Make a mention of any terms or acronyms used in the project

| Term/Acronym | Definition                                     |
| ------------ | ---------------------------------------------- |
| API          | Application Program Interface                  |
| AUT          | Application Under Test                         |
| QA           | Quality Assurance                              |
| CI/CD        | Continuous Integration / Continuous Deployment |
| JWT          | JSON Web Token                                 |
