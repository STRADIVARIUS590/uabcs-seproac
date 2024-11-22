import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import { MessageToast } from "../MessageToast";
// import { AppContext, Context } from "../scripts/Context";
interface Props {
    projects : ProjectItem[]
}

export interface ProjectItem {
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
export const Projects = ({ projects } : Props ) => {
    
    const  { token, user } = useSelector((state: RootState ) => state.auth);

    const navigate = useNavigate();
  
    const user_permissions: string[] = user?.all_permissions || [];

    useEffect(() => {
        
        if (!user || user_permissions.indexOf("projects.get") === -1) {
            navigate(-1);
        }
    }, [user, user_permissions, navigate]);

    const [data, setData] = useState<ProjectItem[]>(projects);

    const [error, setError] = useState<boolean>(false)

      const deleteProject = async ( id: number | string) => {
        const response = Api.delete('/projects/' + id, {
            Authorization: 'Bearer ' + token,
            accept: 'application/json'
        })

        const result = await response;

        if(result.statusCode == 200) {
            const updatedTags = data.filter(tag => tag.id !== id); // Create a new array without the deleted tag
            setData(updatedTags); // Update state to trigger re-render

            setError(false);
        }else {
            setError(true)
        }
    }

    // useEffect(() => { }, [])
    
    if(error){  return <MessageToast message='Ha ocurrido un error' type="error"/>}

    return <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <h1>Proyectos </h1>
        <table className="w-full text-sm text-left rtl:text-right font-small text-gray-900 dark:text-gray-400">
            <thead>
                <tr>
                    <th scope="col" className="px-6 py-3">#</th>
                    <th scope="col" className="px-6 py-3">Nombre</th>
                    <th scope="col" className="px-6 py-3">Descripcion</th>
                    <th scope="col" className="px-6 py-3">Usuario</th>
                    <th scope="col" className="px-6 py-3">Objetivos</th>
                    <th scope="col" className="px-6 py-3">Colaboradores</th>
                    <th scope="col" className="px-6 py-3">Fecha de inicio</th>
                    <th scope="col" className="px-6 py-3">Fecha de Fin</th>
                    <th scope="col" className="px-6 py-3">Tipo</th>
                    <th scope="col" className="px-6 py-3">Periodo</th>
                    <th scope="col" className="px-6 py-3">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.id}</td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.name}</td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.description}</td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.user?.name}</td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.objetives}</td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.colaborators}</td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.start_date}</td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.end_date}</td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.type}</td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.period}</td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <button onClick={() => deleteProject(item.id)}>Eliminar </button>
                        <button onClick={() => navigate('/projects/edit/' + item.id)}> Editar </button>
                    </td>
                    </tr>       
                ))}
            </tbody>
        </table>
    </div>
}