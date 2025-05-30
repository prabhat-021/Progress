import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [state, setState] = useState("Sign Up");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const { login, register, otpSent, verfied } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state !== "Sign Up") {
      if (!email || !password) {
        toast.error("Please Provide All Details");
      } else {
        await login(email, password);
      }

    } else {

      if (!name || !email || !password) {
        toast.error("Please Provide All Details");
      } else if (password !== confirmPassword) {
        toast.error("Password dosen't Match");
      } else {
        await register(name, email, password);
      }

    }

  }

  useEffect(() => {
    if (otpSent) {
      navigate("/verifyOtp");
    }

    if (verfied) navigate("/");
  }, [otpSent,verfied])

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold">{state === "Sign Up" ? "Create Account" : "Login"}</p>
        <p>Please {state === "Sign Up" ? "sign up" : "log in"} to book Meeting</p>
        {state === "Sign Up"
          ? <div className="w-full ">
            <p>Full Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="text" required />
          </div>
          : null
        }
        <div className="w-full ">
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="email" required />
        </div>
        <div className="w-full ">
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="password" required />
        </div>
        {state === "Sign Up" ?
          <div className="w-full ">
            <p>Confirm Password</p>
            <input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="password" required />
          </div> : null
        }
        <button className="bg-primary text-white w-full py-2 my-2 rounded-md text-base">{state === "Sign Up" ? "Create account" : "Login"}</button>
        {state === "Sign Up"
          ? <p>Already have an account? <span onClick={() => setState("Login")} className="text-primary underline cursor-pointer">Login here</span></p>
          : <p>Create an new account? <span onClick={() => setState("Sign Up")} className="text-primary underline cursor-pointer">Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login;