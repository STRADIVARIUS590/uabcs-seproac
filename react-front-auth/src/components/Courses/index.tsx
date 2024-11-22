import { useSelector } from "react-redux";
import { AppLayout } from "../Layout/AppLayout"
import { CourseItem, Courses } from "./table"
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Api } from "../../services/Api";
import { MessageToast } from "../MessageToast";

export const CoursesIndex = () => {

    const  { token, user } = useSelector((state: RootState ) => state.auth);

    const navigate = useNavigate();
 
    const user_permissions: string[] = user?.all_permissions || [];

    useEffect(() => {
        if (!user || user_permissions.indexOf("courses.get") === -1) {
            navigate(-1);
        }
    }, [user, user_permissions, navigate]);

    const [loading, setLoading] = useState<boolean>(true);    

    const [error, setError] = useState<boolean>(false);

    const [data, setData] = useState<CourseItem[]>([]);

    const fetchData = async () => {
        
        const response =  await Api.get('/courses?include=user,institution', {
            Authorization: 'Bearer ' + token,
            accept: 'application/json'    
        })

        const result: CourseItem[] = await response.data

        if(response.statusCode === 200) {
            setError(false);
            setData(result)
            setLoading(false);
        }else{
            setError(true);
            navigate(-1)
        }
    }

    useEffect(() => {fetchData()})

    return (  <AppLayout>
        {
            error && <MessageToast message='Ha ocurrido un error' type="error"/>
        }
        {
            loading && <MessageToast message='Cargando...' type="loading"/> 
        }
        {
        !error && !loading && data &&      
                    <Courses courses={data}/>
        }
        </AppLayout>
    )
}