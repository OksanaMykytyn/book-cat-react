import React, { useState, useEffect } from "react";


import NavbarAdmin from "../../components/Common/navbar/NavbarAdmin";
import { Outlet } from "react-router-dom";
import '../../styles/Dashboard.css';


const DashbordAdminPage = ({ isNavbarVisible, toggleNavbar }) => {
    const closeMenu = () => {
        toggleNavbar();
    };

    return (
        <div className="dashboard">
            <NavbarAdmin isOpen={isNavbarVisible} onClose={closeMenu} />
            <div className="main-section">
                <Outlet />
            </div>
        </div>
    );
};

export default DashbordAdminPage;