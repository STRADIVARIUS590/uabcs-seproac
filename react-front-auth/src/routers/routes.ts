import Customers from "../components/Customers";
import Login from "../components/Login";
import Register from "../components/Register";
import Users from "../components/Users";
import Welcome from "../components/Welcome";
import BaseDashBoard from "../Layout/Dashboard";

type TypeRoute = {
    path: string
    element: any
    is_protected?: boolean
    children?: TypeRoute[]
}
 const routes: TypeRoute[] = [
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
        is_protected: true,
        path:'users',
        element: Users
    },
    
];

export default routes