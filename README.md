# 🌱 SEEDSonal Planner 🥦

# Description

As part of the We Code for Good 2019 Hackathon event, our team choose to build an app to help the non-profit [Growing Gardens](www.growing-gardens.org).

This app is a Seedsonal planner that is an app that lets users search by date and crop type to find details on what to plant and when to plant it. 

****Notifications!** One benefit of this app is the ability of a Growing Gardens admin to set up custom browser push notifications.

# Team
- Brianna Shade - team lead, github: 

## Project structure

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and Esau Silva's article on [How to get create-react-app to work with a Node.js back-end API](https://medium.freecodecamp.org/how-to-make-create-react-app-work-with-a-node-backend-api-7c5c48acb1b0). Silva's article and comments may be a useful resource if you run into trouble, and it contains additional instructions on deploying a similar app to Heroku. 

## Required tools

If you don't already have these tools, download and install them before you start working with the Seedsonal Planner app.

- Modern web browser (may we suggest [Chrome?](https://www.google.com/chrome/browser))
- Command Line Interface (CLI)
  - Mac OSX: Terminal is already installed, or try [iTerm](https://www.iterm2.com/)
  - Windows: Command Prompt (DOS) or [Git Bash](https://gitforwindows.org/)
- [Node.js](https://nodejs.org/download/)
- [Yarn Package Manager](https://yarnpkg.com/lang/en/docs/install/)
- A text editor or coding tool of your choice. [VS Code](https://code.visualstudio.com/) is available for free for Mac and Windows.

## Getting Started

First, clone this repo to your local machine.

Once you have all prerequisites installed, open your CLI and navigate to the project folder.

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
    |   ├── Announce.js
    │   ├── Home.js
    │   ├── index.css
    │   ├── index.js
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
