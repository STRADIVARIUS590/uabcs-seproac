import Customers from "../components/Customers";
// import EditUser from "../components/EditUser";
import Login from "../components/Login";
import Register from "../components/Register";
import Users from "../components/Users/Index"
import BaseDashBoard from "../Layout/Dashboard";
import { Congresses } from "../components/Congresses";
import { AddEditCongressPage } from "../components/Congresses/addEdit";
import { Projects } from "../components/Projects";
import { AddEditUserPage } from "../components/Users/addEdit";
import { AddEditProjectPage } from "../components/Projects/addEdit";
// import { AddEditForm } from "../components/Users/AddEditForm";

type TypeRoute = {
    path: string
    element: any
    is_protected?: boolean
    children?: TypeRoute[],
    middleware?: string
}
 const routes: TypeRoute[] = [
    {
        path: '/',
         is_protected: true,
         middleware: 'guest',
         element: Login
        },
        {
        path: '/login',
        is_protected: true,
        middleware: 'guest',
        element: Login
    },
    {
        is_protected: true,
        middleware: 'guest',
        path: '/register',
        element: Register
    },
    {
        path: '/dashboard',
        is_protected: true,
        middleware: 'auth',
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
        middleware : 'auth',
        path:'users',
        element: Users
    },
    {
        is_protected: true,
        middleware: 'auth',
        path: 'users/edit/:id?',
        element: AddEditUserPage
    },
    
    {
        is_protected: true,
        path:'congresses',
        middleware: 'auth',
        element: Congresses
    },
    {
        is_protected: true,
        middleware: 'auth',
        path: 'congresses/edit/:id?',
        element: AddEditCongressPage,
    },

    {
        is_protected: true,
        middleware: 'auth',
        path: 'projects',
        element: Projects,
    },
    {
        is_protected: true,
        middleware: 'auth',
        path: 'projects/edit/:id?', 
        element: AddEditProjectPage,     
    }
];

export default routes