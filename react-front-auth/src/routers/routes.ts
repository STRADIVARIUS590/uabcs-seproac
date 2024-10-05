import Customers from "../components/Customers";
import Login from "../components/Login";
import Register from "../components/Register";
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
    }
];

export default routes