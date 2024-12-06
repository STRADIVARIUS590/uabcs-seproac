import { Api } from "@/services/Api";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

interface RoleItem_T {
    name: string;
    permissions?: any[];
}

const ENDPOINT = 'roles'

export const useRoles = () => {
    const { token, user } = useSelector((state: RootState) => state.auth);
    // const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<boolean>(false);
    // esto por mientras asi para que no de error cn los setters y pues si deje compilar
    // si los quito por completo tendria que hacer un mini refactor y no traigo ganas de hacer eso la vddd
    const error = false;
    const loading = false;

    const fetchData = async () => {
        const response = await Api.get(`/${ENDPOINT}`, {
            Authorization: 'Bearer ' + token,
            accept: 'application/json'
        })
        const result = await response.data
        if (response.statusCode === 200) {
            return result;
            // setData(result)
        } else {
            return null
            // no sar navigate!
            // setError(true);
            // navigate(-1);
        }
    }

    const storeRole = async (data: RoleItem_T) => {
        const response = await Api.post(`/${ENDPOINT}`, data, {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        });
        if (response.statusCode === 200) {
            return response.data;
        }
        console.log(response)
    }

    return { fetchData, storeRole, user, error, loading };
}
