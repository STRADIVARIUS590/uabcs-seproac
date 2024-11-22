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
 
    const user_permissions: string[] = user?.all_permissions || [];

    useEffect(() => {

        if (!user || user_permissions.indexOf( 'congresses.get' ) === -1) {
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

    return <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

        <h1>Congresos</h1>
        <table className="w-full text-sm text-left rtl:text-right font-small text-gray-900 dark:text-gray-400">
        <thead>
            <tr className="text-center">
                <th scope="col" className="px-6 py-3">#</th>
                <th scope="col" className="px-6 py-3" >Titulo del trabajo</th>
                <th scope="col" className="px-6 py-3">Usuario</th>
                <th scope="col" className="px-6 py-3">Evento</th>
                <th scope="col" className="px-6 py-3">Fecha</th>
                <th scope="col" className="px-6 py-3">Nro de Colaboradores</th>
                <th scope="col" className="px-6 py-3">Acciones</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item) => (
                <tr key={item.id} className="text-center odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.id}</td>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.title_trabajo}</td>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.user?.name}</td>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.event_name}</td>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.date}</td>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.colaborators}</td>
                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <button  onClick={() => deleteCongress(item.id)}>Eliminar</button>
                    <button onClick={() => navigate('/congresses/edit/' + item.id)}>Editar</button>
                </td>
                </tr>   
            ))}
        </tbody>
    </table>
    </div>
}