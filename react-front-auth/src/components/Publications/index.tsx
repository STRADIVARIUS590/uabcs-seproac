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


    return (<div>
        <table>
            <thead>
                <tr>
                    <td>#</td>
                    <td>Titulo</td>
                    <td>Tipo</td>
                    <td>ISSN/ISSBN</td>
                    <td>DOI</td>
                    <td>Revista</td>
                    <td>Autores</td>
                    <td>Fecha de Publicacion</td>
                    <td>Periodo</td>
                </tr>
            </thead>

            {data.map((item) => (
                    <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.type}</td>
                    <td>{item.issn_isbn}</td>
                    <td>{item.doi}</td>
                    <td>{item.magazine_name}</td>
                    <td>{item.authors}</td>
                    <td>{item.publication_date}</td>
                    <td>{item.period}</td>
                    <button onClick={() => deletePublication(item.id)}>Eliminar </button>
                    <button onClick={() => navigate('/publications/edit/' + item.id)}> Editar </button>
                    </tr>       
                ))}
        </table>
        
    </div>)
}