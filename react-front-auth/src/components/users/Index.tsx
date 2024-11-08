import { useEffect, useState } from "react";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import { AppLayout } from "../Layout/AppLayout";
import { MessageToast } from "../MessageToast";

interface DataItem {
  id: number;   
  name: string;
  email: string;
  date_ingreso: string;
  birth_date: string;
  sex: string;
    role: {
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

        const [data, setData] = useState<DataItem[]>([]); // Step 2: Typed state to store data
  

        const [loading, setLoading] = useState<boolean>(true); // Optional: Typed loading state
        
            const fetchData = async () => {

                    const response = await Api.get('/users', {
                        Authorization: 'Bearer ' + token,
                        accept: 'application/json'
                    })
                    
                    const result: DataItem[] = await response.data 
                    
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
        <AppLayout>
        <div >
            {/* <p>{JSON.stringify(data)}</p> */}
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <td> #</td>
                        <td> Nombre</td>
                        <td> Correo </td>
                        <td> Fecha de ingreso</td>
                        <td> Fecha de nacimiento</td>
                        <td> Sexo </td>
                        <td> Rol </td>
                    </tr>
                </thead>
                <tbody>
                    
                    
            {data.map((item) => (
                <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td> 
                <td>{item.date_ingreso}</td> 
                <td>{item.birth_date}</td> 
                <td>{item.sex}</td> 
                <td>{item.role?.name}</td> 
                <button onClick={() => deleteUser(item.id )}> Eliminar
                </button>
                <button onClick={() => navigate('/users/edit/' + item.id)}>Editar</button>
                </tr>
            ))}
            
                </tbody>
            </table>     
        </div>
    </AppLayout>)
}