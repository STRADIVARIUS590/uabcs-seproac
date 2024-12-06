import { Api } from "@/services/Api";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import { RoleItem_T } from "./useRolesTableColumns";

export const useRoles = () => {
    const { token, user } = useSelector((state: RootState) => state.auth);
    // const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<boolean>(false);
    // esto por mientras asi para que no de error cn los setters y pues si deje compilar
    // si los quito por completo tendria que hacer un mini refactor y no traigo ganas de hacer eso la vddd
    const error = false;
    const loading = false;

    const fetchData = async () => {
        const response = await Api.get('/roles', {
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

    // useEffect(() => { fetchData() }, [])

    return { fetchData, user, error, loading };
}
