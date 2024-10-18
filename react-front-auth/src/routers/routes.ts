import Customers from "../components/Customers";
import Login from "../components/Login";
import Register from "../components/Register";
import Users from "../components/Users";
import Welcome from "../components/Welcome";
import BaseDashBoard from "../Layout/Dashboard";

 const routes = [
    {
        path: '/',
        element: Welcome
    },
    {
        path: '/login',
        element: Login
    },
    {
        path: '/register',
        element: Register
    },
    {
        path: '/dashboard',
        element: BaseDashBoard,
        children: [
            {
                path: '',
                element: Customers
            }
        ]
    },
    {
        path:'users',
        element: Users
    },
    
];

export default routes