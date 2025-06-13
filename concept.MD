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

## `await User.create({})`

- **Usage**: This is another Mongoose method that combines instantiating a model and saving it in one step.
- **Description**: The `create()` method creates a new document in the database and returns a promise that resolves to the newly created document.
- **When to Use**: This method is preferred when you want to create and save a document in a single operation.

Example:
```javascript
const user = await User.create({ name, email, password, pic });
```

# Automatic Deletion of Unverified Users in MongoDB

## Overview
This guide outlines the steps to implement automatic deletion of unverified users after a certain period of time using MongoDB's TTL (Time-To-Live) index feature.

## Steps

1. **Add a new field to your user schema**: 
   - In your MongoDB user schema, add a field to store the creation time of each user. Commonly named something like `createdAt`, this field will hold the timestamp when the user document was created.
   - Example user schema:
     ```json
     {
       "_id": ObjectId("123456789012"),
       "username": "example_user",
       "email": "user@example.com",
       "createdAt": ISODate("2024-04-30T12:00:00Z")
     }
     ```

2. **Create a TTL index on the createdAt field**: 
   - Once the `createdAt` field is in place, create a TTL index on it. This index automatically deletes documents after a specified period since the value of the indexed field.
   - Example of creating a TTL index:
     ```javascript
     db.users.createIndex({ "createdAt": 1 }, { expireAfterSeconds: 86400 })
     ```
     In the above example, `86400` seconds (24 hours) is specified. Any document in the `users` collection with a `createdAt` timestamp older than 24 hours will be automatically deleted.

3. **Explanation of TTL index**: 
   - The TTL index, or "Time-To-Live" index, allows setting an expiration time for documents. MongoDB periodically scans the collection for documents with expired TTL values and removes them.
   - When a TTL index is created on a field, MongoDB deletes documents in the collection after the specified time since the value of that field. This feature is useful for automatically cleaning up old or temporary data.

4. **Considerations**:
   - Ensure the `createdAt` field is properly populated with the creation time of each user document.
   - Choose an appropriate expiration time based on application requirements, balancing user verification needs and data cleanup efficiency.
   - Periodically review and adjust the expiration time according to changes in application usage patterns or requirements.

By following these steps, automatic deletion of unverified users after a certain period using MongoDB's TTL index feature can be implemented.

# OTP-Based Authentication

## Overview
OTP (One-Time Password) based authentication provides a secure way to verify users without relying solely on passwords. In the Progress/MentorConnect application, this is implemented for email verification.

## Implementation
1. **User Registration**: When a user registers, a verification token is generated and stored in the database.
2. **Token Storage**: The token is hashed using bcrypt before storage for security.
3. **Email Delivery**: The OTP is sent to the user's email using Nodemailer with Gmail.
4. **Verification Process**: The user enters the OTP, which is compared with the hashed token in the database.
5. **Token Expiration**: The verification token has an expiration time (5 minutes) set using MongoDB's TTL index.

## Code Structure
- `verificationTokenSchema.js` defines the schema for storing OTPs
- OTP verification is handled in the frontend using the `OtpInput.jsx` component

# JWT Authentication & Cookie-Based Sessions

## Overview
The application uses JSON Web Tokens (JWT) for authentication and stores these tokens in HTTP-only cookies for secure session management.

## Implementation
1. **Token Generation**: When a user logs in successfully, a JWT is generated containing the user's ID.
2. **Cookie Storage**: The token is stored in an HTTP-only cookie, which helps prevent XSS attacks.
3. **Authentication Middleware**: Requests to protected routes are verified using middleware that checks the JWT in the cookie.
4. **Token Expiration**: JWTs have an expiration time, after which the user must log in again.

# Payment Integration

## Overview
The application integrates multiple payment gateways to handle transactions for booking mentorship sessions.

## Razorpay Integration
1. **Client-Side**: The frontend includes the Razorpay checkout script and creates payment orders.
2. **Server-Side**: The backend creates payment orders and verifies payment signatures.
3. **Payment Flow**: User initiates payment → Razorpay modal opens → Payment processed → Verification on server → Booking confirmed.

## Stripe Integration
Similar to Razorpay but using Stripe's API for payment processing.

# Media Upload with Cloudinary and ImageKit

## Overview
The application uses cloud storage services to handle media uploads like profile pictures.

## Implementation
1. **Multer**: Used for handling multipart/form-data on the server.
2. **Cloudinary/ImageKit**: Images are uploaded to these services and URLs are stored in the database.
3. **Profile Updates**: Users can update their profile pictures, which are processed and stored in the cloud.

# React Router and Navigation

## Overview
The application uses React Router for client-side routing and navigation.

## Implementation
1. **Route Configuration**: Routes are defined in `App.jsx` using the React Router components.
2. **Protected Routes**: Some routes are protected and require authentication.
3. **Navigation**: The application uses programmatic navigation with the `useNavigate` hook.

# Responsive Design with Tailwind CSS

## Overview
The application uses Tailwind CSS for responsive design and styling.

## Implementation
1. **Utility Classes**: Tailwind's utility classes are used for styling components.
2. **Responsive Breakpoints**: The design adapts to different screen sizes using Tailwind's responsive modifiers.
3. **Custom Configuration**: The project includes custom Tailwind configuration in `tailwind.config.js`.

# Error Handling and Notifications

## Overview
The application uses React Toastify for displaying notifications and error messages.

## Implementation
1. **Toast Container**: A `ToastContainer` component is included in the main App component.
2. **Success/Error Messages**: Toast notifications are displayed for successful operations and errors.
3. **API Error Handling**: Errors from API calls are caught and displayed as toast notifications.

