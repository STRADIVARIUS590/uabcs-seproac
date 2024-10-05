import { createElement } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  // Route,
  // Link
} from "react-router-dom"
import routes from './routers/routes'

function App() {  
// console.log(routes)
  const router = createBrowserRouter(
    routes.map((route) => ({
      ...route,
      element: createElement(route.element),
      children: route.children?.map((child) => ({
          ...child,
          element: createElement(child.element)
      }))
    }))  

  )

  return (
    <>
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