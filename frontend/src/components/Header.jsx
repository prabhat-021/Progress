import { assets } from "../assets/assets.js";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-primary to-blue-500 rounded-3xl mt-8">
            {/* --------- Header Content --------- */}
            <div className="relative z-10 flex flex-col md:flex-row flex-wrap">

                {/* Left */}
                <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 px-6 md:px-10 lg:px-14">
                    <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
                        Unlock Your Future,
                        <br /> with Expert Guidance
                    </p>

                    <div className="flex items-center gap-3 text-white text-sm">
                        <img className="w-24 md:w-28" src={assets.group_profiles} alt="profiles" />
                        <p className="opacity-90">Explore a network of experienced mentors and schedule meetings effortlessly to shape a successful career path.</p>
                    </div>

                    <div className="flex gap-3 mt-2">
                        <Link to="Mentors" className="flex items-center gap-2 bg-white px-6 py-2.5 rounded-full text-[#595959] text-sm hover:opacity-95 transition">
                            Book Meeting <img className="w-3" src={assets.arrow_icon} alt="" />
                        </Link>
                        <Link to="/College" className="flex items-center gap-2 bg-white/10 border border-white/30 text-white px-6 py-2.5 rounded-full text-sm hover:bg-white/15 transition">
                            Browse Colleges
                        </Link>
                    </div>

                    <div className="flex gap-2 text-[11px] text-white/90 mt-1">
                        <span className="px-2 py-0.5 rounded-full bg-white/15">Verified Mentors</span>
                        <span className="px-2 py-0.5 rounded-full bg-white/15">Trusted Guidance</span>
                        <span className="px-2 py-0.5 rounded-full bg-white/15">Career Growth</span>
                    </div>
                </div>

                {/* Right - full height image */}
                <div className="md:w-1/2 relative min-h-[340px] md:min-h-[420px] lg:min-h-[420px]">
                    <img className="absolute inset-0 w-full h-full object-cover" src={assets.college_img} alt="college" />
                </div>
            </div>
        </div>
    )
}

export default Header;