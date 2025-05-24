import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, libraryStatus }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (libraryStatus === null) return;

        console.log(location.pathname);

        const allowedPathsForPending = [
            '/dashboard/profile',
            '/dashboard/support',
            '/dashboard/check-payment'
        ];

        if (libraryStatus === 'pending' && !allowedPathsForPending.includes(location.pathname)) {
            navigate('/dashboard/check-payment');
        }

        // Додаткові перевірки для інших статусів 
    }, [libraryStatus, navigate, location.pathname]);

    // Поки не отримано статус — нічого не рендерити
    if (libraryStatus === null) {
        return null; // або <LoadingSpinner />
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

    return children;
};

export default ProtectedRoute;
