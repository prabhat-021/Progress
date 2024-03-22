import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { useEffect } from "react";
import axios from "axios";

const baseUrl = 'http://localhost:5000/api/users';

export default function ResetForm() {

    const location = useLocation();
    
    const verifyToken = async () => {
        try {
            const { token, id } = queryString.parse(location.search);
            const { data } = await axios.get(`${baseUrl}/verifyToken?token=${token}&id=${id}`);

            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        verifyToken();
    }, []);

    return (
        <div className="max-w-screen-sm m-auto pt-40">
            <h1 className="text-center text-3xl text-gray-500 mb-3">
                Reset Password
            </h1>
            <form className="shadow w-full rounded-lg p-10">
                <div className="space-y-8">
                    <input
                        className="px-3 text-lg h-10 w-full border-gray-500 border-2 rounded"
                        type="password"
                        placeholder="New Password"
                    />
                    <input
                        className="px-3 text-lg h-10 w-full border-gray-500 border-2 rounded"
                        type="password"
                        placeholder="Confirm Password"
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
