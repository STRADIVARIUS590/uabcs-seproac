import { Api } from "@/services/Api";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import { RoleItem_T } from "./useRolesTableColumns";

export const useRoles = () => {
    const { token, user } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
 
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<RoleItem_T[]>([]);
    const fetchData = async () => {
        const response = await Api.get('/roles', {
            Authorization: 'Bearer ' + token,
            accept: 'application/json'
        })
        const result = await response.data
        if (response.statusCode === 200) {
            return result;
            // setError(false);
            // setLoading(false);
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