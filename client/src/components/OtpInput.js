import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "./ErrorMessage.js";
import { verifyEmail } from "../actions/userAction.js";
import Loading from "./Loading.js";

export default function OtpInput() {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister);
    const { userInfo } = userRegister;
    console.log(userInfo._id);
    console.log(otp);

    const userOtp = useSelector(state => state.userOtp);
    const { loading, error: otpError, userInfo: otpUserInfo } = userOtp;

    // Function to handle changes in the input fields
    const handleChange = (event, index) => {
        const { value } = event.target;

        // Clone the existing otp array to modify the value at the specified index
        const newOtp = [...otp];
        newOtp[index] = value;

        // Join the otp array elements to form the complete otp string
        setOtp(newOtp.join(""));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!userInfo._id || !otp) {
            setError("Invalid request, missing parameters!");
        } else {
            dispatch(verifyEmail(userInfo, otp));
        }
    }

    return (
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {loading && <Loading />}
            <div className="flex mb-2 space-x-2 rtl:space-x-reverse">
                {/* Loop through the input fields */}
                {[1, 2, 3, 4].map((index) => (
                    <div key={index}>
                        {/* Use index in the id and name attributes for uniqueness */}
                        <label className="sr-only">{`Code ${index}`}</label>
                        <input
                            type="text"
                            maxLength="1"
                            data-focus-input-init
                            data-focus-input-prev={index > 1 ? `code-${index - 1}` : null}
                            data-focus-input-next={index < 4 ? `code-${index + 1}` : null}
                            id={`code-${index}`}
                            name={`code-${index}`}
                            className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            required
                            // Handle onChange event to update otp state
                            onChange={(event) => handleChange(event, index - 1)}
                        />
                    </div>
                ))}
            </div>
            <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Please introduce the 4 digit code we sent via email.</p>
            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
        </form>
    )
}
