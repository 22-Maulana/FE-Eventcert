import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LogOut, User, ShieldCheck, ChevronDown, Menu, X } from "lucide-react";
import { logout, me, isLoggedIn } from "../utils/services/AuthService"; 

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        // Logika scroll untuk efek glassmorphism
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);

        if (isLoggedIn()) { 
            me()
                .then((data) => setUser(data))
                .catch(() => {
                    logout(); 
                    setUser(null);
                });
        }
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isAdmin = () => user && user.role === 'admin'; 

    const handleLogout = () => {
        logout(); 
        setUser(null);
        navigate("/");
        window.location.reload();
    };

    const linkClass = ({ isActive }) =>
        `relative px-3 py-2 text-sm font-bold transition-all duration-300 ${
            isActive ? "text-blue-500" : "text-gray-400 hover:text-white"
        }`;

    return (
        <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${
            isScrolled ? "py-3" : "py-5"
        }`}>
            <div className="container px-6 mx-auto max-w-7xl">
                <div className={`flex items-center justify-between p-4 rounded-3xl transition-all duration-500 ${
                    isScrolled 
                    ? "bg-gray-950/70 backdrop-blur-xl border border-gray-800 shadow-2xl" 
                    : "bg-transparent"
                }`}>
                    
                    {/* Logo */}
                    <NavLink to="/" className="flex items-center gap-2 group">
                        <div className="flex items-center justify-center w-10 h-10 transition-transform bg-blue-600 shadow-lg rounded-xl shadow-blue-600/30 group-hover:rotate-6">
                            <ShieldCheck className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-white uppercase">
                            Event<span className="text-blue-500">Cert</span>
                        </span>
                    </NavLink>

                    {/* Navigasi Utama */}
                    <nav className="items-center hidden gap-2 md:flex">
                        <NavLink to="/" className={linkClass}>Home</NavLink>
                        <NavLink to="/events" className={linkClass}>Event</NavLink>
                        
                        {isAdmin() && (
                            <NavLink 
                                to="/admin" 
                                className="px-5 py-2 ml-4 text-xs font-black text-blue-400 transition-all border shadow-lg bg-blue-600/10 border-blue-500/30 rounded-xl hover:bg-blue-600 hover:text-white shadow-blue-500/10"
                            >
                                ADMIN PANEL
                            </NavLink>
                        )}
                    </nav>

                    {/* Auth Section */}
                    <div className="flex items-center gap-3">
                        {!user ? (
                            <div className="flex items-center gap-2">
                                <Link to="/login" className="px-4 py-2 text-sm font-bold text-gray-400 hover:text-white">Login</Link>
                                <Link to="/register" className="text-sm font-black bg-white text-black px-6 py-2.5 rounded-2xl hover:bg-blue-500 hover:text-white transition-all">Register</Link>
                            </div>
                        ) : (
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-3 pl-4 pr-2 py-1.5 bg-gray-800/50 border border-gray-700 rounded-2xl hover:border-blue-500 transition-all group"
                                >
                                    <span className="text-sm font-bold text-gray-200 group-hover:text-blue-400">
                                        {user.nama?.split(' ')[0] || "User"}
                                    </span>
                                    <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-xl">
                                        <User size={16} className="text-white" />
                                    </div>
                                    <ChevronDown size={14} className={`text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {dropdownOpen && (
                                    <div className="absolute right-0 w-56 p-2 mt-4 duration-200 border border-gray-800 shadow-2xl bg-gray-900/95 backdrop-blur-xl rounded-2xl animate-in fade-in zoom-in">
                                        {!isAdmin() && (
                                            <>
                                                <Link to="/profile" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 transition-colors hover:bg-gray-800 rounded-xl">
                                                    <User size={16} className="text-blue-500" /> Profil Saya
                                                </Link>
                                                <Link to="/my-events" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 transition-colors hover:bg-gray-800 rounded-xl">
                                                    <ShieldCheck size={16} className="text-blue-500" /> My Event
                                                </Link>
                                                <div className="h-px mx-2 my-1 bg-gray-800" />
                                            </>
                                        )}
                                        <button onClick={handleLogout} className="flex items-center w-full gap-3 px-4 py-3 text-sm font-bold text-red-400 transition-colors hover:bg-red-500/10 rounded-xl">
                                            <LogOut size={16} /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;