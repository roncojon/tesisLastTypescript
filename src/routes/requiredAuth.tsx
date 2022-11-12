import * as React from "react";
import {
    useLocation,
    Navigate,
} from "react-router-dom";
// import { useIsAuthenticated } from "@azure/msal-react";
import { useAppState } from "stores";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const location = useLocation();
    // const isAuthenticated = useIsAuthenticated();
    const { isAuthenticated: value } = useAppState((state) => state.isAuthenticated);

    if (!value) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAuth;
