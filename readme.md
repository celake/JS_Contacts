# Contact Management App
## Table of Contents
- [Project Description](#project-description)
- [Status](#status)
- [Features](#features)
  - [Current Features](#current-features)
  - [Planned Features](#planned-features)
- [Tech Stack](#tech-stack)
- [Installation and Usage](#installation-and-usage)
- [Project Structure](#project-structure)
- [Status](#status)
- [License](#license)
- [Contact](#contact)

## Project Description 
This project is a learning-focused contact management application designed to build foundational skills in developing full-stack web applications with Node.js and Express.js. It features a RESTful API backend that supports full CRUD operations, with MongoDB as the database for persistent storage. The frontend is built using Vanilla JavaScript, HTML, and CSS to maintain a lightweight, responsive interface.

The primary goal of this project is to gain hands-on experience with:

- Setting up and structuring an Express application
- Designing and implementing RESTful APIs
- Connecting and interacting with a MongoDB database using Mongoose
- Processing form data and server-side rendering techniques

This app serves as a practical introduction to building server-side applications and managing data-driven user interfaces without relying on front-end frameworks.

## Status
🚧 This project is currently in active development.
Not all features are implemented yet, and the app is not fully functional.


## Features

### Current Features
**View Contacts**  
Displays a list of all contacts stored in the database, with basic details such as name and group associations.

**Create and Edit Contacts**  
Users can create new contacts or edit existing ones using dedicated form pages, with group assignment options.

**Group Management Interface**  
Provides a page for adding and viewing groups, allowing users to organize contacts into categories.

**Cancel Button Functionality**  
Includes a cancel button on the group management page that dynamically returns users to the appropriate contacts form.

### Planned Features

**Full Contact Management (CRUD)**

Create, view, update, and delete contacts with details such as name, email, and phone number.

**User-Defined Groups**

Organize contacts into custom groups (e.g., Family, Friends, Work) that users can create, edit, and delete as needed.

**Group-Based Filtering**

Filter the main contact list by group using a dropdown menu, making it easy to view contacts by category.

**Form Validation**

Includes server-side validation to ensure data integrity (e.g., required fields, valid email format).

**Error Handling**

Displays user-friendly error messages for invalid input, missing data, or database-related issues.

**RESTful API Architecture**

Follows RESTful design principles for route structure and resource handling.

**MongoDB Data Storage**

Uses MongoDB and Mongoose to store and manage contacts and groups in a flexible, schema-based database.

**Simple and Responsive UI**

Built with HTML, CSS, and Vanilla JavaScript for a lightweight, accessible interface with no frontend frameworks.
## Tech Stack
**Frontend:**
- HTML5
- CSS3
- JavaScript (Vanilla)

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose

## Installation and Usage
**Prerequisites**
- Node.js and npm
- MongoDB (local or Atlas)

**Steps**
- Coming soon

**Usage**
- Open http://localhost:3000 in your browser.
- Use the interface to manage your contacts.


## Project Structure
```javascript

├── public/
│   ├── styles.css
│   └── script.js
├── routes/
│   ├── contacts.js
│   └── groups.js
├── models/
│   ├── contacts.js
│   └── groups.js
├── views
│   ├── contacts/
│   │   ├── edit.ejs 
│   │   ├── new.ejs 
│   │   └── show.ejs 
│   ├── groups/
│   │   └── index.ejs
│   └── layout/
│   │   └── boilerplate.ejs
│   ├── index.ejs
├── controllers/
│   ├── contacts.js
│   └── groups.js
├── server.js
├── app.js
└── package.json


```

## License
This project is licensed under the MIT License.

## Contact
Created By Charlotte Lake - me@charlottelake.eu
GitHub: @celake