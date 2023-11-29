# Spendr Release Summary

## Team Members

| Name                  | Email                                              | GitHub username | Role                                          |
| --------------------- | -------------------------------------------------- | --------------- | --------------------------------------------- |
| Daniel La Rocque      | [larocq17@myumanitoba.ca](larocq17@myumanitoba.ca) | dlarocque       | Full Stack Developer                          |
| Victoria Kogan        | [koganv@myumanitoba.ca](koganv@myumanitoba.ca)     | VictoriaKGN     | Frontend Developer                            |
| Mark Lysack           | [lysackm@myumanitoba.ca](lysackm@myumanitoba.ca)   | lysackm         | Backend Developer and CI/CD                  |
| Barbara Guzman Romero | [guzmanrb@myumanitoba.ca](guzmanrb@myumanitoba.ca) | BarbzCodez      | Frontend Developer                            |
| Ethan Ducharme        | [duchar36@myumanitoba.ca](duchar36@myumanitoba.ca) | DucharmeEthan   | Backend Developer and Database Administrator |

## Project Summary

In today's digital age, the ability to efficiently manage finances has become essential for individuals and groups alike. With this understanding, we present Spendr, an innovative solution engineered to offer users a holistic view of their finances and empower them with the tools necessary to make informed decisions.

Embracing the Spendr vision, we've not only progressed but elevated our journey! Checkout how we implement all the user stories, enhancing them with a cutting-edge auto form filler to add expenses directly from images.

### GitHub Repository

