# API built with Expressjs to communicate with a MongoDB backend.

This small application is an example of how a user can utilize node frameworks to make a working API with authentication.

## Usage

Make sure you already have Node.js installed and a MongoDB ready to connect with.

1.       npm i
2.  create your .env file and fill it with

- MONGODB_URI
- SESSION_SECRET
- NODE_ENV
- ALLOWED_ORIGIN
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET

## Features

The API implements the use of Passportjs to validate users logging in and accessing protected routes. Using the joi package the user can validate to make sure the req.body inputs are all matching the criteria needed by the route. If you wish to set up your own oauth login with google go ahead and check out https://console.cloud.google.com/apis/dashboard and follow the instructions on setting up your application. You can also check out https://www.passportjs.org/packages/passport-google-oauth20/ to see more of the details on google's oauth.
