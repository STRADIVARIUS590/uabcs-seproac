import { useSelector } from "react-redux";
import { AppLayout } from "../Layout/AppLayout"
import { ProjectItem, Projects } from "./table"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Api } from "../../services/Api";
import { RootState } from "../../store";
import { MessageToast } from "../MessageToast";
import { Context } from "../scripts/Context";

export const ProjectsIndex = () => {

    // const ProjectIndexCntext = createContext({});

    const  { token, user } = useSelector((state: RootState ) => state.auth);

    const navigate = useNavigate();
  
    const user_permissions: string[] = user?.all_permissions || [];

    useEffect(() => {
        
        if (!user || user_permissions.indexOf("projects.get") === -1) {
            navigate(-1);
        }
    }, [user, user_permissions, navigate]);

    const [data, setData] = useState<ProjectItem[]>([]);

    const [loading, setLoading] = useState<boolean>(true);    

    const [error, setError] = useState<boolean>(false);

    const fetchData = async () => {
        
        const response =  await Api.get('/projects?include=user', {
            Authorization: 'Bearer '+ token ,
            accept: 'application/json'    
        })

        const result: [] = await response.data

        if(response.statusCode === 200) {
            setError(false);
            setData(result)
            setLoading(false);
        }else{
            setError(true);
            navigate(-1)
        }
    }

    useEffect(() => {fetchData()}, []);
    return <AppLayout>
       {
            error && <div className="mt-12"> <MessageToast message='Ha ocurrido un error' type="error"/></div>
        }
        {
            loading && <div className="mt-12"> <MessageToast message='Cargando...' type="loading"/></div> 
        }
        {
        !error && !loading && data && 

            <div>
                <Context> 
                    <Projects projects={data}/>
                </Context> 
            </div>
        }
        </AppLayout>
}