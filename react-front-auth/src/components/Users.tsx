import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../services/Api";

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
const Users = () => {

        
        const  { token, user } = useSelector((state: RootState ) => state.auth);

        const navigate = useNavigate();

        const user_permissions = user?.all_permissions || [];

        if(!user ||  user_permissions.indexOf("users.get") == -1){
            navigate('/dashboard')
        } 

        const [data, setData] = useState<DataItem[]>([]); // Step 2: Typed state to store data
  

        const [loading, setLoading] = useState<boolean>(true); // Optional: Typed loading state
        
            const fetchData = async () => {

                    const response = await Api.get('/users', {
                        Authorization: 'Bearer ' + token,
                        accept: 'application/json'
                    })
                    
                    const result: DataItem[] = await response.data 
                    
                    setData(result.users)

                    setLoading(false);
            }


        useEffect(() => { fetchData();}, [])

        const deleteUser = async ( id : number ) => {
            const response = await Api.delete('/users/' + id, {
                 Authorization: 'Bearer ' + token,
                 accept: 'application/json'
            })

            const result = await response.json();

            console.log(result);
            
            fetchData();
        }

        if(loading) {
            return <p>Loading</p>
        }
        return (
        <div>
            {/* <p>{JSON.stringify(data)}</p> */}
            <h1>Users</h1>
            <table>
                <thead>
                    <tr>
                        <td> #</td>
                        <td> Nombre</td>
                        <td> Correo</td>
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
                <button onClick={() => deleteUser(item.id )}>
                    Eliminar
                </button>
                <button onClick={() => navigate('/users/edit/' + item.id)}>
                    Editar
                </button>
                </tr>
            ))}
            
                </tbody>
            </table>     
        </div>
    )
}

export default Users;