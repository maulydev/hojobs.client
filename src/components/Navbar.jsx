import React from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { BiSolidPhoneCall } from "react-icons/bi";

const Navbar = () => {
    return (
        <nav className="bg-neutral px-2">
            <div className="container mx-auto text-white flex justify-between items-center">
                <div className="btn btn-neutral text-lg my-2 md:hidden font-bold cursor-default">
                    <FaBars />
                </div>
                <div className="hidden md:flex items-center [&>*]:cursor-pointer">
                    <NavLink
                        className={`px-4 py-2 ${({ isActive }) =>
                            isActive ? "active" : ""}`}
                        to="/"
                    >
                        Find Jobs
                    </NavLink>

                    <NavLink
                        className={`px-4 py-2 ${({ isActive }) =>
                            isActive ? "active" : ""}`}
                        to="/job"
                    >
                        Post a Job
                    </NavLink>

                    <NavLink
                        className={`px-4 py-2 ${({ isActive }) =>
                            isActive ? "active" : ""}`}
                        to="/subscription"
                    >
                        Job Alerts
                    </NavLink>
                    
                    <NavLink
                        className={`px-4 py-2 ${({ isActive }) =>
                            isActive ? "active" : ""}`}
                        to="/verification"
                    >
                        Verification
                    </NavLink>
                </div>
                <a href="tel: 0503410451" className="text-sm py-2 flex items-center gap-2">
                   <span className="flex gap-2"><IoLogoWhatsapp className="text-green-500 bg-white rounded-full" /> <BiSolidPhoneCall className="text-blue-400" /></span> : +233 (0) 503 410 451
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
