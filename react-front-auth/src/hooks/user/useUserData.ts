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
    // const [data, setData] = useState<UserItem_T[]>([]);
    const [loading] = useState<boolean>(true);
    const [canEdit, setCanEdit] = useState<boolean>(true);
    const [canDelete, setCanDelete] = useState<boolean>(true);
    const fetchData = async () => {
        const response = await Api.get('/users', {
            Authorization: 'Bearer ' + token,
            accept: 'application/json'
        })
        const result: UserItem_T[] = await response.data
        if (response.statusCode === 200) {
            return result;
        } else {
            return [];
        }
    }

    // TODO no retornar con navigate si no retornar un error
    useEffect(() => {
        if (!user || user_permissions.indexOf("users.get") === -1) {
            navigate(-1);
        }
        if (user && user_permissions.indexOf("users.destroy") > -1) {
            setCanDelete(true);
        }

        if (user && user_permissions.indexOf("users.edit") > -1) {
            setCanEdit(true)
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



     const post = async(url: string, data: any, headers : {}): Promise<any>  => {
        const response = await fetch(`${Api.baseUrl}${url}`, {
            method: 'POST',
            headers : headers,
            body: data
        })
    
        const dataResponse = await response.json()
        
        return {
            statusCode : response.status,
            data: dataResponse.data
        }
    }
    const getById = async (id : number | string) => {
        const response = await Api.get('/users/get/' + id + '?include=tags,avatar', {
            Authorization: 'Bearer ' + token,
            accept: 'application/json'
        })

        const result = await response.data
        return result || null
    }
    return { post, fetchData, getById, user, deleteUser, loading, error, canDelete, canEdit }
}
