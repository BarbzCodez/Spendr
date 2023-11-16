# User Management Acceptance Tests

## Acceptance test summary

### Register, login, and logout

1. Click Get started
2. Enter all the fields
3. Click sign up
4. Ensure User is returned to login page
5. Enter the same login information
6. Click log in
7. Ensure log is successful and user is redirected to home page
8. Click the user icon
9. Click log out
10. Ensure user is logged out and returned to login menu

### change credentials

1. Enter valid user login credentials
2. Click login
3. Click user icon
4. Click settings
5. Click the edit icon next to user and password type in new values
6. Ensure successfully updated popup appears
7. Click Log out
8. Ensure updated credentials are valid for log in

### delete account

1. Enter valid user login credentials
2. Click login
3. Click user icon
4. Click settings
5. Click Delete Account
6. Ensure user is logged out and user credentials cannot be used for logging in
