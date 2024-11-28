import { Link, useLocation } from "react-router-dom";
import { useLogout } from "../scripts/Logout";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect } from "react";

// Inside your component or API handler

// logout(); // Call logout when needed
export const Navbar = () => {
  
  const location = useLocation();

  const logout = useLogout(); // Get the logout function from the hook

  const { user } = useSelector((state : RootState) => state.auth);

  const user_permissions: string[] = user?.all_permissions || [];
 
  return <div> <nav className="bg-[#180c5c]  fixed w-full z-20 top-0 start-0">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="https://www.uabcs.mx/dasc/mati/img/logouabcs1.png" className="h-12" alt="Flowbite Logo"/>
      {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbyte</span> */}
  </a>
  <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      <button type="button" onClick={() => logout()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cerrar Sesion</button>
      <button data-collapse-toggle="navbar-sticky"  type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
    
    <li>
      <Link to="/dashboard"
      className={`block py-2 text-gray-900  hover:ring-4 bg-[#180c5c] text-white rounded-[20px]
        ${location.pathname === '/dashboard' ? 'text-blue-500' : ''}`}
    >
      Dashboard
     {/* { location.pathname } */}
    </Link>
    </li>
    

    {user_permissions.indexOf("users.get") !== -1 && <li>
      <Link to= "/users"
      className={`block py-2 text-gray-900  hover:ring-4 bg-[#180c5c] text-white rounded-[20px]
        ${location.pathname === '/users' ? 'text-blue-500' : ''}`}
    >
      Usuarios
    </Link>
    </li>
    } 

    { user_permissions.indexOf("congresses.get") !== 0  &&
    <li>
      <Link to="/congresses"
      className={`block py-2 text-gray-900  hover:ring-4 bg-[#180c5c] text-white rounded-[20px]
        ${location.pathname === '/congresses' ? 'text-blue-500' : ''}`}
        >
          Congresos 
    </Link>
    </li>
    }


    { user_permissions.indexOf("publications.get") !== 0  &&
    <li>
      <Link to="/publications"
    className={`block py-2 text-gray-900  hover:ring-4 bg-[#180c5c] text-white rounded-[20px]
      ${location.pathname === '/publications' ? 'text-blue-500' : ''}`}
      >
      Publicaciones
    </Link>
    </li>
    }

    {  user_permissions.indexOf("courses.get") !== 0  &&
      <li>
      <Link to="/courses"
     className={`block py-2 text-gray-900  hover:ring-4 bg-[#180c5c] text-white rounded-[20px]
      ${location.pathname === '/courses' ? 'text-blue-500' : ''}`}
      >
      Cursos
    </Link>
    </li>
    }

    { user_permissions.indexOf("projects.get") !== 0  &&
      <li>
      <Link to="/projects" 
      className={`block py-2 text-gray-900  hover:ring-4 bg-[#180c5c] text-white rounded-[20px]
        ${location.pathname === '/projects' ? 'text-blue-500' : ''}`}
        >
        Proyectos
      </Link>
      </li>
    }
    
    {user_permissions.indexOf("tags.get") !== 0  &&

      <li>
      <Link to="/tags" 
      className={`block py-2 text-gray-900  hover:ring-4 bg-[#180c5c] text-white rounded-[20px]
        ${location.pathname === '/tags' ? 'text-blue-500' : ''}`}
        >
      Categorias
    </Link>
    </li>
    }
    { user_permissions.indexOf("academic-grades.get") !== 0  &&
      <li>
      <Link to="/academic-grades" 
      className={`block py-2 text-gray-900  hover:ring-4 bg-[#180c5c] text-white rounded-[20px]
        ${location.pathname === '/academic-grades' ? 'text-blue-500' : ''}`}
        >
      Grados Academicos
    </Link>
    </li>
    }
    </ul>
  </div>
  </div>
</nav>
</div>

    
}