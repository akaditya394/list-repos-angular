# Github Repositories Listing App

This Angular single-page application (SPA) allows users to search for Github repositories by username and view the public repositories of the specified user.

## Features

- Search for Github repositories by username
- Display the public repositories of the specified user
- Pagination for server-side pagination of repositories
- Skeleton loader for indicating loading state
- Zero state display when no repositories are found
- Fully responsive design

## Prerequisites

- Node.js and npm installed on your machine
- Angular CLI installed globally (`npm install -g @angular/cli`)

## Installation

1. Clone the repository to your local machine:

```
git clone https://github.com/akaditya394/list-repos-angular.git
```

2. Navigate to the project directory:

```
cd list-repos-angular
```

3. Install dependencies:

```
npm install
```

## Usage

1. Start the development server:

```
ng serve
```

2. Open your browser and visit `http://localhost:4200` to view the app.

## Running Tests

This project contains unit tests for one component and one service with 100% code coverage.

1. Run the tests:

```
ng test
```

2. View the test coverage report in the terminal or open the generated `coverage` folder to view it in a browser.

## API Documentation

For more information on the GitHub REST API used in this project, refer to the [official documentation](https://docs.github.com/en/rest/reference).
