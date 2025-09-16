import { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { verfied, userData, logout } = useContext(AppContext);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowMenu(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showMenu]);

  const handleLogOut = () => {
    logout();
    navigate("/");
    setShowMenu(false);
  };

  const linkBase = "py-1 px-1 transition-colors hover:text-primary relative group";
  const activeClass = ({ isActive }) => `${linkBase} ${isActive ? "text-primary font-semibold" : "text-gray-800"}`;

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-b-[#E5E7EB]">
        <nav className="flex items-center justify-between text-sm mx-auto px-4 py-3 max-w-7xl">
          {/* Logo */}
          <img
            onClick={() => navigate("/")}
            className="w-12 h-12 cursor-pointer"
            src={assets.navIcon}
            alt="logo"
          />

          <ul className="hidden md:flex items-center gap-8 font-medium">
            <NavLink to="/" className={activeClass}>HOME<div className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" /></NavLink>
            <NavLink to="/Mentors" className={activeClass}>ALL MENTORS<div className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" /></NavLink>
            <NavLink to="/College" className={activeClass}>ALL COLLEGES<div className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" /></NavLink>
            <NavLink to="/about" className={activeClass}>ABOUT<div className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" /></NavLink>
            <NavLink to="/contact" className={activeClass}>CONTACT<div className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" /></NavLink>
          </ul>

          <div className="hidden md:flex items-center gap-4">
            {verfied && userData ? (
              <div className="flex items-center gap-2 cursor-pointer group relative">
                <img className="w-8 h-8 rounded-full object-cover" src={userData.image} alt="avatar" />
                <img className="w-2.5" src={assets.dropdown_icon} alt="dropdown" />
                <div className="absolute top-full right-0 pt-3 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                  <div className="min-w-48 bg-white border rounded shadow-lg flex flex-col gap-1 p-2">
                    <p onClick={() => navigate("/my-profile")} className="p-2 rounded hover:bg-gray-100 cursor-pointer">My Profile</p>
                    <p onClick={() => navigate("/my-Meetings")} className="p-2 rounded hover:bg-gray-100 cursor-pointer">My Meetings</p>
                    <hr className="my-1" />
                    <p onClick={handleLogOut} className="p-2 rounded hover:bg-gray-100 text-red-500 cursor-pointer">Logout</p>
                  </div>
                </div>
              </div>
            ) : (
              <button onClick={() => navigate("/login")} className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:opacity-95">
                Create account
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button onClick={() => setShowMenu(true)} className="p-2" aria-label="Open menu">
              <img className="w-6 h-6 cursor-pointer" src={assets.menu_icon} alt="menu" />
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ease-in-out ${showMenu ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        aria-modal="true"
        role="dialog"
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setShowMenu(false)}
        ></div>

        <div
          className={`absolute top-0 right-0 h-full bg-white w-72 max-w-[85%] shadow-xl transition-transform duration-300 ease-in-out flex flex-col ${showMenu ? "translate-x-0" : "translate-x-full"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <img src={assets.navIcon} className="h-10" alt="logo" />
            <button onClick={() => setShowMenu(false)} className="p-2" aria-label="Close menu">
              <img src={assets.cross_icon} className="w-6 h-6" alt="close" />
            </button>
          </div>

          <ul className="flex-grow p-4 space-y-2 overflow-y-auto">
            <li><NavLink onClick={() => setShowMenu(false)} to="/" className={({ isActive }) => `block p-2 rounded ${isActive ? 'bg-gray-100 font-semibold' : ''}`}>HOME</NavLink></li>
            <li><NavLink onClick={() => setShowMenu(false)} to="/Mentors" className={({ isActive }) => `block p-2 rounded ${isActive ? 'bg-gray-100 font-semibold' : ''}`}>ALL MENTORS</NavLink></li>
            <li><NavLink onClick={() => setShowMenu(false)} to="/College" className={({ isActive }) => `block p-2 rounded ${isActive ? 'bg-gray-100 font-semibold' : ''}`}>ALL COLLEGES</NavLink></li>
            <li><NavLink onClick={() => setShowMenu(false)} to="/about" className={({ isActive }) => `block p-2 rounded ${isActive ? 'bg-gray-100 font-semibold' : ''}`}>ABOUT</NavLink></li>
            <li><NavLink onClick={() => setShowMenu(false)} to="/contact" className={({ isActive }) => `block p-2 rounded ${isActive ? 'bg-gray-100 font-semibold' : ''}`}>CONTACT</NavLink></li>
          </ul>

          <div className="p-4 border-t">
            {verfied && userData ? (
              <button onClick={handleLogOut} className="w-full bg-red-500 text-white py-2.5 rounded-lg font-semibold">Logout</button>
            ) : (
              <button onClick={() => { navigate("/login"); setShowMenu(false); }} className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold">Create account</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
