import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Api } from "../../services/Api";
import { MessageToast } from "../MessageToast";
interface Props { 
    courses : CourseItem[]
}
export interface CourseItem {
    id: string;
    user_id: string;
    institution_id: string | undefined | null; 
    total_hours: number | string | undefined;
    name: string | undefined;
    total_students: number | string | undefined;
    educative_level: number | string | undefined;
    period: number | string | undefined;   
    start_date: number | string | undefined;
    end_date: number | string | undefined; 
    user: {
        id: string,
        name: string,
    },
    institution: {
        id: string, 
        name: string,
    }
}
export const Courses = ({courses} : Props) => {

    const  { token, user } = useSelector((state: RootState ) => state.auth);

    const navigate = useNavigate();
 
    // const user_permissions: string[] = user?.all_permissions || [];

    // useEffect(() => {
    //     if (!user || user_permissions.indexOf("courses.get") === -1) {
    //         navigate(-1);
    //     }
    // }, [user, user_permissions, navigate]);

    const [data, setData] = useState<CourseItem[]>(courses);

    // const [loading, setLoading] = useState<boolean>(true);    

    const [error, setError] = useState<boolean>(false);

   


      const deleteCourse = async ( id: number | string) => {
        const response = Api.delete('/courses/' + id, {
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
        // fetchData();
    }

    // useEffect(() => { fetchData(); }, [])

    if(error){       return <MessageToast message='Ha ocurrido un error' type="error"/>}
    // if(loading){     return <MessageToast message='Cargando...' type="loading"/> }

    return <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

        <h1>Cursos</h1>
       <table className="w-full text-sm text-left rtl:text-right font-small text-gray-900 dark:text-gray-400">
            <thead>
                <tr>
                    <th scope="col" className="px-6 py-3">#</th>
                    <th scope="col" className="px-6 py-3">Nombre</th>
                    <th scope="col" className="px-6 py-3">Horas</th>
                    <th scope="col" className="px-6 py-3">Estudiantes</th>
                    <th scope="col" className="px-6 py-3">Nivel educativo</th>
                    <th scope="col" className="px-6 py-3">Fecha de Inicio</th>
                    <th scope="col" className="px-6 py-3">Fecha de Fin</th>
                    <th scope="col" className="px-6 py-3">Inistitution</th>
                    <th scope="col" className="px-6 py-3">Usuario</th>
                    <th scope="col" className="px-6 py-3">Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.id}</td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.name}</td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.total_hours}</td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.total_students}</td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.educative_level}</td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.start_date}</td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.end_date}</td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.institution?.name}</td>
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.user?.name}</td>
                    
                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <button onClick={() => deleteCourse(item.id)}>Eliminar </button>
                        <button onClick={() => navigate('/courses/edit/' + item.id)}> Editar </button>
                    </td>
                    </tr>       
                ))}
            </tbody>
        </table>
    </div>
}

