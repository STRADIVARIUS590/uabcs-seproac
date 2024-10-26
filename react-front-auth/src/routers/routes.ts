import Customers from "../components/Customers";
import EditUser from "../components/EditUser";
import Login from "../components/Login";
import Register from "../components/Register";
import Users from "../components/users/Index"
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
        is_protected: true,
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

    {
        is_protected: true,
        path: 'users/edit/:id',
        element: EditUser
    }
    
    
];

export default routes