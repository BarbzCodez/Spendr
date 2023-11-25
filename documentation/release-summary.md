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

### DockerHub repository - NEED HELP

The Docker image includes everything to run the application. Once the docker image is run, no additional actions are required to launch the application.

1. Provide the DockerHub link for your image. [DockerHub]()
2. Provide instructions to run your docker image(s).

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

## Infrastructure - NEED HELP

### Libraries

- [Material UI](https://mui.com/material-ui/)
  - We used Material UI to make the components in the front end. We chose it because is an industry standard, it has pretty icons and some of our developers have worked with it.
- What we used for the phone scanner

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

## Code

These are the most 5 important files in our repo:

| Path                                   | Purpose              |
| -------------------------------------- | -------------------- |
| [File Path with Clickable GitHub Link] | (1 line description) |
|                                        |                      |
|                                        |                      |
|                                        |                      |
|                                        |                      |

## Continuous Integration and Deployment (CI/CD) - NEED HELP

- Describe your CI/CD environment and provide the clickable link to your CI/CD pipeline.

[Continuous Integration](https://github.com/BarbzCodez/Spendr/blob/main/.github/workflows/ci.yml)
[Continuous Deployment](https://github.com/BarbzCodez/Spendr/blob/main/.github/workflows/cd.yml)

- Snapshots of the CI/CD execution. Provide one for CI and one for CD.

[CI/CD Workflow](https://github.com/BarbzCodez/Spendr/actions/workflows/cd.yml)

## Testing - NEED HELP

[Testing Plan](https://github.com/BarbzCodez/Spendr/blob/main/documentation/test-plan.md)

### Unit Tests

List the 10 most important unit test with links below (if there are more than one unit tests in one test file, indicate clearly)

| Test File                              | Whats Testing        |
| -------------------------------------- | -------------------- |
| [File Path with Clickable GitHub Link] | (1 line description) |
|                                        |                      |
|                                        |                      |
|                                        |                      |
|                                        |                      |

### Integration Tests

List the 5 most important integration test with links below (if there are more than one unit
tests in one test file, indicate clearly)

| Test File                              | Whats Testing        |
| -------------------------------------- | -------------------- |
| [File Path with Clickable GitHub Link] | (1 line description) |
|                                        |                      |
|                                        |                      |
|                                        |                      |
|                                        |                      |

### Acceptance Tests

List the 5 most important acceptance tests with links below.
If your acceptance tests are done manually, you should have detailed steps how to run the test and the expected outcome for test.

| Test File                              | Whats Testing        |
| -------------------------------------- | -------------------- |
| [File Path with Clickable GitHub Link] | (1 line description) |
|                                        |                      |
|                                        |                      |
|                                        |                      |
|                                        |                      |

### Regression Testing

1. Describe how you run regression testing and provide the link to the regression testing script.
2. Provide the last snapshot of the execution and results of regression testing.

### Load Testing

1. Describe the environment for load testing, including the tool and load test cases.
2. Provide the test report for load testing.
3. Discuss one bottleneck found in the load testing.

### Security Analysis

1. Describe the choice of the security analysis tool and how you run it.
2. Attach a report as an appendix below from static analysis tools by running the security analysis tool on your source code. Randomly select 5 detected problems and discuss what you see.
