# Node.js Web Service
Bachelor's Thesis

Web service deployed on Node.js that serves a convolutional neural network (Spleeter - Deezer). The main framework is Express and the database used is MongoDB.

## Requirements
- Node.js
- MongoDB
- Python 3.8

## Init
1. Install all the npm modules with `npm install`
2. Execute `npm start` to launch the app

# Directories
Based on MVC architecture

## views
This folder contains all the views. I used a view engine in order to render dynamic content and send it to the user. For this project I used EJS for its simplicity and similarity with HTML and JS, but you can use other similar view engines such as Handlebars or Pug.

## controllers
Contains all the controllers to handle the requests.

## routes
It manages the different routes of the service, calling to the respective controller.

## util
Additional functions

# Author
Luis Chirlaque Hernández
