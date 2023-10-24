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

### User Management

1. As a new user, I want to create an account so that I can start using the platform's functionalities.\
**Acceptance Criteria:**\
Given I am a new user,\
When I open the app and navigate to the registration page,\
Then I should be able to enter a unique username with a password and successfully register.

2. As a logged-out user, I want to be able to sign in to the website so that I can access my personal profile.\
**Acceptance Criteria:**\
Given I am a logged-out user,\
When I open the app and prompted to log in,\
Then I should be able to successfully log in with my unique username and password.

3. As a logged-in user, I want to be able to log out so that I can ensure my data is secure when I'm done.\
**Acceptance Criteria:**\
Given I am a logged-in user,\
When I press the log out button,\
Then I should successfully log out of my account.

4. As a logged-in user, I want to delete my account so that I can remove all my data from the platform.\
**Acceptance Criteria:**\
Given I am a logged-in user,\
When I navigate to user settings and choose the option to delete my account and accept the confirmation,\
Then my account should be securely deleted.

5. As a registered user, I want to change my username and password so that I can update my login credentials.\
**Acceptance Criteria:**\
Given I am a logged-in user,\
When I navigate to user settings and chose to either change my username or password and provide the info on the prompt,\
Then my username or password should be successfully changed.

### Expense Management

1. As a user, I want to add a new expense with details like amount, date, and category so that I can keep track of my spending.\
**Acceptance Criteria:**\
Given I am a logged-in user,\
When I use the "Add Expense" option,\
Then I should be able to enter the amount, date, and category and the added expense should appear in my expense history.

2. As a user, I want to delete an expense so that I can correct mistakes or remove unnecessary entries.\
**Acceptance Criteria:**\
Given I am a logged-in user,\
When I select to delete an expense,\
Then the expense should be deleted from my expense history after confirming the prompt.

3. As a user, I want to edit my expenses so that I can update incorrect or outdated information.\
**Acceptance Criteria:**\
Given I am a logged-in user,\
When I choose to edit an expense,\
Then I should be able to edit the expense info and the updated info should appear correctly in the expense history.

4. As a user, I want to view a history of my expenses in a list so that I can see my past spending at a glance.\
**Acceptance Criteria:**\
Given I am a logged-in user,\
When I navigate to the expense history tab,\
Then I should see a list of all my recorded expenses, sorted by date in descending order by default.

5. As a user, I want to filter my expenses by category so that I can analyze my spending in specific areas.\
**Acceptance Criteria:**\
Given I am a logged-in user,\
When I navigate to the expense history tab,\
Then I should be able to filter the expenses by category and the list would update appropriately.

### Budget Management

1. As a user, I want to define a budget with frequency (weekly/monthly/annual) and a category so that I can set spending limits for different time frames and categories.\
**Acceptance Criteria:**\
Given I am a logged-in user,\
When I access the app's "Set Budget" feature,\
Then I should be able to set a weekly/monthly/annual amount and category in the budget.

2. As a user, I want to modify my budgets so that I can adjust them based on changing financial circumstances.\
**Acceptance Criteria:**\
Given I am a logged-in user,\
When I chose to edit an existing budget,\
Then the new budget should successfully update and show accordingly.

3. As a user, I want to remove a budget so that I can de-clutter my financial plans if a particular budget is no longer relevant.\
**Acceptance Criteria:**\
Given I am a logged-in user,\
When I select to remove an existing budget,\
Then the budget should be successfully removed and not show on the budget tab.

4. As a user, I want to see how much of my budget I have used so that I can adjust my spending habits.\
**Acceptance Criteria:**\
Given I am a logged-in user,\
When I navigate to the budget tab,\
Then I should see already existing budgets and their progress.

### Expense Analytics

1. As a user, I want visual insights into my daily expenses for the current month so that I can quickly understand my spending habits.\
**Acceptance Criteria:**\
Given I am a logged-in user,\
When I access the app's analytics dashboard,\
Then I should be able to see spending trends and patterns displayed through graphs and charts.

2. As a user, I want to visually compare expenses over two separate past months so that I can identify trends or changes in my spending.\
**Acceptance Criteria:**\
Given I am a logged-in user,\
When I choose the "Compare" option in the analytics dashboard,\
Then I should be able to see spending trends and habits of two past months side by side.

3. As a user, I want to see spending patterns for the current month each category so that I can gain insights into where most of my money goes.\
**Acceptance Criteria:**\
Given I am a logged-in user,\
When I chose to filter the analytics dashboard by category,\
Then then analytics dashboard should correctly update and I should be able to see the spending patterns for the chosen category.

4. As a user, I want a text summary for changes while comparing expenses so that I can be promptly informed of significant variations in my spending habits.\
**Acceptance Criteria:**\
Given I am a logged-in user,\
When I am comparing expenses of 2 past months,\
Then I should be able to see a text informing me about the change.

### Group Expense Splitting

1. As a user, I want to add other members to an expense by username so that we can jointly manage the expense.\
**Acceptance Criteria:**\
Given I am a logged-in user,\
When I add an expense and set it as a group expense,\
Then I should be prompted to enter other members' usernames.

2. As a user, I want to mark a group expense as "paid" in the list of expenses so that everyone in the group is updated.\
**Acceptance Criteria:**\
Given I am a logged-in user,\
When I mark a group expense as "paid",\
Then the expense should be correctly updated in mine's and everyone in the group's expense history .

3. As a user, I want to view the status of 'paid' by all other users part of the expense so that I know who has settled their share.\
**Acceptance Criteria:**\
Given I am a logged-in user,\
When I open a group expense in my expense history,\
Then I should be able to see the "paid" status of other people who participated in the shared expense.

4. As a user, I want to set a share of the price for the expense, such as evenly or unevenly distributed, so that everyone knows their contribution amount.\
**Acceptance Criteria:**\
Given I am a logged-in user,\
When I input a group expense and set even contributions or custom percentages,\
Then the expense amount of everyone involved should be updated appropriately.
