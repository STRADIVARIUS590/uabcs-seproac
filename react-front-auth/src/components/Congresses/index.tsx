import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import { MessageToast } from "../MessageToast";
// interface UserCon
 interface CongressItem {
    id: string | number;
    title_trabajo: string;
    user_id: string | number;
    event_name: string | null;
    date: string | null;
    colaborators: number | null
    user: {
        name: string
    }
}

export const Congresses = () => {

    const  { token, user } = useSelector((state: RootState ) => state.auth);

    const navigate = useNavigate();
 
    const user_permissions = user?.all_permissions || [];

    useEffect(() => {
        if (!user || user_permissions.indexOf("congresses.get") === -1) {
            navigate(-1);
        }
    }, [user, user_permissions, navigate]);



    const [data, setData] = useState<CongressItem[]>([]);

    const [loading, setLoading] = useState<boolean>(true);    

    const [error, setError] = useState<boolean>();

    const fetchData = async () => {
        
        const response =  await Api.get('/congresses?include=user', {
            Authorization: 'Bearer ' + token,
            accept: 'application/json'    
        })

        const result: CongressItem[] = await response.data

        if(response.statusCode === 200) {
            setError(false);
            setData(result)
            setLoading(false);
        }else{
            setError(true);
            navigate(-1)
        }
    }

    const deleteCongress = async ( id: number | string) => {
        const response = Api.delete('/congresses/' + id, {
            Authorization: 'Bearer ' + token,
            accept: 'application/json'
        })

        const result = await response;

        if(result.statusCode == 200) {
            setError(false);
        }else {
            setError(true)
        }
        fetchData();
    }

    
    useEffect(() => { fetchData(); }, [])
    
    if(error){       return <MessageToast message='Ha ocurrido un error' type="error"/>}
    if(loading){     return <MessageToast message='Cargando...' type="loading"/> }

    return <div>
        <table>
        <thead>
            <tr>
                <td>#</td>
                <td>Titulo del trabajo</td>
                <td>Usuario</td>
                <td>Evento</td>
                <td>Fecha</td>
                <td>Nro de Colaboradores</td>
                <td>Acciones</td>
            </tr>
        </thead>
        <tbody>
            {data.map((item) => (
                <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title_trabajo}</td>
                <td>{item.user?.name}</td>
                <td>{item.event_name}</td>
                <td>{item.date}</td>
                <td>{item.colaborators}</td>
                <button onClick={() => deleteCongress(item.id)}>Eliminar</button>
                <button onClick={() => navigate('/congresses/edit/' + item.id)}>Editar</button>
                </tr>   
            ))}
        </tbody>
    </table>
    </div>
}