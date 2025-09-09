import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Banner = () => {

    const navigate = useNavigate();
    const { loged } = useContext(AppContext);

    return (
        <div className="rounded-2xl bg-gradient-to-r from-primary to-blue-500 px-6 sm:px-10 md:px-14 my-16 overflow-hidden">
            <div className="flex">
                {/* ------- Left Side ------- */}
                <div className="flex-1 py-10 md:py-14">
                    <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
                        <p>Book Meetings</p>
                        <p className="mt-2">With 100+ Trusted Mentors</p>
                    </div>
                    <button onClick={() => { loged ? navigate("/Mentors") : navigate("/login"); scrollTo(0, 0) }} className="bg-white text-sm sm:text-base text-[#595959] px-7 py-2.5 rounded-full mt-6 hover:opacity-95 transition">
                        {loged ? "Book Meeting" : "Create account"}
                    </button>
                </div>

                {/* ------- Right Side ------- */}
                <div className="hidden md:block w-1/2 relative">
                    <img className="w-full absolute -bottom-6 right-0 max-w-md" src={assets.Meeting_img} alt="meeting" />
                </div>
            </div>
        </div>
    )
}

export default Banner;