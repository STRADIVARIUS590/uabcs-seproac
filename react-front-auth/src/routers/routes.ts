import Customers from "../components/Customers";
// import EditUser from "../components/EditUser";
import Login from "../components/Login";
import Register from "../components/Register";
import AddEditUserPage from "../components/users/addEdit";
import AddEditForm from "../components/users/AddEditForm";
import Users from "../components/users/Index"
import Welcome from "../components/Welcome";
import BaseDashBoard from "../Layout/Dashboard";
import { Congresses } from "../components/Congresses";
import { CongressesAddEdit } from "../components/Congresses/addEdit";

type TypeRoute = {
    path: string
    element: any
    is_protected?: boolean
    children?: TypeRoute[]
}
 const routes: TypeRoute[] = [
    {
        path: '/',
        element: Login
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
        path: 'users/edit/:id?',
        element: AddEditForm
    },
    
    {
        is_protected: true,
        path:'congresses',
        element: Congresses
    },
    
    {
        is_protected: true,
        path: 'congresses/edit/:id?',
        element: CongressesAddEdit,
    }
];

export default routes