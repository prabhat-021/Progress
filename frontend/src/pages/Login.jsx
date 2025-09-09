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
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur rounded-2xl border shadow-md p-6 sm:p-8 text-[#5E5E5E]">
        <div className="mb-4">
          <p className="text-2xl font-semibold text-gray-800">{state === "Sign Up" ? "Create Account" : "Login"}</p>
          <p className="text-sm text-gray-500">Please {state === "Sign Up" ? "sign up" : "log in"} to book Meeting</p>
        </div>

        {state === "Sign Up" && (
          <div className="w-full mb-3">
            <label className="text-xs text-gray-600">Full Name</label>
            <input onChange={(e) => setName(e.target.value)} value={name} className="mt-1 border border-[#DADADA] rounded w-full p-2 outline-none focus:ring-2 focus:ring-primary/30" type="text" required />
          </div>
        )}

        <div className="w-full mb-3">
          <label className="text-xs text-gray-600">Email</label>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className="mt-1 border border-[#DADADA] rounded w-full p-2 outline-none focus:ring-2 focus:ring-primary/30" type="email" required />
        </div>
        <div className="w-full mb-1.5">
          <label className="text-xs text-gray-600">Password</label>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className="mt-1 border border-[#DADADA] rounded w-full p-2 outline-none focus:ring-2 focus:ring-primary/30" type="password" required />
        </div>
        {state === "Sign Up" && (
          <div className="w-full mb-1.5">
            <label className="text-xs text-gray-600">Confirm Password</label>
            <input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} className="mt-1 border border-[#DADADA] rounded w-full p-2 outline-none focus:ring-2 focus:ring-primary/30" type="password" required />
          </div>
        )}

        <button className="bg-primary text-white w-full py-2.5 mt-3 rounded-md text-base hover:opacity-95 transition">{state === "Sign Up" ? "Create account" : "Login"}</button>

        {state === "Sign Up" ? (
          <p className="mt-3 text-sm">Already have an account? <span onClick={() => setState("Login")} className="text-primary underline cursor-pointer">Login here</span></p>
        ) : (
          <p className="mt-3 text-sm">Create a new account? <span onClick={() => setState("Sign Up")} className="text-primary underline cursor-pointer">Click here</span></p>
        )}
      </div>
    </form>
  )
}

export default Login;