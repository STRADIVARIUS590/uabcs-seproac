import { useNavigate } from "react-router-dom"

export const Logout = () => {
    const navigate = useNavigate();

    localStorage.removeItem('persist:seproac-root')

    navigate('/login');
    
}