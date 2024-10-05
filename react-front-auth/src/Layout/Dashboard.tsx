import { Outlet } from "react-router-dom"
const BaseDashBoard = () => {
    return (
        <div>
            <h1>Base Dashboard</h1>
            <Outlet/>
        </div>
    )
}
export default BaseDashBoard