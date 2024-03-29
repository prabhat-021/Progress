import { createStore, combineReducers, applyMiddleware } from "redux";
// Import necessary functions and modules from Redux for creating the store, combining reducers, and applying middleware
import thunk from "redux-thunk";
// Import 'thunk' middleware for handling asynchronous actions
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
// Import reducers for user login, registration, and update from userReducers.js file

// Combine all reducers into one root reducer
const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
});

// Check if user information exists in local storage, if so, parse it, otherwise set to null
const userInformation = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

// Set initial state with user login information fetched from local storage
const initialState = {
    userLogin: { userInfo: userInformation }
};

// Define middleware array with thunk middleware
const middleware = [thunk];

// Create Redux store with combined reducers, initial state, and applied middleware
const store = createStore(
    reducer, // Combined reducers
    initialState, // Initial state
    applyMiddleware(...middleware) // Apply middleware
);

// Export the created Redux store
export default store;
