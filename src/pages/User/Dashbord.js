import React, { useState, useEffect } from "react";


import Navbar from "../../components/Common/navbar/Navbar";
import { Outlet } from "react-router-dom";
import '../../styles/Dashboard.css';


const DashbordPage = ({ isNavbarVisible, toggleNavbar }) => {
    const closeMenu = () => {
        toggleNavbar();
    };

    return (
        <div className="dashboard">
            <Navbar isOpen={isNavbarVisible} onClose={closeMenu} />
            <div className="main-section">
                <Outlet />
            </div>
        </div>
    );
};

export default DashbordPage;