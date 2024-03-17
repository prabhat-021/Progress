# asyncHandler

## Purpose
- The purpose of asyncHandler is to catch any errors that occur during the execution of the asynchronous function and pass them to the Express error handling middleware, allowing you to handle errors in a centralized way.

## How it Works
- The async keyword is used to define asynchronous functions, but it doesn't handle errors in the same way asyncHandler does.
- By wrapping your asynchronous function with asyncHandler, you ensure that any errors thrown within the function are caught and passed to Express's error handling middleware.

## Installation
```bash
npm install asynchandler
```

# Understanding Mongoose/Sequelize Save Methods

In a Node.js application using frameworks like Express.js and an ORM like Mongoose or Sequelize, you'll often encounter scenarios where you need to save data to a database. Two common methods for this are `await newUser.save()` and `const user = await User.create({...})`.

## `await newUser.save()`

- **Usage**: This syntax is commonly used with Mongoose, which is an ODM (Object Data Modeling) library for MongoDB.
- **Description**: `newUser` represents a Mongoose model instance (a document). `save()` is a method provided by Mongoose to save the document to the MongoDB database. It returns a promise that resolves to the saved document after it's successfully saved.
- **When to Use**: This method is typically used when you have already instantiated a model object and want to save it to the database.

Example:
```javascript
const newUser = new User({ name, email, password, pic });
await newUser.save();
``` 

