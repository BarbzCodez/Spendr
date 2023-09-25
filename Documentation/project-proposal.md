# COMP 4350 Project Proposal - Team Spendr

## Team Members

- Daniel La Rocque [larocq17@myumanitoba.ca](larocq17@myumanitoba.ca)
- Victoria Kogan [koganv@myumanitoba.ca](koganv@myumanitoba.ca)
- Mark Lysack [lysackm@myumanitoba.ca](lysackm@myumanitoba.ca)
- Barbara Guzman Romero [guzmanrb@myumanitoba.ca](guzmanrb@myumanitoba.ca)
- Ethan Ducharme [duchar36@myumanitoba.ca](duchar36@myumanitoba.ca)

## Project Summary and Vision

In today's digital age, the ability to efficiently manage finances has become essential for individuals and groups alike. With this understanding, we present Spendr, an innovative solution engineered to offer users a holistic view of their finances and empower them with the tools necessary to make informed decisions.

Vision Statement: Spendr envisions a world where individuals possess the capability and ease to monitor, analyze, and manage their expenses seamlessly, both individually and in groups. We aim to transform the financial landscape by fostering financial literacy, ensuring transparency in shared financial engagements, and promoting fiscally responsible habits.

Stakeholders:

1. **End Users** - Individuals looking to track, analyze, and manage their expenses.
2. **Group Users** - Friends, roommates, and colleagues aiming to split and manage shared expenses.
3. **COMP 4350 Team** - The dedicated team responsible for developing, maintaining, and improving the Spendr application.
4. **COMP 4350 Instructors and Evaluators** - Those overseeing the project's progression, offering guidance, and assessing the product's quality.

## Technologies

- **Frontend Framework**: React (TypeScript)
- **Backend Framework**: Express.js (TypeScript)
- **Database**: PostgreSQL
- **Containerization**: Docker
- **Hosting**: Vercel
- **Version Control**: Git
- **CI/CD**: GitHub Actions

## Core Features

### Functional Features

1. User Management
2. Expense Entry and History
3. Budget Management
4. Expense Analytics
5. Group Expense Splitting

### Non-Functional Feature

**Performance**: 95% of user requests (e.g. logging in, adding an expense, checking analytics) should be processed and receive a response within 1 second under normal load conditions.

## User Stories

### Feature 1. User Management

- **User Story**: As a potential user, I want to register an account with Spendr to start tracking my expenses so that I can start keep track of my expenses.
  - **Acceptance Criteria**:
    - Can register with username and password.

- **User Story**: As a registered user, I want to log in to my Spendr account to access my expenses and budgets so that I can add my expenses.
  - **Acceptance Criteria**:
    - Can securely log in using username and password.
    - Can log out of the account.

### Feature 2. Expense Entry and History

- **User Story**: As a Spendr user, I want to quickly input my daily expenses so that I can view my history later.
  - **Acceptance Criteria**:
    - Can add an expense with category, amount, and date.
    - The added expense is recorded and reflected immediately in my history.

- **User Story**: As a Spendr user, I want to view and manage my expense history so that I have an easy way to understand my expenses.
  - **Acceptance Criteria**:
    - Can view a list of all recorded expenses.
    - Can edit or delete an existing expense.

### Feature 3. Budget Management

- **User Story**: As a Spendr user, I want to set a monthly or weekly budget to control my spending so that I don't overspend.
  - **Acceptance Criteria**:
    - Can define a monthly or weekly budget amount.
    - The budget is displayed prominently in the application.

### Feature 4. Expense Analytics

- **User Story**: As a Spendr user, I want visual insights on my spending habits so that I make informed financial decisions later.
  - **Acceptance Criteria**:
    - Can view graphical representations (like bar and pie charts) of my spending by category or time.
    - Can see a breakdown of expenses for specific periods (weekly, monthly, yearly).

### Feature 5. Group Expense Splitting

- **User Story**: When I have shared expenses, I want to split them among friends or roommates so that I can keep track of who owes me money.
  - **Acceptance Criteria**:
    - Can add usernames when inputting an expense.
    - Can split an expense equally or by percentages.
    - The application calculates and displays the share each individual owes.
    - The user that made the expense or the individual that owe, can mark as paid.