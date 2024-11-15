import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Api } from "../../services/Api";
import { MessageToast } from "../MessageToast";
interface PublicationItem {
    id: string;
    title: string | undefined;
    user_id: string | undefined;
    type: string | undefined;
    issn_isbn: string | undefined;
    doi: string | undefined;
    magazine_name : string | undefined;
    authors: string | undefined;
    publication_date: string | undefined;
    period: string | undefined;
    user: {
        name: string | undefined
    }
}
export const Publications = () => {

    const { token, user } = useSelector((state: RootState) => state.auth);

    const navigate = useNavigate();

    const user_permissions = user?.all_permissions || [];

    useEffect(() => {
        
        if(!user || user_permissions.indexOf("publications.get") === -1){
            navigate(-1);
        }
    }, [user, user_permissions, navigate]);

    const [data, setData] = useState<PublicationItem[]>([]);

    const [loading, setLoading] = useState<boolean>(true);    

    const [error, setError] = useState<boolean>();

    const fetchData = async () => {
        
        const response =  await Api.get('/publications?include=user', {
            Authorization: 'Bearer '+ token ,
            accept: 'application/json'    
        })

        const result: PublicationItem[] = await response.data

        if(response.statusCode === 200) {
            setError(false);
            setData(result)
            setLoading(false);
        }else{
            setError(true);
            navigate(-1)
        }
    }


    const deletePublication = async ( id: number | string) => {
        const response = Api.delete('/publications/' + id, {
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

    useEffect(() => { fetchData() }, []);

    if(error){       return <MessageToast message='Ha ocurrido un error' type="error"/>}
    if(loading){     return <MessageToast message='Cargando...' type="loading"/> }


    return (<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <h1>Piblicaciones</h1>
        <table className="text-align:center w-full text-sm text-left rtl:text-right font-small text-gray-900 dark:text-gray-400">
            <thead >
                <tr>
                    <th scope="col" className="px-6 py-3">#</th>
                    <th scope="col" className="px-6 py-3">Titulo</th>
                    <th scope="col" className="px-6 py-3">Tipo</th>
                    <th scope="col" className="px-6 py-3">ISSN/ISSBN</th>
                    <th scope="col" className="px-6 py-3">DOI</th>
                    <th scope="col" className="px-6 py-3">Revista</th>
                    <th scope="col" className="px-6 py-3">Autores</th>
                    <th scope="col" className="px-6 py-3">Usuario</th>
                    <th scope="col" className="px-6 py-3">Fecha de Publicacion</th>
                    <th scope="col" className="px-6 py-3">Periodo</th>
                    <th scope="col" className="px-6 py-3">Acciones</th>
                </tr>
            </thead>

            {data.map((item) => (
                    <tr key={item.id} className="text-align:center odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.id}</td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.title}</td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.type}</td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.issn_isbn}</td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.doi}</td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.magazine_name}</td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.authors}</td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.user?.name}</td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.publication_date}</td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.period}</td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <button className="hover:text-red-900" onClick={() => deletePublication(item.id)}>Eliminar </button>
                        <button onClick={() => navigate('/publications/edit/' + item.id)}> Editar </button>
                    </td>
                    </tr>       
                ))}
        </table>
        
    </div>)
}