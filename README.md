# e-commerce
An e-commerce web app using **Node**, **Express**, **React** and **MongoDB** (**MERN** stack).

Currently this repo contains only the **backend(API)** of the web app built using **Node** and **Express**.</br>
In future we will add frontend using **React**.

Table of Contents
-----------------

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)


Features
--------
- **Authentication using [Json Web Tokens(JWT)](http://jwt.io/)** - (Email and Password)
- **OAuth 2.0 Authentication** via Google
- **REST API**
  1. **Users** - Login, Logout, View Profile, Update Profile, Delete Profile
  2. **Products** - View, Sort(price), Filter(category), Pagination
  3. **Cart** - View, Update and Remove cart items
  4. **Orders** - Place new order and View previous orders


Prerequisites
--------
- [MongoDB](https://www.mongodb.com/download-center/community)
- [Node.js 10+](http://nodejs.org)

Getting Started
--------

**Master branch** contains authentication using **JWT** </br>
**passport-google-oauth2 branch** contains authentication using **OAuth 2.0** via Google </br>

The easiest way to get started is to clone the repository:

```bash
# Get the latest snapshot
git clone https://github.com/prakhar308/e-commerce-server.git myproject

# Change directory
cd myproject

# Install NPM dependencies
npm install

# Then simply start your app
npm run dev
```

When you'll clone, by default the app will run on **master branch** and will use **JWT** for authentication.
If you want to use **OAuth 2.0 - Google** for authentication then run the below commands:

```bash
# go into the passport-google-oauth2 branch 
git checkout passport-google-oauth2

# Install NPM dependencies
npm install

# Then simply start your app
npm run dev
```

**Warning:**
To use OAuth authentication methods you will need to obtain appropriate credentials: **Client ID**, **Client Secret**. You will need to go through the provider to generate new credentials.
Once you have your credentials Copy and Paste Client Id and Client Secret keys into `dev.env` file inside `config` folder of the **passportgoogle-oauth2** branch.
Also add a cookie-key which is required for sessions in the same `dev.env` file.

Project Structure
--------

| Name                                      | Description                                                   |
| -------------------------------------     | ------------------------------------------------------------- |
| **config**/dev.env                        | Your oAuth keys, token secret, database URI, etc.             |
| **src/controllers**/cartController.js     | Controller for cart management.                               |
| **src/controllers**/orderController.js    | Controller for placing and retrieving orders.                 |
| **src/controllers**/productController.js  | Controller for viewing and filtering products.                |
| **src/controllers**/userController.js     | Controller for user account management.                       |
| **src/middleware**/auth.js                | Authentication middleware.                                    |
| **src/models**/index.js                   | Entry point for models directory & for connecting app to db.  |
| **src/models**/order.js                   | Mongoose Schema and Model for Order                           |
| **src/models**/product.js                 | Mongoose Schema and Model for Product.                        |
| **src/models**/user.js                    | Mongoose Schema and Model for User.                           |
| **src/passport**/passport-setup.js        | Creating google-oAuth Strategy.                               |
| **src/routes**/index.js                   | Entry point for routes - '/api'                               |
| **src/routes**/auth.js                    | Google oAuth routes                                           |
| **src/routes**/cart.js                    | handle cart requests at - '/api/cart'                         |
| **src/routes**/order.js                   | handle order requests at - '/api/orders'                      |
| **src/routes**/product.js                 | handle product requests like view\filter at - '/api/products' |
| **src/routes**/user.js                    | handle user requests like login\logout at - '/api/users'      |
| **src**/index.js                          | The main application file                                     |
| .gitignore                                | Folder and files ignored by git.                              |
| package.json                              | NPM dependencies.                                             |
| package-lock.json                         | Contains exact versions of NPM dependencies in package.json.  |


