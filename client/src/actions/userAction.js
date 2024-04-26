import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_OTP_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_OTP_FAIL,
  USER_REGISTER_OTP_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants";
import axios from "axios";

const baseUrl = 'http://localhost:5000/api/users';

export const login = (email, password) => async (dispatch) => {

  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${baseUrl}/login`,
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: "Email(Not Verified) or Invalid  Password" });
  }
};

export const logout = () => async (dispatch) => {

  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });

};

export const register = (name, email, password, pic) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${baseUrl}/register`,
      { name, email, password, pic },
      config
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    // dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    // localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message, });
  }
};

export const forgotPassword = (email) => async (dispatch) => {

}

export const verifyEmail = (userInfo, otp) => async (dispatch) => {
  try {
    dispatch({ type: USER_OTP_REQUEST });
    // console.log(userId,otp);

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const userId = userInfo._id;

    const { data } = await axios.post(
      `${baseUrl}/verifyEmail`,
      { userId, otp },
      config
    );
    console.log(data);

    dispatch({ type: USER_REGISTER_OTP_SUCCESS, payload: userInfo });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: userInfo });

    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  } catch (error) {
    dispatch({ type: USER_REGISTER_OTP_FAIL, payload: "Wrong OTP" });
  }
}
