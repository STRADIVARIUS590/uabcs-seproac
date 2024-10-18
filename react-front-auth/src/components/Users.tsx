import { useEffect, useState } from "react";
import { RootState, useAppDispatch } from "../store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../services/Api";

interface DataItem {
  id: number;
  name: string;
  email: string;

  // Add more fields as necessary
}
const Users = () => {
        // const  { token, user } = useSelector((state: RootState ) => state.auth);

        // const navigate = useNavigate();

        // const user_permissions = user?.all_permissions || [];

        // if(!user ||  user_permissions.indexOf("users.get") == -1){
        //     navigate('/dashboard')
        // } 

        const [data, setData] = useState<DataItem[]>([]); // Step 2: Typed state to store data
  

        const [loading, setLoading] = useState<boolean>(true); // Optional: Typed loading state
        
        useEffect(() => {
            
            const fetchData = async () => {
                try {

                    const response = await Api.get('/users', {
                        Authorization: 'Bearer ' + token,
                        accept: 'application/json'
                    })
                    
                    const result: DataItem[] = await response.data 

                    console.log(result);
                    
                    setData(result.users)

                    setLoading(false);

                }catch (error) {

                    alert(error);
                    
                    setLoading(true);
                }
            }
            fetchData();
        }, [])

        if(loading) {
            return <p>Loading</p>
        }
        return (
        <div>
            {/* <p>{JSON.stringify(data)}</p> */}
            <h1>Users</h1>

            <table>
                <tbody>
            {data.map((item) => (
                <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
            </tr>
            ))}
                </tbody>
            </table>     
        </div>
    )
}

export default Users;