# Group Expense Splitting Acceptance Tests

## Acceptance test summary

### Create group expense

1. Login as valid user
2. Navigate to the Group Expenses section
3. Click Add Group Expense
4. Fill in the required fields (Title, amount, category)
5. Fill in a second valid user name
6. Click save
7. Ensure the Group expense is added to the list.
8. Ensure the distribution is correct between users

### view paid status, mark paid status

1. Login as valid user with a group expense that is unpaid
2. Navigate to the Group Expenses section
3. Ensure the Has paid checkbox is not checked
4. Click the has paid Box
5. Click confirm on the disclaimer
6. Ensure the box is now marked with a check
7. Ensure an expense has been created in the expense list for the group expense
8. Ensure the group expense is checked as the other user in the group expense
