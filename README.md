# Oxygen Pro Portals

![Oxygen Pro Logo](./libs/ui-kit/src/assets/media/oxygen-logo-dark-mode.svg)

Oxygen Pro is a scalable monorepo project built with [Nx](https://nx.dev/) and multiple [Next.js](https://nextjs.org/) applications. This setup enables efficient development, testing, and deployment of various portals, including backoffice and business portals.


## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Nx Commands](#nx-commands)
- [Project Structure](#project-structure)
- [Docker Setup](#docker-setup)
- [Conventional Commit Messages](#conventional-commit-messages)
- [Additional Resources](#additional-resources)


## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js**: Version `20.0.0` or higher
- **npm**: Comes bundled with Node.js
- **Nx CLI**: Install globally using `npm install -g nx`
- **Docker** (Optional): For containerization and deployment



## Getting Started

Follow these steps to set up the project locally:

1. **Install Node.js**

   Ensure you're using the correct Node.js version as specified in the `.nvmrc` file. Use `nvm` to manage Node.js versions.

   ```bash
   nvm install 20
   nvm use 20
   ```

2. **Install Nx CLI**

   Install Nx CLI globally if you haven't already:

   ```bash
   npm install -g nx
   ```

3. **Install Dependencies**

   Install the project dependencies:

   ```bash
   npm install
   # If you encounter issues, you can force install:
   npm install --force
   ```

4. **Start the Development Server**

   Launch the development server:

   ```bash
   npm run dev
   ```

   The application should now be running at `http://localhost:3000`.


## Available Scripts

The project includes various npm scripts to streamline development, testing, and deployment.

### General Commands

- **Start Development Server**

  ```bash
  npm run dev
  ```

- **Start Specific Portal in Development**

  ```bash
  npm run dev-business
  ```

- **Start Production Server**

  ```bash
  npm run start-prod
  ```

- **Build the Project**

  ```bash
  npm run build
  ```

- **Build Specific Portals**

  ```bash
  npm run build-backoffice
  npm run build-business
  ```

- **Run Tests**

  ```bash
  npm run test
  ```

- **Lint the Codebase**

  ```bash
  npm run lint
  ```

### Widget Management

- **Generate Widgets**

  Create new widgets using the following commands:

  ```bash
  npm run widget-g
  npm run widget-g <widget-name>
  ```

### Storybook Integration

- **Start Storybook**

  ```bash
  npm run storybook
  ```

- **Build Storybook**

  ```bash
  npm run build-storybook
  ```


## Nx Commands

The default project is `backoffice-portal`, so running Nx commands without specifying a project will target it.

### Common Commands

- **Build the Default Project**
  
  ```bash
  nx build
  ```
  *(Equivalent to `nx build backoffice-portal`)*

- **Start Development Server**
  
  ```bash
  nx dev
  ```
  *(Equivalent to `nx dev backoffice-portal`)*

- **Start Production Server**
  
  ```bash
  nx start
  ```
  *(Equivalent to `nx start backoffice-portal`)*

### Targeting Specific Portals

To interact with other portals, specify the project name in your Nx commands:

- **Build a Specific Portal**
  
  ```bash
  nx build <portal-name>
  ```

- **Start a Specific Portal in Development**
  
  ```bash
  nx dev <portal-name>
  ```

- **Start a Specific Portal in Production**
  
  ```bash
  nx start <portal-name>
  ```

- **Lint a Specific Portal**
  
  ```bash
  nx lint <portal-name>
  ```

- **Run Tests for a Specific Portal**
  
  ```bash
  nx test <portal-name>
  ```

*Replace `<portal-name>` with the name of the desired portal, such as `business-portal`.*


## Project Structure

The project follows a monorepo structure managed by Nx, allowing multiple applications and libraries to coexist efficiently.

```
oxygen-pro-portals/
├── apps/
│   ├── backoffice-portal/
│   │   ├── Dockerfile
│   │   ├── docker-compose.yml
│   │   └── ... 
│   ├── business-portal/
│   │   ├── Dockerfile
│   │   ├── docker-compose.yml
│   │   └── ...
│   └── ... 
├── libs/
│   ├── backoffice/
│   │   └── ... 
│   ├── business/
│   │   └── ... 
│   ├── customer/
│   │   └── ... 
│   ├── ui-kit/
│   │   └── ...
│   ├── hooks/
│   │   └── ...
│   └── ...
│        
├── tools/
│   └── ... 
├── nx.json
├── package.json
├── tsconfig.json
└── ... 
```

- **apps/**: Contains all Next.js applications (e.g., backoffice-portal, business-portal).
- **libs/**: Shared libraries and components used across different applications.
- **tools/**: Custom scripts and tools for the monorepo.
- **nx.json**: Nx workspace configuration.
- **package.json**: Project dependencies and scripts.


## Docker Setup

Each application within the monorepo has its own Dockerfile and Docker Compose configuration, enabling containerized deployments.

### Building and Running the Backoffice Portal

To build the Docker image and start the Backoffice Portal, follow these steps:

1. **Build the Docker Image**

   ```bash
   docker build -t backoffice-portal -f ./apps/backoffice-portal/Dockerfile .
   ```

2. **Start the Container with Docker Compose**

   ```bash
   docker-compose -f ./apps/backoffice-portal/docker-compose.yml up
   ```

   This command builds and starts the Backoffice Portal container. Ensure Docker is running on your machine before executing these commands.

### Building and Running Other Portals

Replace `backoffice-portal` with the respective portal name to build and run other applications.

```bash
docker build -t <portal-name> -f ./apps/<portal-name>/Dockerfile .
docker-compose -f ./apps/<portal-name>/docker-compose.yml up
```

For example, to build and run the Business Portal:

```bash
docker build -t business-portal -f ./apps/business-portal/Dockerfile .
docker-compose -f ./apps/business-portal/docker-compose.yml up
```


## Conventional Commit Messages

Maintaining a consistent commit history is crucial for project maintainability. This project follows the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

### Commit Message Structure

```
<type>[(optional scope)]: <description>
[optional body]
[optional footer(s)]
```

#### Types

| Type      | Description                                                                                                                                                                       |
|:----------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `fix`     | A bug fix (not a fix to a build script)                                                                                                                                           |
| `feat`    | A new feature for the user (not a new feature for build script)                                                                                                                   |
| `docs`    | Documentation only changes                                                                                                                                                        |
| `style`   | Changes that do not affect the meaning of the code (no production code change) (e.g., white-space, formatting, missing semi-colons, etc.)                                           |
| `refactor`| A code change that neither fixes a bug nor adds a feature (e.g., renaming a variable/directory/file, cleanup code, simplify code, etc.)                                             |
| `perf`    | A code change that improves performance                                                                                                                                           |
| `build`   | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)                                                                               |
| `chore`   | Other changes that don't modify `src` or `test` files, no production code change, changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm) |
| `test`    | Adding missing tests or correcting existing tests                                                                                                                                 |
| `ci`      | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)                                                                       |

### Example Commit Messages

#### Feature Addition

```
feat(profile): add ability to upload custom profile pictures

This commit introduces a new feature that allows users to upload custom profile pictures from the frontend. Users can now choose an image file from their local device and see a preview of the selected image before saving it as their profile picture.

Closes #123
```

#### Bug Fix

```
fix(auth): resolve login redirect issue

Fixed the issue where users were not being redirected to the dashboard after successful login. The authentication flow was missing a crucial redirect step in the frontend.
```

#### Breaking Change

```
refactor(user-schema): update user profile schema to include profilePicture

BREAKING CHANGE: This commit modifies the user profile schema to include a new `profilePicture` field. Existing users will need to update their profiles if they want to use a custom picture.
```


## Additional Resources

- [Nx Documentation](https://nx.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Docker Documentation](https://docs.docker.com/)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Storybook](https://storybook.js.org/)
