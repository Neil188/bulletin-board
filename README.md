# [Bulletin-Board](https://Neil188.github.io/bulletin-board)

By Neil Lupton

From LinkedIn course Learning React.js

## Description

A simple bulletin board application using create-react-app to get started.

## Installation Instructions

1. Clone locally using:

    `git clone https://github.com/Neil188/bulletin-board.git`

2. Install dependencies:

    `npm install`

3. Start dev server using:

    `npm run start`

    This will start the development server, running the app at [localhost](http://localhost:3000/)

4. To create a production build use:

    `npm run build`

## Technologies used

Built on:

* Node v9.8.0
* npm v5.6.0
* React v16
* React scripts v1.1

* Create React App
* GitHub Pages

## GitHub Pages

The gh-pages pacakge gives you an easy way to put your project live on Github Pages.
Once the package is installed you first need to make sure "homepage" is set in package.json.
This will be "https://<Github username>.github.io/<Project-Name>"
make sure "deploy" script is set up - this will call gh-pages with your build directory (change the script if using a different directory).
Then once you run `npm run deploy` your project will be magically deployed to it's own GitHub Page (note you don't need to create gh-pages manually it will get created for you).