[Spendr GitHub Repository](https://github.com/BarbzCodez/Spendr)

### DockerHub repository

DockerHub is a way to automatically deploy versions of both the server image and the client image. These images can be pulled and used to run the most recent version of the app. DockerHub also has previous versions of the application which can be used. These images are pushed automatically by the CD pipeline which is ran via github actions.

The Docker image includes everything to run the application. Once the docker image is run, no additional actions are required to launch the application.

#### DockerHub Links

- [Spendr client](https://hub.docker.com/r/lysackm/spendr-client)
- [Spendr server](https://hub.docker.com/r/lysackm/spendr-server)

#### DockerHub Instructions

1. Provide instructions to run your docker image(s).

### User Stories

The User Stories are documented in our [Project Proposal User Stories](project-proposal.md#user-stories).

The progress of the Spendr development can be found on the Git Milestone page.

- [Sprint 1](https://github.com/BarbzCodez/Spendr/milestone/1?closed=1)
- [Sprint 2](https://github.com/BarbzCodez/Spendr/milestone/2?closed=1)
- [Sprint 3](https://github.com/BarbzCodez/Spendr/milestone/3?closed=1)
- [Sprint 4](https://github.com/BarbzCodez/Spendr/milestone/4?closed=1)

Note: The links go to to the closed user stories, you can click in each user user story to see when they where finished.

## User Manual - NEED HELP

Provide instructions on how to run the application for each core feature.

### User Management

#### Create a User

#### Log In

#### Log Out

#### Edit Credentials

#### User Deletion

### Expense Management

#### View your Expenses

#### Create an Expense

#### Edit an Expense

#### Delete an Expense

### Budget Management

#### View your Budgets

#### Create an Budget

#### Delete a Budget

### Expense Analytics

#### Current Month Analysis

#### Compare Months

### Group Expense Splitting

#### View your Group Expenses

#### Create an Group Expense

#### Edit an Group Expense

#### Delete an Group Expense

## Architecture Design

This is the Spendr [Architecture Design](https://github.com/BarbzCodez/Spendr/blob/main/documentation/architecture/client-server-architecture.jpeg).

![Architecture Diagram](./architecture/client-server-architecture.jpeg)

### Architecture Diagrams per Feature

#### [User Management](https://github.com/BarbzCodez/Spendr/blob/main/documentation/sequence-diagrams/user-management.jpeg)

![User Diagram](./sequence-diagrams/user-management.jpeg)

#### [Expense Management](https://github.com/BarbzCodez/Spendr/blob/main/documentation/sequence-diagrams/expense-management.jpeg)

![Expense Diagram](./sequence-diagrams/expense-management.jpeg)

#### [Budget Management](https://github.com/BarbzCodez/Spendr/blob/main/documentation/sequence-diagrams/budget-management.jpeg)

![Budget Diagram](./sequence-diagrams/budget-management.jpeg)

#### [Expense Analytics](https://github.com/BarbzCodez/Spendr/blob/main/documentation/sequence-diagrams/expense-analytics.jpeg)

![Analytics Diagram](./sequence-diagrams/expense-analytics.jpeg)

#### [Group Expense Splitting](https://github.com/BarbzCodez/Spendr/blob/main/documentation/sequence-diagrams/group-expense-splitting.jpeg)

![Analytics Diagram](./sequence-diagrams/group-expense-splitting.jpeg)

## Infrastructure - Dan

### Libraries

- [Material UI](https://mui.com/material-ui/)
  - We used Material UI to make the components in the front end. We chose it because is an industry standard, it has pretty icons and some of our developers have worked with it.
  - What we used for the phone scanner

List of Dependencies

1. **@prisma/client (^5.4.1):**
   - Prisma is an open-source database toolkit. The `@prisma/client` package is an auto-generated query builder and object-relational mapping (ORM) library for TypeScript and JavaScript.

2. **bcrypt (^5.1.1):**
   - Bcrypt is used for hashing passwords securely. It's a popular choice for password hashing to enhance the security of user authentication.

3. **body-parser (^1.20.2):**
   - Body-parser is middleware for parsing the body of incoming HTTP requests. It is commonly used with Express to parse request bodies in a format such as JSON.

4. **cors (^2.8.5):**
   - CORS (Cross-Origin Resource Sharing) is a mechanism that allows or restricts the resources on a web page to be requested from another domain. The `cors` package simplifies handling CORS headers in Express applications.

5. **dotenv (^16.3.1):**
   - Dotenv is used for loading environment variables from a .env file. It helps keep sensitive information like API keys and database connection strings secure.

6. **express (^4.18.2):**
   - Express is a fast, unopinionated, minimalist web framework for Node.js. It simplifies the process of building web applications and APIs.

7. **express-validator (^7.0.1):**
   - Express-validator is a set of Express.js middlewares that wraps validator.js validator and sanitizer functions. It is used for input validation and sanitation in Express applications.

8. **jsonwebtoken (^9.0.2):**
   - JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. The `jsonwebtoken` package is used for creating and verifying JWTs, often used for authentication.

9. **morgan (^1.10.0):**
   - Morgan is an HTTP request logger middleware for Node.js. It simplifies the process of logging requests, making it easier to debug and monitor the application.

10. **pg (^8.11.3):**

- The `pg` (PostgreSQL) package is a PostgreSQL client for Node.js. It is used to interact with PostgreSQL databases.

Dev Dependencies

1. **@types/bcrypt (^5.0.0):**
   - TypeScript type definitions for the `bcrypt` library.

2. **@types/cors (^2.8.14):**
   - TypeScript type definitions for the `cors` library.

3. **@types/express (^4.17.18):**
   - TypeScript type definitions for the Express.js library.

4. **@types/jest (^29.5.5):**
   - TypeScript type definitions for Jest, a testing framework.

5. **@types/jsonwebtoken (^9.0.3):**
   - TypeScript type definitions for the `jsonwebtoken` library.

6. **@types/mocha (^10.0.2):**
   - TypeScript type definitions for Mocha, a JavaScript test framework.

7. **@types/morgan (^1.9.7):**
   - TypeScript type definitions for the `morgan` library.

8. **@types/node (^20.7.1):**
   - TypeScript type definitions for Node.js.

9. **@types/supertest (^2.0.13):**
   - TypeScript type definitions for SuperTest, a library for testing HTTP assertions.

10. **@typescript-eslint/eslint-plugin (^6.7.3):**
    - ESLint plugin for TypeScript.

11. **eslint (^8.50.0):**
    - ESLint is a linter tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.

12. **eslint-config-prettier (^9.0.0):**
    - ESLint configuration that turns off all rules that are unnecessary or might conflict with Prettier.

13. **eslint-plugin-prettier (^5.0.0):**
    - ESLint plugin for Prettier integration.

14. **jest (^29.7.0):**
    - Jest is a JavaScript testing framework. It is widely used for unit and integration testing.

15. **jest-mock-extended (^3.0.5):**
    - Jest extension for creating and using mock functions.

16. **prisma (^5.4.1):**
    - Prisma CLI (Command Line Interface) for database migrations and other Prisma-related tasks.

17. **supertest (^6.3.3):**
    - SuperTest is a library for testing HTTP assertions. It is often used in combination with Jest for testing Express.js applications.

18. **ts-jest (^29.1.1):**
    - TypeScript preprocessor for Jest.

19. **typescript (^4.4.3):**
    - TypeScript is a superset of JavaScript that adds static types to the language. It is used for writing type-safe and scalable code in Node.js applications.

### Framework

- [React](https://react.dev)
  - We choose React because is an industry standard and some of our developers have already had experience with it.
- [Express.js](https://expressjs.com)
  - We used this one since our front end is in typescript so we wanted all the project to be in the same language.

### Database

- [PostgreSQL](https://www.postgresql.org)
  - We chose PostgreSQL because some of our developers have already worked on it

### Tools

- [Docker](https://www.docker.com)
  - We chose Docker for containerization since it was the easiest way to have a consistent way of running the project.
- [GitHub Actions](https://github.com/features/actions)
  - We chose GitHub actions since it was easy to integrate to the workflow.

## Naming Conventions

We used standard [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html) as both the front our front and back end are in TypeScript

## Code - Dan

These are the most 5 important files in our repo:

| Path                                   | Purpose              |
| -------------------------------------- | -------------------- |
| [File Path with Clickable GitHub Link] | (1 line description) |
|                                        |                      |
|                                        |                      |
|                                        |                      |
|                                        |                      |

## Continuous Integration and Deployment (CI/CD)

Both our CI/CD pipelines were created using Github Actions. The CI pipeline was triggered when a PR was created, or updated. This builds both the server and client separately. Verifying that both are able to build from that branch. As well as running the test suits and using a linter to check for formatting errors. Now the code smells are reported using SonarCloud when the CI pipeline triggers. The results are then able to be seen in the github actions tab or the PR itself.

The CD pipeline runs when a commit is added to the main branch, most likely from a PR being closed. It builds the client and server, then creates a docker image which is then pushed to DockerHub.

[Continuous Integration](https://github.com/BarbzCodez/Spendr/blob/main/.github/workflows/ci.yml)

[Continuous Deployment](https://github.com/BarbzCodez/Spendr/blob/main/.github/workflows/cd.yml)

#### Snapshots

[CD](https://github.com/BarbzCodez/Spendr/actions/runs/6985882437/job/19010698130)
![CD snapshot](./pictures/CD.PNG)

[CI](https://github.com/BarbzCodez/Spendr/actions/runs/7010842181)
![CI snapshot](./pictures/CI.PNG)

[CI/CD Workflow](https://github.com/BarbzCodez/Spendr/actions/workflows/cd.yml)

## Testing - Dan

[Testing Plan](https://github.com/BarbzCodez/Spendr/blob/main/documentation/test-plan.md)

### Unit Tests - Dan

List the 10 most important unit test with links below (if there are more than one unit tests in one test file, indicate clearly) 2 per feature

| Test File                              | Whats Testing        |
| -------------------------------------- | -------------------- |
| [File Path with Clickable GitHub Link] | (1 line description) |
|                                        |                      |
|                                        |                      |
|                                        |                      |
|                                        |                      |

### Integration Tests - Dan

List the 5 most important integration test with links below (if there are more than one unit
tests in one test file, indicate clearly)

| Test File                              | Whats Testing        |
| -------------------------------------- | -------------------- |
| [File Path with Clickable GitHub Link] | (1 line description) |
|                                        |                      |
|                                        |                      |
|                                        |                      |
|                                        |                      |

### Acceptance Tests - Dan

List the 5 most important acceptance tests with links below.
If your acceptance tests are done manually, you should have detailed steps how to run the test and the expected outcome for test.

| Test File                              | Whats Testing        |
| -------------------------------------- | -------------------- |
| [File Path with Clickable GitHub Link] | (1 line description) |
|                                        |                      |
|                                        |                      |
|                                        |                      |
|                                        |                      |

### Regression Testing - Dan

1. Describe how you run regression testing and provide the link to the regression testing script.
2. Provide the last snapshot of the execution and results of regression testing.

### Load Testing

The load testing was done using JMeter, then run against a locally running version of the app. The test cases was a simulation of what a standard user may do when using the app. This includes creating an account, logging in, creating an expense, fetching expense data, creating a budget, and fetching budget, fetching analytics data, creating and fetching group expenses.

#### Load Testing: JMeter Summary Report

| Label                 | # Samples | Average | Min | Max | Std. Dev. | Error % | Throughput | Received KB/sec | Sent KB/sec | Avg. Bytes |
|-----------------------|-----------|---------|-----|-----|-----------|---------|------------|-----------------|-------------|------------|
| create user1          | 20        | 215     | 0   | 275 | 24.65     | 0.00%   | 1.97161    | 0.69            | 0.55        | 358.9      |
| create user2          | 20        | 222     | 0   | 435 | 65.54     | 0.00%   | 1.96967    | 0.69            | 0.55        | 358.9      |
| login                 | 20        | 70      | 0   | 100 | 12.17     | 0.00%   | 1.99283    | 0.94            | 0.45        | 481.7      |
| create expense        | 20        | 69      | 0   | 135 | 19.12     | 0.00%   | 2          | 0.9             | 0.55        | 459        |
| fetch expenses        | 20        | 4       | 0   | 16  | 3.22      | 0.00%   | 2.01227    | 0.58            | 0.33        | 293        |
| add budget            | 20        | 115     | 0   | 190 | 32.6      | 0.00%   | 2.0008     | 0.81            | 0.45        | 413        |
| fetch budgets         | 20        | 7       | 0   | 13  | 3.35      | 0.00%   | 2.01837    | 0.58            | 0.32        | 293        |
| fetch analytics       | 240       | 5       | 0   | 17  | 2.07      | 0.00%   | 24.09155   | 6.89            | 5.78        | 293        |
| create group expenses | 20        | 278     | 0   | 331 | 36.67     | 0.00%   | 1.97316    | 0.85            | 0.64        | 440        |
| fetch group expenses  | 20        | 7       | 0   | 23  | 5         | 0.00%   | 2.00582    | 1.1             | 0.34        | 559.8      |
| TOTAL                 | 420       | 50      | 0   | 435 | 84.9      | 0.00%   | 38.40176   | 12.81           | 9.1         | 341.6      |

![JMeter Summary Report](./pictures/JMeter.PNG)

A bottleneck found during load testing was the amount of data that fetching group expenses caused. Since this is an operation that happens whenever the group expenses page is loaded, this is a frequent API call. This means that the high data transfer should be reduced. This could be solved by using caching on client side, or an optimization of the data returned from the endpoint.

### Security Analysis - Dan

1. Describe the choice of the security analysis tool and how you run it.
2. Attach a report as an appendix below from static analysis tools by running the security analysis tool on your source code. Randomly select 5 detected problems and discuss what you see.
