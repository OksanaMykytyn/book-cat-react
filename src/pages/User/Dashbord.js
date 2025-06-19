import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


import Navbar from "../../components/Common/navbar/Navbar";
import { Outlet } from "react-router-dom";
import '../../styles/Dashboard.css';
import axiosInstance from "../../axiosInstance";


const DashbordPage = ({ isNavbarVisible, toggleNavbar, libraryStatus, setLibraryStatus, setDarkMode, darkMode }) => {
    const closeMenu = () => {
        toggleNavbar();
    };

    const navigate = useNavigate();

    useEffect(() => {
        const fetchLibraryStatus = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }
            try {
                const response = await axiosInstance.get("/library/status", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'X-Requested-From': 'BookCatApp'
                    }
                });
                setLibraryStatus(response.data.status);
            } catch (error) {
                console.error("Помилка при отриманні статусу бібліотеки:", error);
                navigate("/login");
            }
        };

        fetchLibraryStatus();
    }, [navigate]);

    return (
        <div className="dashboard">
            <Navbar isOpen={isNavbarVisible} onClose={closeMenu} setDarkMode={setDarkMode} darkMode={darkMode} />
            <div className="main-section">
                <Outlet />
            </div>
        </div>
    );
};

export default DashbordPage;