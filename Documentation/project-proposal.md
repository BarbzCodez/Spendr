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

### User Management

- As a new user, I want to create an account so that I can start using the platform's functionalities.
- As a logged-out user, I want to be able to sign in to the website so that I can access my personal profile.
- As a logged-in user, I want to be able to log out so that I can ensure my data is secure when I'm done.
- As a registered user, I want to delete my account so that I can remove all my data from the platform.
- As a registered user, I want to change my username and password so that I can update my login credentials.

### Expense Management

- As a user, I want to add a new expense with details like amount, date, and category so that I can keep track of my spending.
- As a user, I want to delete an expense so that I can correct mistakes or remove unnecessary entries.
- As a user, I want to edit my expenses so that I can update incorrect or outdated information.
- As a user, I want to view a history of my expenses in a list so that I can see my past spending at a glance.
- As a user, I want to filter my expenses by category so that I can analyze my spending in specific areas.

### Budget Management

- As a user, I want to define weekly, monthly, and annual budgets so that I can set spending limits for different time frames.
- As a user, I want to modify my budgets so that I can adjust them based on changing financial circumstances.
- As a user, I want to remove a budget so that I can de-clutter my financial plans if a particular budget is no longer relevant.
- As a user, I want to set budgets for specific categories like food and travel so that I can allocate funds to different areas of my life.
- As a user, I want to see how much of my budget I have used so that I can adjust my spending habits

### Expense Analytics

- As a user, I want visual insights into my expenses so that I can quickly understand my spending habits.
- As a user, I want to analyze my expenses for specific time frames so that I can review my spending over set periods.
- As a user, I want to compare expenses over different time frames so that I can identify trends or changes in my spending.
- As a user, I want to see spending patterns for each category so that I can gain insights into where most of my money goes.
- As a user, I want visual alerts for changes in my spending patterns so that I can be promptly informed of significant variations in my spending habits.

### Group Expense Splitting

- As a user, I want to add other members to an expense by username so that we can jointly manage the expense.
- As a user, I want to mark a group expense as "paid" in the list of expenses so that everyone in the group is updated.
- As a user, I want to view the status of 'paid' by all other users part of the expense so that I know who has settled their share.
- As a user, I want to set a share of the price for the expense, such as evenly or unevenly distributed, so that everyone knows their contribution amount.
- As a user, I want to remove myself from a group expense so that I no longer participate in its tracking or payment.

## Technologies

- **Frontend Framework**: React (TypeScript)
- **Backend Framework**: Express.js (TypeScript)
- **Database**: PostgreSQL
- **Containerization**: Docker
- **Hosting**: Vercel
- **Version Control**: Git
- **CI/CD**: GitHub Actions
