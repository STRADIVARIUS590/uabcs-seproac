import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { useNavigate } from "react-router-dom"
import React, { ReactNode, useEffect } from "react"

type Props = {
    children: ReactNode | ReactNode[]
} 

export const Middleware = ({children} : Props) => {
    
    const isLogged = useSelector((state: RootState) => state.auth)   

    const navigate = useNavigate();


    useEffect(() => {
        if(isLogged){
            navigate('/login');
        }
    }, [isLogged])
  
    return  <h1>{ children }</h1>
}
