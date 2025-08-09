import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';

const ProtectedRoute = ({ children, libraryStatus, setLibraryStatus }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (libraryStatus === undefined) {
            return;
        }

        const token = localStorage.getItem('token');
        const isAdminPath = location.pathname.startsWith('/dashboard-admin');

        if (libraryStatus === null && token && isAdminPath) {
            return;
        }

        if (!token) {
            localStorage.removeItem('token');
            navigate('/', { replace: true });
            return;
        }

        if (libraryStatus === 'banned') {
            const logoutUser = async () => {
                try {
                    await axiosInstance.post('/logout', {}, {
                        headers: {
                            'X-Requested-From': 'BookCatApp',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                } catch (error) {
                    console.error('Logout failed:', error);
                } finally {
                    localStorage.removeItem('token');
                    setLibraryStatus(null);
                    navigate('/', { replace: true });
                }
            };
            logoutUser();
            return;
        }

        const allowedPathsForPending = [
            '/dashboard/profile',
            '/dashboard/support',
            '/dashboard/check-payment',
            '/dashboard/documentation'
        ];

        if (libraryStatus === 'pending' && !allowedPathsForPending.includes(location.pathname)) {
            navigate('/dashboard/check-payment', { replace: true });
        }
    }, [libraryStatus, navigate, location.pathname, setLibraryStatus]);

    if (libraryStatus === undefined) {
        return null;
    }

    const isAllowedForPendingOrBanned = [
        '/dashboard/profile',
        '/dashboard/support',
        '/dashboard/check-payment',
        '/dashboard/documentation'
    ].includes(location.pathname);

    if ((libraryStatus === 'pending' || libraryStatus === 'banned') && !isAllowedForPendingOrBanned) {
        return null;
    }

    return children;
};

export default ProtectedRoute;