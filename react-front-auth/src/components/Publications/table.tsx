import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Api } from "../../services/Api";
import { MessageToast } from "../MessageToast";
import { PublicationItem } from ".";

interface Props {
    publications : PublicationItem[]
}
export const Publications = ( {publications} : Props) => {

    const  { token, user } = useSelector((state: RootState ) => state.auth);

    const navigate = useNavigate();

    const [canDelete, setCanDelete ] = useState<boolean>(false);
   
    const [canEdit, setCanEdit ] = useState<boolean>(false);

    const [ data , setData] = useState(publications);
    
    const user_permissions: string[] = user?.all_permissions || [];

    
    const [error, setError] = useState<boolean>(false);

    // const [loading, setLoading ] = useState<boolean>(false);

     useEffect(() => {
        if (!user || user_permissions.indexOf("publications.get") === -1) {
            navigate(-1);
        }
        if(user && user_permissions.indexOf("publications.destroy") > -1) {
            setCanDelete(true);
        }

        if(user && user_permissions.indexOf("publications.edit") > -1) {
            setCanEdit(true)
        }
    }, [user, user_permissions, navigate]);

    // setLoading(false);

    const deletePublication = async ( id: number | string) => {
           const response = Api.delete('/publications/' + id, {
                Authorization: 'Bearer ' + token,
                accept: 'application/json'
            })
    
            const result = await response;
    
            if(result.statusCode == 200) {
                const updatedPublications = publications.filter(item => item.id !== id);
                setData(updatedPublications);
            }else {
                setError(true)
            }
    }

    // useEffect(() => {},  []);

    if(error){       return <MessageToast message='Ha ocurrido un error' type="error"/>}
    // if(loading){     return <MessageToast message='Cargando...' type="loading"/> }


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
                        <button disabled={!canDelete} className="hover:text-red-900" onClick={() => deletePublication(item.id)}>Eliminar </button>
                        <button disabled={!canEdit} onClick={() => navigate('/publications/edit/' + item.id)}> Editar </button>
                    </td>
                    </tr>       
                ))}
        </table>
        
    </div>)
}