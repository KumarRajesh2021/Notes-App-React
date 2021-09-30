## Notes App - React with LocalStorage

Link:
https://kumarrajesh2021.github.io/Notes-App-React/

#### File Structure 


The structure of the project is Feature First Design pattern.
we see that all of the files are related to the one `components` component and each folder has own styles.
If each component needs own reducers and actions, they will have them in the root folder.

Shared folders are outside of components.
so, `statemanagement` and `Utils` should be on the `src` root.

```
  ├── components
  |   ├── CreateNote
  |   |   ├── index.js
  |   |   ├── styles.js
  |   |   ├── Snackbar.js
  |   ├── MainComponent
  |   |   ├── index.js
  |   |   ├── styles.js
  |   ├── NoteBooks
  |   |   ├── index.js
  |   |   ├── styles.js
  |   ├── NoteList
  |   |   ├── index.js
  |   |   ├── styles.js
  |   |   ├── Note.js
  ├── statemanagement
  |   ├── index.js
  ├── Utils
  |   ├── localStorage.js
  |   ├── Modal.js
  |   ├── showModal.js
...

## Commands

### Project Run

The command to run  project on 3000 port.

`npm run start`

### Build

The command to build project in `build` folder.

`npm run build`

### Test

The command to run unit tests.

`npm run test`

### Prettier

The command to run Prettier to make codes Pretty with nice indents.

`npm run prettier`

### ES Lint

The command to run ESLint .

`npm run lint`

#### Husky(Git webhook) 

Husky is a tool to make webhooks on Github.
I make a Webhook to run prettier and ESLint before pushing.

### Design

### Styling 

I am  using`Material-UI` because of the JSS and rendering performances in new hooks features. :sunglasses:

### Components 

Components are following the `First Feature` structure. experimentaly, this structure helps to organizing your application and develop it with a team of React developers

### State management 

The state management in this project is, Context API.
It's better to use package.json inside of all Components folder with a `name` tag to explain a detail for that component.


### Features 

-- The user should be able to create a new note.
-- The user should be able to edit and delete a note.
-- The user should be able to navigate through multiple notes.
-- Search function to find notes.
-- Create notes in different categories.
-- Create notes in different Notebooks.
-- Move notes trough categories.
-- Using localStorage to store notes.

### Run build
run the command to deploy the pages below:
-npm install gh-pages
-npm run deploy



