import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { RootState } from '../store';
const Welcome = () => {

    const { isLogged, user } = useSelector((state: RootState) => state.auth);
    
    const navigate = useNavigate();

    if(isLogged === true ){
        navigate("/dashboard");    
    }
    return (
            <div className="w-screen h-screen bg-gray-800 text-white text-center">
                {/* <div>Welcome</div> */}
                <div className="flex justify-around">
                    <Link to='/login'>Login </Link>
                    <Link to='/register'>Register </Link>
                    <Link to='/dashboard'>Dashboard </Link>
                </div>
            </div>
        // <div>
        //     Welcome
        // </div>
    )
}
export default  Welcome