import { useSelector } from "react-redux";
import { AppLayout } from "../Layout/AppLayout"
import { AcademicGrades, Publications } from "./table"
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Api } from "../../services/Api";
import { MessageToast } from "../MessageToast";
import { PublicationItem } from ".";
export const PublicationsTab = () => {
    
    const { token, user } = useSelector((state : RootState) => state.auth);
    
    // const navigate = useNavigate();

    // const user_permissions = user?.all_permissions || [];


    // useEffect(() => {
    //     if(!user || user_permissions.indexOf('academic-grades.get') === -1) {
    //         navigate(-1);
    //     }
    // }, [user, user_permissions, navigate]);

    const [data, setData] = useState<PublicationItem[]>();

    const [error, setError] = useState<boolean>(false);
    
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        const response = await Api.get('/publications?include=user&filter[user_id]=' + user?.id, {
            Authorization: 'Bearer ' + token,
            accept: 'application/json'
        })

        const result: PublicationItem[] = await response.data;

        if(response.statusCode === 200){
            
            setError(false);
            setData(result);
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return <>    
        {
            error && <MessageToast message='Ha ocurrido un error' type="error"/>
        }
        {
            loading && <MessageToast message='Cargando...' type="loading"/> 
        }
        {
            data &&  <Publications publications={data}/>
        }  
    </>
}