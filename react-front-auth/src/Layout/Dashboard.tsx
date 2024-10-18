import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom"
import { RootState } from "../store";
const BaseDashBoard = () => {

    const { isLogged, user } = useSelector((state: RootState) => state.auth);
    
    const navigate = useNavigate();

    if(isLogged === false){
        navigate("/login");    
    }

    return (
        <div>
            <h1>Base Dashboard</h1>
            <Outlet/>
            <a href="/users">Users</a>
        </div>
    )
}
export default BaseDashBoard