import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Courses } from "./table";
import { Api } from "../../services/Api";
import { MessageToast } from "../MessageToast";
import { CourseItem } from "@/hooks/courses/useCoursesColumns";

export const CoursesTab = () => {

    const { token, user } = useSelector((state: RootState) => state.auth);

    const navigate = useNavigate();

    const [, setData] = useState<CourseItem[]>([]);

    const [error, setError] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        const response = await Api.get('/courses?include=user,institution&filter[user_id]=' + user?.id, {
            Authorization: 'Bearer ' + token,
            accept: 'application/json'
        })

        const result: [] = await response.data

        if (response.statusCode === 200) {
            setError(false);
            setData(result)
            setLoading(false);
        } else {
            setError(true);
            navigate(-1)
        }
    }

    useEffect(() => { fetchData() }, [])

    return <>
        {
            error && <MessageToast message='Ha ocurrido un error' type="error" />
        }
        {
            loading && <MessageToast message='Cargando...' type="loading" />
        }
        {
            !error && !loading && <Courses />
        }
    </>
}
// courses={data}
