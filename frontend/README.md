# Oxygen Portals

-------------------------------

## Getting Started

To get started with this project, follow these steps:

1. Install `Node.js` using the version specified in `.nvmrc`. Use `nvm` to switch between versions.
  - For example, to install version `20.0.0`, run the command `nvm install 20`.
2. Install Nx CLI globally by running `npm install -g nx`.
3. Open `frontend` directory in your IDE then run `npm i` or `npm i --force` command.
4. Start the development server with `npm run dev`.


## Portal Commands

#### Creating Widgets
To create widgets, use the following command:
```
npm run widget-g
npm run widget-g <widget-name> 
```

#### Building the Project with Export Option
To build the project with export option, use the following command:
```
npm run build
```
This will generate an `export` folder with the production-ready files.

For more information on available scripts, please refer to the `scripts` section in `package.json`.

-------------------------------
## Conventional Commit Messages

This Section is trying to use conventional commits with below rules :

The commit message should be structured as follows:

``` 
 <type>[(optional scope)]: <description>
 [optional body]
 [optional footer(s)]
```
Example :
```
refactor(core): remove deprecated mui button props
^------^ ^--^   ^--------------------------------^
|        |      |
|        |      +-> Summary in present tense.
|        |
|        +-> Optional scope.       
|        
+-> Type: feat, fix, refactor, build, chore, docs, style, or test.
```

| type     | description                                                                                                                                                                       |
|:---------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| fix      | A bug fix (not a fix to a build script)                                                                                                                                           |
| feat     | A new feature for the user (not a new feature for build script)                                                                                                                   |
| docs     | Documentation only changes                                                                                                                                                        |
| style    | Changes that do not affect the meaning of the code (no production code change) (e.g. white-space, formatting, missing semi-colons, etc)                                           |
| refactor | A code change that neither fixes a bug nor adds a feature (e.g. renaming a variable/directory/file, cleanup code, simplify code, etc)                                             |
| perf     | A code change that improves performance                                                                                                                                           |
| build    | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)                                                                               |
| chore    | Other changes that don't modify src or test files, no production code change, Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm) |
| test     | Adding missing tests or correcting existing tests                                                                                                                                 |
| ci       | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)                                                                       |

Example commit message:
```
git commit -m "header" -m "body" -m "footer"
```

```
feat(profile): add ability to upload custom profile pictures

This commit introduces a new feature that allows users to upload custom profile pictures from the frontend. Users can now choose an image file from their local device and see a preview of the selected image before saving it as their profile picture.

The change was made by adding a new "Upload Picture" button to the user profile settings page in the frontend, along with client-side code to handle the file uploads and display the preview of the selected image.

Closes #123

BREAKING CHANGE: This commit modifies the user profile schema to include a new "profilePicture" field. Existing users will need to update their profiles if they want to use a custom picture.
```

In this example:

- The header contains the type, scope, and brief summary of the change, which is related to frontend development.
- The body provides more details about what the change does and how it was implemented.
- The footer includes a "closes" section indicating that this commit closes issue #123, and also includes a "BREAKING CHANGE" section indicating that the change introduces a breaking change to the system, which requires additional action from users.

Using a consistent format like this helps to communicate changes effectively and makes it easier to track the history of a codebase over time.
-------------------------------
