# Test Plan for Spendr

## Changelog

| Version | Change Date | By                                               | Description                                        |
| ------- | ----------- | ------------------------------------------------ | -------------------------------------------------- |
| 0.1     | 10/02/2023  | [Daniel La Rocque](https://github.com/dlarocque) | Created initial testing plan template in markdown. |

---

## 1. Introduction

### 1.1 Scope

Scope defines the features, functional or non-functional requirements of the software that will be tested.

### 1.2 Roles and Responsibilities

Detail description of the Roles and responsibilities of different team members like. Note you only need to list the role you have in your team. There are some example roles.

- QA Analyst
- Test Manager
- Configuration Manager
- Developers
- Installation Team

| Name | UMNet ID | GitHub username | Role |
| ---- | -------- | --------------- | ---- |

---

## 2. Test Methodology

### 2.1 Test Levels

Test Levels define the Types of Testing to be executed on the Application Under Test (AUT). In this course, unit testing, integration testing, acceptance testing, regression testing, and load testing are mandatory. Please describe how will you do these testings. You may skip load testing at this moment. Please revisit it after the related lecture is given.

#### Requirements

- List the class/method/core feature you plan to test and how you could like test them and its acceptance criteria.
- For unit testing, at least 10 unit tests for EACH core feature to cover the code related to each core feature.
- For integration testing, at least 10 in total to cover core features.
- Acceptance testing for each core feature. Let’s use end-user test for this. You can ask real end-user or your team members to go through each user story and see if the requirements are met.
- For regression testing, need to execute all above unit tests + integration tests you have for each commit pushed to the main branch.
- For load testing, when designing the load, make sure at least two requests associated with every core feature are included in the test load.

### 2.2 Test Completeness

Here you define the criteria that will deem your testing complete. For instance, a few criteria to check Test Completeness would be:

- 100% back-end code coverage (mandatory for this project), all the back-end source code should be covered by test cases.

## 3. Resource & Environment Needs

### 3.1 Testing Tools

Make a list of Tools like:

- Requirements Tracking Tool
- Bug Tracking Tool
- Automation Tools
- ...

### 3.2 Test Environment

It mentions the minimum hardware requirements that will be used to test the Application.

**Example**, following software's are required in addition to client-specific software.

- Windows 8 and above
- Travis-CI
- Jenkins
- Jmeter
- ...

## 4. Terms/Acronyms

Make a mention of any terms or acronyms used in the project

| TERM/ACRONYM | DEFINITION                    |
| ------------ | ----------------------------- |
| API          | Application Program Interface |
| AUT          | Application Under Test        |
