import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import { MessageToast } from "../MessageToast";
interface ProjectItem {
    id: string | number;
    name: string | undefined;
    description: string | undefined;
    user_id: string | number | undefined;
    objetives: string | undefined;
    colaborators: string | undefined;
    start_date: string | undefined;
    end_date: string | undefined;
    type: string | undefined;
    period: string | undefined;
    user: {
        name: string | undefined
    }
}
export const Projects = () => {
    
    const  { token, user } = useSelector((state: RootState ) => state.auth);

    const navigate = useNavigate();
  
    const user_permissions = user?.all_permissions || [];

    useEffect(() => {
        
        if (!user || user_permissions.indexOf("projects.get") === -1) {
            navigate(-1);
        }
    }, [user, user_permissions, navigate]);

    const [data, setData] = useState<ProjectItem[]>([]);

    const [loading, setLoading] = useState<boolean>(true);    

    const [error, setError] = useState<boolean>();

    const fetchData = async () => {
        
        const response =  await Api.get('/projects?include=user', {
            Authorization: 'Bearer '+ token ,
            accept: 'application/json'    
        })

        const result: ProjectItem[] = await response.data

        if(response.statusCode === 200) {
            setError(false);
            setData(result)
            setLoading(false);
        }else{
            setError(true);
            navigate(-1)
        }
    }

      const deleteProject = async ( id: number | string) => {
        const response = Api.delete('/projects/' + id, {
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
                    <td>Nombre</td>
                    <td>Descripcion</td>
                    <td>Usuario</td>
                    <td>Objetivos</td>
                    <td>Colaboradores</td>
                    <td>Fecha de inicio</td>
                    <td>Fecha de Fin</td>
                    <td>Tipo</td>
                    <td>Periodo</td>
                    <td>Acciones</td>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.user?.name}</td>
                    <td>{item.objetives}</td>
                    <td>{item.colaborators}</td>
                    <td>{item.start_date}</td>
                    <td>{item.end_date}</td>
                    <td>{item.type}</td>
                    <td>{item.period}</td>
                    <button onClick={() => deleteProject(item.id)}>Eliminar </button>
                    <button onClick={() => navigate('/projects/edit/' + item.id)}> Editar </button>
                    </tr>       
                ))}
            </tbody>
        </table>
    </div>
}