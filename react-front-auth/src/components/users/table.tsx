import { useEffect, useState } from "react";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import { AppLayout } from "../Layout/AppLayout";
import { MessageToast } from "../MessageToast";

interface UserItem {
  id: number;   
  name: string;
  email: string;
  date_ingreso: string;
  birth_date: string;
  sex: string;
  role_id: string;
    role: {
        id: number;
        name: string;
    }
  // Add more fields as necessary
}
export const Users = () => {

        const  { token, user } = useSelector((state: RootState ) => state.auth);

        const navigate = useNavigate();

        const user_permissions = user?.all_permissions || [];

        useEffect(() => {
            if (!user || user_permissions.indexOf("users.get") === -1) {
                navigate(-1);
            }
        }, [user, user_permissions, navigate]);

        const [error, setError] = useState<boolean>();

        const [data, setData] = useState<UserItem[]>([]); // Step 2: Typed state to store data 

        const [loading, setLoading] = useState<boolean>(true); // Optional: Typed loading state
        
            const fetchData = async () => {

                    const response = await Api.get('/users', {
                        Authorization: 'Bearer ' + token,
                        accept: 'application/json'
                    })
                    
                    const result: UserItem[] = await response.data 
                    
                    if(response.statusCode === 200) {
                        setError(false);
                        setData(result)
                        setLoading(false);
                    }else{
                        setError(true);
                        navigate(-1);
                    }

            }


        useEffect(() => { fetchData();}, [])

        const deleteUser = async ( id : number ) => {
            const response = Api.delete('/users/' + id, {
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

        if(error){       return <MessageToast message='Ha ocurrido un error' type="error"/>}
        if(loading){     return <MessageToast message='Cargando...' type="loading"/> }
    
        return (
    
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

            <h1 >Usuarios</h1>
            <table className="text-center w-full text-sm text-left rtl:text-right font-small text-gray-900 dark:text-gray-400">
                <thead>
                    <tr>
                        <th scope="col" className="px-6 py-3"> #</th>
                        <th scope="col" className="px-6 py-3"> Nombre</th>
                        <th scope="col" className="px-6 py-3"> Correo</th>
                        <th scope="col" className="px-6 py-3"> Fecha de ingreso</th>
                        <th scope="col" className="px-6 py-3"> Fecha de nacimiento</th>
                        <th scope="col" className="px-6 py-3"> Sexo </th>
                        <th scope="col" className="px-6 py-3"> Rol   </th>
                        <th scope="col" className="px-6 py-3"> Acciones </th>
                    </tr>
                </thead>
                    <tbody>

                    {data.map((item) => (
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={item.id}>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.id}</th>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.name}</th>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.email}</th>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.date_ingreso}</th>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.birth_date}</th>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.sex}</th>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.role?.name}</th>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <button onClick={() => deleteUser(item.id)}> Eliminar</button>
                            <button onClick={() => navigate('/users/edit/' + item.id)}>Editar</button>
                        </th>
                    </tr>
                    ))} 
                </tbody>
            </table>     
        </div>
    )
}