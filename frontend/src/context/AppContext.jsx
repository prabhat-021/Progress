import { createContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
} from "../constants/userConstants.js";

export const AppContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const initialState = {
    token: localStorage.getItem('token') || '',
    userData: JSON.parse(localStorage.getItem('userInfo')) || null,
    mentors: [],
    loading: false,
    otpSent: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
        case USER_REGISTER_REQUEST:
            return { ...state, loading: true };

        case USER_LOGIN_SUCCESS:
        case USER_REGISTER_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("userInfo", JSON.stringify(action.payload.userData));
            return { ...state, loading: false, token: action.payload.token, userData: action.payload.userData };

        case USER_LOGIN_FAIL:
        case USER_REGISTER_FAIL:
            return { ...state, loading: false };

        case USER_LOGOUT:
            localStorage.removeItem("token");
            localStorage.removeItem("userData");
            return { ...state, token: '', userData: null };

        case "SET_MENTORS":
            return { ...state, mentors: action.payload };

        case "SET_USER":
            return { ...state, userData: action.payload };

        case "OTP_SENT":
            return { ...state, otpSent: true };

        default:
            return state;
    }
};

const AppContextProvider = (props) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const currencySymbol = '₹';
    // Getting Mentors using API
    const getMentorData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/Mentor/list');
            if (data.success) {
                dispatch({ type: "SET_MENTORS", payload: data.Mentors });
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }

    }

    // Getting User Profile using API
    const loadUserProfileData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } });

            if (data.success) {
                dispatch({ type: "SET_USER", payload: data.userData });
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }

    };

    const login = async (email, password) => {
        dispatch({ type: USER_LOGIN_REQUEST });
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password });
            if (data.success) {
                dispatch({ type: USER_LOGIN_SUCCESS, payload: { token: data.token, userData: data.userData } });
                toast.success("Login successful!");
            } else {
                dispatch({ type: USER_LOGIN_FAIL });
                toast.error(data.message);
            }
        } catch (error) {
            dispatch({ type: USER_LOGIN_FAIL });
            toast.error(error.message);
        }
    };

    const verifyOtp = async (id, email, otp) => {
        dispatch({ type: USER_LOGIN_REQUEST });
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/verify-otp`, { id, email, otp });
            if (data.success) {
                dispatch({ type: USER_LOGIN_SUCCESS, payload: { token: data.token, userData: data.userData } });
                toast.success("Login successful!");
            } else {
                dispatch({ type: USER_LOGIN_FAIL });
                toast.error(data.message);
            }
        } catch (error) {
            dispatch({ type: USER_LOGIN_FAIL });
            toast.error(error.message);
        }
    };

    const register = async (userDetails) => {
        dispatch({ type: USER_REGISTER_REQUEST });
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/register`, userDetails);
            if (data.success) {
                dispatch({ type: "OTP_SENT" });
                dispatch({ type: USER_REGISTER_REQUEST, payload: data });
                toast.success("OTP sent for verification!");
            } else {
                dispatch({ type: USER_REGISTER_FAIL });
                toast.error(data.message);
            }
        } catch (error) {
            dispatch({ type: USER_REGISTER_FAIL });
            toast.error(error.message);
        }
    };

    const logout = () => {
        dispatch({ type: USER_LOGOUT });
        toast.success("Logged out successfully!");
    };

    useEffect(() => {
        getMentorData();
        if (state.token) {
            loadUserProfileData();
        }
    }, [state.token]);

    return (
        <AppContext.Provider value={{ ...state, login, register, logout, getMentorData, loadUserProfileData, verifyOtp, currencySymbol }}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider;