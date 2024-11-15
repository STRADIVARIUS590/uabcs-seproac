import Customers from "../components/Customers";
// import EditUser from "../components/EditUser";
import Login from "../components/Login";
import Register from "../components/Register";
// import { Users } from "../components/Users/Index"
import BaseDashBoard from "../Layout/BaseDashboard";
// import {  } from "../components/Congresses";
import { AddEditCongressPage } from "../components/Congresses/addEdit";
// import { Projects } from "../components/Projects";
import { AddEditUserPage } from "../components/Users/addEdit";
import { AddEditProjectPage } from "../components/Projects/addEdit";
// import { Publications } from "../components/Publications";
import { AddEditPublicationPage } from "../components/Publications/addEdit";
// import { Courses } from "../components/Courses";
import { AddEditCoursesPage } from "../components/Courses/addEdit";
import { CongressIndex } from "../components/Congresses";
import { CoursesIndex } from "../components/Courses";
import { ProjectsIndex } from "../components/Projects";
import { PulicationsIndex } from "../components/Publications";
import { UsersIndex } from "../components/Users/Index";
import { Dashboard } from "../Layout/Dashboard";
import { IndexTags, TagsPage } from "../components/Tags";
import Tab, { TabContent } from "../components/Layout/TabPanes";
import { Middleware } from "../components/scripts/Middleware";
import { AcademicGradesPage } from "../components/AcademicGrades";
import { AddEditAcademicGradesPage } from "../components/AcademicGrades/AddEditAcademicGrades";
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
        element: Dashboard,
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
        element: UsersIndex
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
        element: CongressIndex
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
        element: ProjectsIndex,
    },
    {
        is_protected: true,
        middleware: 'auth',
        path: 'projects/edit/:id?', 
        element: AddEditProjectPage,     
    },
    {
        is_protected: true,
        middleware: 'auth',
        path: 'publications',
        element: PulicationsIndex
    },
    {
        is_protected: true,
        middleware: 'auth',
        path: 'publications/edit/:id?',
        element: AddEditPublicationPage
    },

    {
        is_protected: true,
        middleware: 'auth',
        path: 'courses',
        element: CoursesIndex
    },
    {
        is_protected: true,
        middleware: 'auth',
        path: 'courses/edit/:id?',
        element: AddEditCoursesPage
    },
    {
        is_protected: true, 
        middleware: 'auth',
        path: '/tags',
        element: TagsPage
    },
    {
        is_protected: true,
        path: '/academic-grades',
        middleware: 'auth',
        element: AcademicGradesPage
    },
    {
        is_protected: true,
        path: '/academic-grades/edit/:id?',
        element: AddEditAcademicGradesPage
    }
];

export default routes