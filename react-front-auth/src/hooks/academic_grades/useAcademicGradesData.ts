import { Api } from "@/services/Api";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AcademicGradeItem } from "./useAcademicGradesColumns";

const useAcademicGrades = ({getEndpoint, id} : { getEndpoint : string, id? : number | string | null | undefined}) => {
    const { token, user } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const user_permissions: string[] = user?.all_permissions || [];

    const [error, setError] = useState<boolean>(false);
    const [data, setData] = useState<AcademicGradeItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [canEdit, setCanEdit] = useState<boolean>(true);
    const [canDelete, setCanDelete] = useState<boolean>(true);
    const fetchData = async () => {
        const response = await Api.get(getEndpoint, {
            Authorization: 'Bearer ' + token,
            accept: 'application/json'
        })
        const result: AcademicGradeItem[] = await response.data
        if (response.statusCode === 200) {
            setError(false);
            setLoading(false);
            setData(result)
            console.log('culoooo', result, getEndpoint)
        } else {
            // no usar navigate!
            setError(true);
            navigate(-1);
        }
    }

    // TODO no retornar con navigate si no retornar un error
    useEffect(() => {
        if (!user || user_permissions.indexOf('academic-grades.get') === -1) {
            // navigate(-1);
        }

        if (user && user_permissions.indexOf("academic-grades.destroy") > -1) {
            setCanDelete(true);
        }

        if (user && user_permissions.indexOf("academic-grades.edit") > -1) {
            setCanEdit(true)
        }
    }, [user, user_permissions, navigate]);

    const deleteFn = async (id: number | string) => {
        const response = Api.delete('/academic-grades/' + id, {
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

    useEffect(() => { if(!id) fetchData(); }, [])
    return { data, user, deleteFn, loading, error, canDelete, canEdit }
}
export default useAcademicGrades
