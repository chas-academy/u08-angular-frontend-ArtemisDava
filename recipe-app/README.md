# RecipeApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.12.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 14 or higher)
- npm (comes with Node.js)
- Angular CLI (`npm install -g @angular/cli`)

## Installation

1. Clone the repository:

```bash
git clone [your-repository-url]
cd recipe-app
```

2. Install dependencies:

```bash
npm install
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Running Tests

To run the unit tests:

```bash
ng test
```

This will execute the unit tests via [Karma](https://karma-runner.github.io).

## Building for Production

To build the project for production:

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

## API Connection

The application connects to a RESTful API hosted at `https://express-api-jbkl.onrender.com/api/v1/`. The API endpoints include:

- GET `/api/v1/admin/recipes` - Fetch all recipes
- GET `/api/v1/admin/recipes/:id` - Fetch a specific recipe
- POST `/api/v1/admin/recipes` - Create a new recipe
- PUT `/api/v1/admin/recipes/:id` - Update an existing recipe
- DELETE `/api/v1/admin/recipes/:id` - Delete a recipe
- GET `/api/v1/categories` - Fetch all recipe categories
- GET `/api/v1/ingredients` - Fetch all available ingredients

## Features

- View all recipes
- Add new recipes
- Edit existing recipes
- Delete recipes
- Responsive design for all screen sizes
- Form validation
- Error handling

## Responsive Design

The application is fully responsive and optimized for screen widths ranging from 375px to 1920px. The layout and components automatically adjust to provide the best user experience across different device sizes, from mobile phones to large desktop displays.

## Project Structure

```
recipe-app/
├── src/
│   ├── app/
│   │   ├── add-recipe/        # Add new recipe component
│   │   ├── delete-recipe/     # Delete recipe component
│   │   ├── edit-recipe/       # Edit recipe component
│   │   ├── recipe-detail/     # Recipe details component
│   │   └── recipes/           # Recipe list component
│   ├── assets/               # Static assets
│   └── environments/         # Environment configurations
├── angular.json             # Angular configuration
├── package.json            # Project dependencies
└── tsconfig.json          # TypeScript configuration
```

## Error Handling

The application implements error handling for:

- API connection issues
- Form validation
- User input validation
- Network errors

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
