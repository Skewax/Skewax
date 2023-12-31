Skewax is an IDE designed around the PBASIC language and the Parallax Basic microcontroller family. The software tools designed to help develop for these microcontrollers have continually been deprecated, shut down, or become increasingly buggy to the point of uselessness. Skewax aims to create a fully featured and easy to use system to replace all of the outdated systems that currently exist.

# Running Server

Command to start up the entire webserver:
`docker-compose up`

## Development Environment

`docker-compose.yml` is the file which is used by compose to run the server.
This compose file is currently a development file. The production compose file is still to be written.

### Required Environment Files
#### `.db.env`
requires variables `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB`

#### `.web.env`
requires variables:
- VITE_GRAPHQL_ENDPOINT
- VITE_LOGIN_ENDPOINT
- VITE_REFRESH_ENDPOINT

#### `.redis.env`

#### `.server.env`
requires variables: 
- REDIRECT_URI
- GOOGLE_OAUTH_CLIENT_ID
- GOOGLE_OAUTH_CLIENT_SECRET
- GOOGLE_OAUTH_SCOPES
- GOOGLE_REDIRECT_URI
- DB_HOST
- DB_PORT
- DB_NAME
- DB_USER
- DB_PASSWORD
- JWT_KEY
- ALLOWED_ORIGINS

# [Issue Tracker](https://trello.com/b/TZLNcQoT)

# Tech Stack

- Go
- PostgreSQL
- GraphQL
- TS/JS
    - React
    - MUI
    - CodeMirror
        - Lezer
    - Apollo

# Overarching Goals
## Backend & Auth


- Google Auth Handling
- API Requests to drive
- Database storage 
- Caching as well

## Frontend 
- Building out LSP/parser
- Intellisense / doc comment detection
- UX rebuild
- File Tree Improvements

# Milestones

## September

- Having a local dev environment that can be easily installed/setup with documentation on how to do so.
- Running Backend Server that can send and receive info from/to clients.
    - Running client
- Tokenize and parse given source code into basic AST.
    - Minimal or no type information within AST


## October

- User auth flow functioning
    - Client side sign in
    - Passing tokens to server
    - Storing tokens with user ID 
    - (stretch) smart refresh of tokens on expiry

- Graceful syntax and semantic error handling
    - Display and aggregate diagnostics
    - Remove all “panicking” code

- Extracting and debugging / rendering information from AST
    - Hovering and variable names
    - Variable types
    - Comment analysis (i.e. documentation)

## November


- Drive interactions
    - Frontend file listing
        - Creating the file and dir viewing frontend code
        - Allowing clicking files to open into the editor
        - (stretch) tab system for files?
    - File editing
    - File creating/deletion
    - (If not done in Octobre) handling token refresh
    - Handling non PBASIC Files (since it will be an open folder)
        - Handling locked files (one’s don’t have write access to)
 
- Intractability of the “language server”
    - Call appropriate actions when user interacts with editor
        - i.e. hovering and documentation overview


## December

- Polishing UX and stabilizing all the new code.
- Finish up any unfinished segments of prior months’ workload which prove difficult.
