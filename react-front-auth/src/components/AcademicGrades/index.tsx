import { useEffect, useState } from "react"
import { AppLayout } from "../Layout/AppLayout"
import { MessageToast } from "../MessageToast";
import { AcademicGrades } from "./table";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";


interface AcademicGradeItem {
    id: string | number;
    name: string,
    titulation_date: string | number;
    institution: {
        id: string | number;
        name: string | number;
    }
    user: {
        id: string | number;
        name: string | number;
    }
}

export const AcademicGradesPage = () => {

    const { token, user } = useSelector((state: RootState) => state.auth);

    const navigate = useNavigate();

    const user_permissions: string[] = user?.all_permissions || [];


    useEffect(() => {
        if (!user || user_permissions.indexOf('academic-grades.get') === -1) {
            navigate(-1);
        }
    }, [user, user_permissions, navigate]);

    const [data, setData] = useState<AcademicGradeItem[]>();

    const [error, setError] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async () => {
        const response = await Api.get('/academic-grades?include=institution,user', {
            Authorization: 'Bearer ' + token,
            accept: 'application/json'
        })

        const result: AcademicGradeItem[] = await response.data;

        if (response.statusCode === 200) {

            setError(false);
            setData(result);
            setLoading(false)
        }
    }



    useEffect(() => {
        fetchData();
    }, []);

    return <AppLayout>
        {
            error && <div className="mt-12">
                <MessageToast message='Ha ocurrido un error' type="error" />
            </div>
        }
        {
            loading &&
            <div className="mt-12"><MessageToast message='Cargando...' type="loading" />
            </div>
        }
        {
            !error && !loading && data && <AcademicGrades academic_grades={data} />
        }
    </AppLayout>

}
