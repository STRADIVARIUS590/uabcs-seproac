import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom"
import { RootState } from "../store";
import { Navbar } from "../components/Layout/Navbar";
import { AppLayout } from "../components/Layout/AppLayout";
const BaseDashBoard = () => {

    // const { isLogged, user } = useSelector((state: RootState) => state.auth);
    
    // const navigate = useNavigate();

    // if(isLogged === false){
    //     navigate("/login");    
    // }

    return (
        <AppLayout >

            <div>
            
            <h1>Base Dashboard</h1>
            <Outlet/>
            {/* <a href="/users">Users</a> */}
        </div>
        </AppLayout>
    )
}
export default BaseDashBoard