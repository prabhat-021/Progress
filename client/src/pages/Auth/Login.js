import { useState } from "react";

const Login = () => {

    const [login, setLogin] = useState(false);
    const [forgot, setforgot] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pic, setPic] = useState(
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    );
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [picMessage, setPicMessage] = useState("");


    const postDetails = async (pics) => {

        if (!pics) {
            return setPicMessage("Please select a Image ")
        }
        setPicMessage(null);

        if (pics) {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "collegeSearch");
            data.append("cloud_name", "prabhat021");
            await fetch("https://api.cloudinary.com/v1_1/prabhat021/image/upload", {
                method: "post",
                body: data,
            }).then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            return setPicMessage("Please Select an Image");
        }
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                    CollegeSearch
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            {login ? "" : forgot ? "" : "Create your account"}
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">                            <div>
                            <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                        </div>
                            {(!forgot || login) && (
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                            )}
                            {(!login && !forgot) && (
                                <>                                <div>
                                    <label for="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                    <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>
                                    <div className="">
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload Profile Photo</label>
                                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>

                                    </div>
                                </>
                            )}
                            {login && (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label for="remember" className="text-gray-500 dark:text-gray-300">Verified Mail</label>
                                        </div>
                                    </div>
                                    <a onClick={() => {
                                        setforgot(true);
                                        setLogin(false);
                                    }} href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                                </div>
                            )}
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{login ? "Login" : forgot ? "Submit" : "Create an account"}</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                {login ? "Don't" : "Already"} have an account?
                                {login ?
                                    <a onClick={() => {
                                        setforgot(false);
                                        setLogin(false);
                                    }} href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">  Register here</a> :
                                    <a onClick={() => {
                                        setforgot(false);
                                        setLogin(true);
                                    }} href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">  Login here</a>}

                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;
