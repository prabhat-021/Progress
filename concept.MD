# asyncHandler

## Purpose
- The purpose of asyncHandler is to catch any errors that occur during the execution of the asynchronous function and pass them to the Express error handling middleware, allowing you to handle errors in a centralized way.

## How it Works
- The async keyword is used to define asynchronous functions, but it doesn't handle errors in the same way asyncHandler does.
- By wrapping your asynchronous function with asyncHandler, you ensure that any errors thrown within the function are caught and passed to Express's error handling middleware.

## Installation
```bash
npm install asynchandler
