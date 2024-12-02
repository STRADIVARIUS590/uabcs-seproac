import { useSelector } from "react-redux";
import { Projects } from "./table"
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { Api } from "../../services/Api";
import { MessageToast } from "../MessageToast";
import { useNavigate } from "react-router-dom";
import { ProjectItem } from "@/hooks/projects/useProjectsColumns";

export const ProjectsTab = () => {
    const { token, user } = useSelector((state: RootState) => state.auth);

    const navigate = useNavigate();

    const [, setData] = useState<ProjectItem[]>();

    const [error, setError] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        const response = await Api.get('/projects?include=user&filter[user_id]=' + user?.id, {
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
            !error && !loading && <Projects />
        }
    </>
}
// projects={data}
