import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {

  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const { verfied, userData, logout } = useContext(AppContext);

  // console.log(userData);

  const handleLogOut = () => {
    logout();
    navigate("/");
  }

  const linkBase = "py-1 px-1 transition-colors hover:text-primary";
  const activeClass = ({ isActive }) => `${linkBase} ${isActive ? "text-primary" : "text-gray-800"}`;

  return (
    <div className="sticky top-0 z-30 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-b-[#E5E7EB]">
      <div className="flex items-center justify-between text-sm max-w-6xl mx-auto px-4 py-3">
        {/* Logo */}
        <img onClick={() => navigate("/")} className="w-12 sm:w-16 h-16 cursor-pointer" src={assets.navIcon} alt="logo" />

        {/* Desktop Nav */}
        <ul className="md:flex items-center gap-6 font-medium hidden">
          <NavLink to="/" className={activeClass}>
            <li className="relative">HOME<div className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-primary group-hover:w-3/5 transition-all" /></li>
          </NavLink>
          <NavLink to="/Mentors" className={activeClass}>
            <li className="relative">ALL MENTORS<div className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-primary group-hover:w-3/5 transition-all" /></li>
          </NavLink>
          <NavLink to="/College" className={activeClass}>
            <li className="relative">ALL COLLEGES<div className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-primary group-hover:w-3/5 transition-all" /></li>
          </NavLink>
          <NavLink to="/about" className={activeClass}>
            <li className="relative">ABOUT<div className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-primary group-hover:w-3/5 transition-all" /></li>
          </NavLink>
          <NavLink to="/contact" className={activeClass}>
            <li className="relative">CONTACT<div className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-primary group-hover:w-3/5 transition-all" /></li>
          </NavLink>
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-4 ">
          {
            verfied && userData
              ? <div className="flex items-center gap-2 cursor-pointer group relative">
                <img className="w-8 h-8 rounded-full object-cover" src={userData.image} alt="avatar" />
                <img className="w-2.5" src={assets.dropdown_icon} alt="dropdown" />
                <div className="absolute top-0 right-0 pt-12 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                  <div className="min-w-48 bg-white border rounded shadow-md flex flex-col gap-3 p-3">
                    <p onClick={() => navigate("/my-profile")} className="hover:text-black cursor-pointer">My Profile</p>
                    <p onClick={() => navigate("/my-Meetings")} className="hover:text-black cursor-pointer">My Meetings</p>
                    <p onClick={handleLogOut} className="hover:text-black cursor-pointer">Logout</p>
                  </div>
                </div>
              </div>
              : <button onClick={() => navigate("/login")} className="bg-primary text-white px-6 py-2.5 rounded-full font-medium hidden md:block hover:opacity-95">Create account</button>
          }
          <img onClick={() => setShowMenu(true)} className="w-6 md:hidden" src={assets.menu_icon} alt="menu" />

          {/* ---- Mobile Menu ---- */}
          <div className={`md:hidden ${showMenu ? "fixed inset-0" : "h-0 w-0"} right-0 top-0 bottom-0 z-40 overflow-hidden bg-black/30 transition-all`}
               onClick={() => setShowMenu(false)}>
            <div className={`ml-auto h-full bg-white w-72 max-w-[85%] shadow-xl ${showMenu ? "translate-x-0" : "translate-x-full"} transition-transform`} onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between px-5 py-6 border-b">
                <img src={assets.navIcon} className="w-28 h-8" alt="logo" />
                <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className="w-7 cursor-pointer" alt="close" />
              </div>
              <ul className="flex flex-col gap-1 mt-3 px-4 text-base font-medium">
                <NavLink onClick={() => setShowMenu(false)} to="/"><p className="px-4 py-3 rounded hover:bg-gray-50">HOME</p></NavLink>
                <NavLink onClick={() => setShowMenu(false)} to="/Mentors" ><p className="px-4 py-3 rounded hover:bg-gray-50">ALL MENTORS</p></NavLink>
                <NavLink onClick={() => setShowMenu(false)} to="/College" ><p className="px-4 py-3 rounded hover:bg-gray-50">ALL COLLEGES</p></NavLink>
                <NavLink onClick={() => setShowMenu(false)} to="/about" ><p className="px-4 py-3 rounded hover:bg-gray-50">ABOUT</p></NavLink>
                <NavLink onClick={() => setShowMenu(false)} to="/contact" ><p className="px-4 py-3 rounded hover:bg-gray-50">CONTACT</p></NavLink>
              </ul>
              <div className="px-4 mt-4 pb-6">
                {verfied && userData ? (
                  <button onClick={() => { setShowMenu(false); handleLogOut(); }} className="w-full bg-gray-900 text-white py-2.5 rounded">Logout</button>
                ) : (
                  <button onClick={() => { setShowMenu(false); navigate("/login"); }} className="w-full bg-primary text-white py-2.5 rounded">Create account</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
