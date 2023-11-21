# User Management Acceptance Tests

## Acceptance Test Summary

### Register, Login, and Logout

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

### Change Credentials

1. Enter registered user login credentials
2. Click login
3. Click user icon
4. Click settings
5. Click the edit icon next to user and password type in new values
6. Click Save
7. Ensure successfully updated popup appears
8. Click Log out
9. Ensure updated credentials are valid for log in

### Delete Account

1. Enter registered user login credentials
2. Click login
3. Click user icon
4. Click settings
5. Click Delete Account
6. Ensure user is logged out and user credentials cannot be used for logging in
