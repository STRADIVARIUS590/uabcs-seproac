import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Api } from "../../services/Api";
import { MessageToast } from "../MessageToast";
interface CourseItem {
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
export const Courses = () => {

    const  { token, user } = useSelector((state: RootState ) => state.auth);

    const navigate = useNavigate();
 
    const user_permissions = user?.all_permissions || [];

    useEffect(() => {
        if (!user || user_permissions.indexOf("courses.get") === -1) {
            navigate(-1);
        }
    }, [user, user_permissions, navigate]);

    const [data, setData] = useState<CourseItem[]>([]);

    const [loading, setLoading] = useState<boolean>(true);    

    const [error, setError] = useState<boolean>();

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


      const deleteCourse = async ( id: number | string) => {
        const response = Api.delete('/courses/' + id, {
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
                    <td>Horas</td>
                    <td>Estudiantes</td>
                    <td>Nivel educativo</td>
                    <td>Fecha de Inicio</td>
                    <td>Fecha de Fin</td>
                    <td>Inistitution</td>
                    <td>Usuario</td>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.total_hours}</td>
                    <td>{item.total_students}</td>
                    <td>{item.educative_level}</td>
                    <td>{item.start_date}</td>
                    <td>{item.end_date}</td>
                    {/* <td>{item.period}</td> */}
                    <td>{item.institution?.name}</td>
                    <td>{item.user?.name}</td>
                    <button onClick={() => deleteCourse(item.id)}>Eliminar </button>
                    <button onClick={() => navigate('/courses/edit/' + item.id)}> Editar </button>
                    </tr>       
                ))}
            </tbody>
        </table>
    </div>
}

