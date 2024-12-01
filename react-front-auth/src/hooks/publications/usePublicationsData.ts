import { Api } from "@/services/Api";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserItem_T } from "./useUserColumns";

export const useUser = () => {
    const { token, user } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const user_permissions: string[] = user?.all_permissions || [];


    const [error, setError] = useState<boolean>(false);
    const [data, setData] = useState<UserItem_T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [canModify, setCanModify] = useState<boolean>(true);
    const fetchData = async () => {
        const response = await Api.get('/users', {
            Authorization: 'Bearer ' + token,
            accept: 'application/json'
        })
        const result: UserItem_T[] = await response.data
        if (response.statusCode === 200) {
            setError(false);
            setLoading(false);
            setData(result)
        } else {
            // no usar navigate!
            setError(true);
            navigate(-1);
        }
    }

    // TODO no retornar con navigate si no retornar un error
    useEffect(() => {
        if (!user || user_permissions.indexOf("users.get") === -1) {
            navigate(-1);
        }
        if (user && user_permissions.indexOf("users.edit") > -1) {
            setCanModify(true)
        }
    }, [user, user_permissions, navigate]);

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

    useEffect(() => { fetchData(); }, [])
    return { data, user, deleteUser, loading, error, canModify }
}
