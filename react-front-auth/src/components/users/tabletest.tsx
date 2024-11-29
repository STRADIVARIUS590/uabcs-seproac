import { useEffect, useState } from "react";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import { MessageToast } from "../MessageToast";
import Table, { RawData_T } from "../ui/Table";

interface UserItem extends RawData_T {
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

interface NormalizedUserData {
    id: number;
    name: string;
    email: string;
    date_ingreso: string;
    birth_date: string;
    sex: string;
    role_name: string;
}

export const UsersTest = () => {

    const { token, user } = useSelector((state: RootState) => state.auth);

    const navigate = useNavigate();

    const user_permissions: string[] = user?.all_permissions || [];

    useEffect(() => {
        if (!user || user_permissions.indexOf("users.get") === -1) {
            navigate(-1);
        }
    }, [user, user_permissions, navigate]);

    const [error, setError] = useState<boolean>();

    const [data, setData] = useState<NormalizedUserData[]>([]); // Step 2: Typed state to store data
    console.log("data", data)

    const [loading, setLoading] = useState<boolean>(true); // Optional: Typed loading state

    const fetchData = async () => {

        const response = await Api.get('/users', {
            Authorization: 'Bearer ' + token,
            accept: 'application/json'
        })

        const result: UserItem[] = await response.data

        if (response.statusCode === 200) {
            setError(false);
            const normalizedResponse = result.map(data => ({
                id: data.id,
                name: data.name,
                email: data.email,
                date_ingreso: data.date_ingreso,
                birth_date: data.birth_date,
                sex: data.sex,
                role_name: data.role.name
            }))
            setData(normalizedResponse)
            setLoading(false);
        } else {
            setError(true);
            navigate(-1);
        }

    }


    useEffect(() => { fetchData(); }, [])

    const deleteUser = async (id: number | string) => {
        const response = Api.delete('/users/' + id, {
            Authorization: 'Bearer ' + token,
            accept: 'application/json'
        })

        const result = await response;

        if (result.statusCode == 200) {
            setError(false);
        } else {
            setError(true)
        }
        fetchData();
    }

    if (error) { return <div className="mt-12"> <MessageToast message='Ha ocurrido un error' type="error" /></div> }
    if (loading) { return <div className="mt-12"> <MessageToast message='Cargando...' type="loading" /></div> }

    const headings = ["Id", "Nombre", "Correo", "Fecha de ingreso", "Fecha de nacimiento", "Género", "Rol", "Acciones"]
    return (
        <Table section="users" className={""} headsContent={headings} rowsContents={data} deleteFn={deleteUser}>
        </Table >
    )
}
