import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = 'http://localhost:5000/api/users';

export default function ResetForm() {

    const [invalidUser, setInvalidUser] = useState('');
    const [busy, setBusy] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [newPassword, setNewPassword] = useState({
        password: '',
        confirmPassword: ''
    })
    const location = useLocation();
    const navigate = useNavigate();

    const verifyToken = async () => {
        try {
            const { token, id } = queryString.parse(location.search);
            const { data } = await axios.get(`${baseUrl}/verifyToken?token=${token}&id=${id}`);
            setBusy(false);
            // console.log(data);
        } catch (error) {
            // if (error?.response?.data) {
            //     const { data } = error.response;
            //     if (!data.success) {
            //         return setInvalidUser(data.error);
            //     }
            //     return console.error(error.response.data);
            // }
            setInvalidUser("Reset Token is Invalid! ")
            console.log(error);
        }
    };

    const handleOnChange = ({ target }) => {
        const { name, value } = target;

        setNewPassword({ ...newPassword, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { password, confirmPassword } = newPassword;

        if (password.trim().length < 8 || password.trim().length > 20) {
            return setError("Password must be length between 8 to 20 characters");
        }

        if (password !== confirmPassword) {
            return setError("Password must be same As Above ");
        }

        try {
            const { token, id } = queryString.parse(location.search);
            setBusy(true);
            const { data } = await axios.post(`${baseUrl}/resetPassword?token=${token}&id=${id}`, { password });
            setBusy(false);
            // console.log(data);
            if (data.success) {
                setSuccess(true);
                navigate("/resetPassword");
            }
        } catch (error) {
            setBusy(false);
            // if (error?.response?.data) {
            //     const { data } = error.response;
            //     if (!data.success) {
            //         return setInvalidUser(data.error);
            //     }
            //     return console.error(error.response.data);
            // }
            setError("Password Must be different")
            console.log(error);
        }
    }

    useEffect(() => {
        verifyToken();
    }, []);

    if (invalidUser) {
        return (
            <div className="max-w-screen-sm m-auto pt-40">
                <h1 className="text-center text-3xl text-gray-500 mb-3">
                    {invalidUser}
                </h1>
            </div>
        )
    }

    if (busy) {
        return (
            <div className="max-w-screen-sm m-auto pt-40">
                <h1 className="text-center text-3xl text-gray-500 mb-3">
                    Wait for a moment verifying rest token.
                </h1>
            </div>
        )
    }

    if (success) {
        return (
            <div className="max-w-screen-sm m-auto pt-40">
                <h1 className="text-center text-3xl text-gray-500 mb-3">
                    Password Reset Succesfully.
                </h1>
            </div>
        )
    }

    return (
        <div className="max-w-screen-sm m-auto pt-40">
            <h1 className="text-center text-3xl text-gray-500 mb-3">
                Reset Password
            </h1>
            <form className="shadow w-full rounded-lg p-10"
                onSubmit={handleSubmit}>
                {error && (
                    <p className="text-center p-2 mb-3 bg-red-500 text-white">{error}</p>
                )}
                <div className="space-y-8">
                    <input
                        className="px-3 text-lg h-10 w-full border-gray-500 border-2 rounded"
                        type="password"
                        placeholder="New Password"
                        name="password"
                        onChange={handleOnChange}
                    />
                    <input
                        className="px-3 text-lg h-10 w-full border-gray-500 border-2 rounded"
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        onChange={handleOnChange}
                    />
                    <input
                        type="submit"
                        value="Reset Password"
                        className="bg-gray-500 w-full py-3 text-white rounded"
                    />
                </div>
            </form>
        </div>
    )
}
