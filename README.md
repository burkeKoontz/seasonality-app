Seasonality app, a team 12 production



# THIS IS AN OPTIONAL STARTER-KIT. USE WHICHEVER LANGUAGES AND FRAMEWORKS MAKES YOUR <3 GO BOOP!

# About the App

Here is a quick way to start your hackathon project with a simple node server and React app, ready for your UI enhancements and/or database connections. It's a To Do list, in which you can add a To Do item via the form field, and it will be posted to the Express server.

You can mark a To Do item as done by checking the box next to it.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and Esau Silva's article on [How to get create-react-app to work with a Node.js back-end API](https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0). Silva's article and comments may be a useful resource if you run into trouble, and it contains additional instructions on deploying a similar app to Heroku. This is optional but could be helpful when it's time to submit the project.

## Required tools

If you don't already have these tools, download and install them before you start working with the Apparel Store app.

- Modern web browser (may we suggest [Chrome?](https://www.google.com/chrome/browser))
- Command Line Interface (CLI)
  - Mac OSX: Terminal is already installed, or try [iTerm](https://www.iterm2.com/)
  - Windows: Command Prompt (DOS) or [Git Bash](https://gitforwindows.org/)
- [Node.js](https://nodejs.org/download/)
- [Yarn Package Manager](https://yarnpkg.com/lang/en/docs/install/)
- A text editor or coding tool of your choice. [VS Code](https://code.visualstudio.com/) is available for free for Mac and Windows.

## Getting Started

First, fork this repo: https://guides.github.com/activities/forking/. Just log into your Github account, and then hit Fork (next to the Watch and Star buttons on the top right), and then clone from your own fork of the repo.

Once you have all prerequisites installed, open your CLI and navigate to the project folder.

_New to command line?_ Navigate to the project folder using `cd` (which stands for change directory). If you know the full path of the directory you can type it in, or you can click and drag the folder over to your CLI window and it will automatically fill in the path to that folder.

```
cd /Users/mycomp/Documents/kickstart-js
```

Press return, and you'll be taken to that folder.

Install [nodemon](https://github.com/remy/nodemon) globally. (Debug hint: run this even if you think you have nodemon.)

```
npm i nodemon -g
```

Install server and client dependencies. Running the `yarn` command will install all of the dependancies listed in package.json. Since this project contains both server and client side apps, this needs to be run both in the root folder and in the client folder.

```
yarn
cd client
yarn
```

For local development, start the server and client at the same time (from the root of the project)

```
yarn dev
```

Navigate to http://localhost:3000/ and try adding an item to your To Do list

To stop serving the page to your browser, press Control+C in the command line.

## Project Structure

```
kickstart-js
├── README.md
├── package.json
├── LICENSE
├── .gitignore
├── server.js
├── yarn.lock
└── client
    ├─── src
    │   ├── App.css
    │   ├── App.js
    │   ├── App.test.js
    |   ├── ListItem.css
    │   ├── ListItem.js
    │   ├── index.css
    │   ├── index.js
    │   ├── logo.svg
    │   └── serviceWorker.js
    ├── public
    │   ├── favicon.ico
    │   ├── index.html
    │   └── manifest.json
    ├── package.json
    ├── yarn.lock
    └── .env
```

Some file basics:

- App.js: app logic
- App.css: app styling
- ListItem.js: a smart React component (includes state)
- ListItem.css: the styling for this React component

## Resources

Git: Forking a Repo: https://guides.github.com/activities/forking/

React: https://reactjs.org/docs/getting-started.html

Basic State in React: https://reactjs.org/docs/state-and-lifecycle.html#using-state-correctly

CSS via Mozilla: https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS

CSS-Tricks: https://css-tricks.com/snippets/

Color Palettes: http://colormind.io/

Color Palette Generator: https://www.canva.com/color-palette/

Google Fonts: https://fonts.google.com/

Font Pairings: https://www.typewolf.com/google-fonts
