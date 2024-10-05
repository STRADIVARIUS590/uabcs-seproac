import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link
} from "react-router-dom"
function App() {  

  const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello world</h1>
        <Link to="about"> About Us</Link>
      </div>
    )
  },
  {
    path: "/about",
    element: (
      <div>  
        <h1>About</h1>
        <Link to="/"> Hello</Link>
      </div>
    )
  }
]);

  return (
    <>
      {/* <h1 className='bg-blue-500'> Uabcs Seproac </h1>  */}
        <RouterProvider router={router} />
    </>
  )
}
export default App
/* import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
); */