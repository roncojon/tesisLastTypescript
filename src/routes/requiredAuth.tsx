import * as React from "react";
import {
    useLocation,
    Navigate,
} from "react-router-dom";
import { useAppState } from "stores";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const location = useLocation();
     const { isAuthenticated } = useAppState((state) => state.authenticationInfo);
// const authInfo = JSON.parse(sessionStorage.authInfo)

    if (!isAuthenticated) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAuth;
