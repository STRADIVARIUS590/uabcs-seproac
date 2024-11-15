import { useSelector } from "react-redux";
import { AppLayout } from "../Layout/AppLayout"
import { Tags } from "./table"
import { useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { RootState } from "../../store";
import { Api } from "../../services/Api";
import { MessageToast } from "../MessageToast";

interface TagItem {
    id: string | number;
    name: string;
    slug: string;
}
export const IndexTags = () => {
   const  { token, user } = useSelector((state: RootState ) => state.auth);

    const navigate = useNavigate();

    const user_permissions = user?.all_permissions || [];

    useEffect(() => {
        if (!user || user_permissions.indexOf("tags.get") === -1) {
            navigate(-1);
        }
    }, [user, user_permissions, navigate]);

    const [loading, setLoading] = useState<boolean>(true);
    
    const [data, setData] = useState<TagItem[]>([]);

    const [error, setError] = useState<boolean>(false); 

    const fetchData = async () => {

            const response = await Api.get('/tags', {
                Authorization: 'Bearer ' + token,
                accept: 'application/json'
            })
            
            const result: TagItem[] = await response.data 
            
            if(response.statusCode === 200) {
                setError(false);
                setData(result)
                setLoading(false);
            }else{
                setError(true);
                navigate(-1);
            }

    }

    useEffect(() => { fetchData() }, []);

    // const AuthContext = createContext(user);

    return <AppLayout>
        {
            error && <MessageToast message='Ha ocurrido un error' type="error"/>
        }
        {
            loading && <MessageToast message='Cargando...' type="loading"/> 
        }
        {
            !error && !loading && 
                // <AuthContext.Provider value={user}>
                    <Tags tags={data} />
                // </AuthContext.Provider>
        }

    </AppLayout>
    
}