import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, libraryStatus }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (libraryStatus === null) return;


        const allowedPathsForPending = [
            '/dashboard/profile',
            '/dashboard/support',
            '/dashboard/check-payment'
        ];

        if (libraryStatus === 'pending' && !allowedPathsForPending.includes(location.pathname)) {
            navigate('/dashboard/check-payment');
        }

        if (libraryStatus === 'banned' && !allowedPathsForPending.includes(location.pathname)) {
            navigate('/dashboard/check-payment');
        }

    }, [libraryStatus, navigate, location.pathname]);

    if (libraryStatus === null) {
        return null;
    }

    if (libraryStatus === 'pending') {
        const allowedPaths = [
            '/dashboard/profile',
            '/dashboard/support',
            '/dashboard/check-payment'
        ];
        if (!allowedPaths.includes(location.pathname)) {
            return null;
        }
    }

    if (libraryStatus === 'banned') {
        const allowedPaths = [
            '/dashboard/profile',
            '/dashboard/support',
            '/dashboard/check-payment'
        ];
        if (!allowedPaths.includes(location.pathname)) {
            return null;
        }
    }

    return children;
};

export default ProtectedRoute;
