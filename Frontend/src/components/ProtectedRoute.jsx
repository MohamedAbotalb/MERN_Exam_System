// import React from 'react';
// import { Route, Navigate, Outlet } from 'react-router-dom';
// import {jwtDecode} from 'jwt-decode';

// const ProtectedRoute = ({ component: Component, allowedRoles, ...rest }) => {
//     const token = localStorage.getItem('token');
//     const user = token ? jwtDecode(token) : null;

//     return (

//         <Route
//             {...rest}
//             render={props =>
//                 user && allowedRoles.includes(user.role) ? (
//                     <Component {...props} />
//                 ) : (
//                      <Outlet />
//                 )
//             }
           
//         />
//     );
// };

// export default ProtectedRoute;
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem('token');
    const user = token ? jwtDecode(token) : null;

    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
