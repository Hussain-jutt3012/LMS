import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function AuthLayout({ authentication = true, children }) {
    const authStatus = useSelector(
        (state) => state.auth.status
    );

    const isLoading = useSelector(
        (state) => state.auth.isLoading
    );

    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) return;

        if (authentication && !authStatus) {
            navigate("/login");
        }

        if (!authentication && authStatus) {
            navigate("/");
        }
    }, [
        authentication,
        authStatus,
        isLoading,
        navigate,
    ]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return children;
}

export default AuthLayout;