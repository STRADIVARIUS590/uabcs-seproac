// Los valores por defecto de los select no son detectados, aunque aparezcan seleccionados por default se deben de seleccionar especificamente otra vez para que el formulario mande los datos
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Api } from "../../services/Api";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { MessageToast } from "../MessageToast";
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { DefaultColumn, DefaultInput } from "../inputs/Forms";
import { UserItem } from "../Users/AddEditForm";
interface AcademicGradeItem {
    id: string | number;
    name: string,
    titulation_date: string | number;
    institution_id: string | number;
    user_id: string | number;
    institution: {
        id: string | number;
        name: string | number;

    }
    user: {
        id: string | number;
        name: string | number;
    }
}

interface InstitutionItem {
    id: string | number;
    name: string | number;
}



const validationSchema = Yup.object({
    name: Yup.string().required('El nombre es requerido')
})

export const AcademicGradesForm = () => {

    const { token, user } = useSelector((state: RootState) => state.auth);

    const { id } = useParams<{ id?: string }>();

    const navigate = useNavigate();

    const [error, setError] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(true);

    const user_permissions: string[] = user?.all_permissions || [];

    useEffect(() => {
        if (!user || user_permissions.indexOf("academic-grades.edit") === -1) {
            navigate("/dashboard");
        }
    }, [user, user_permissions, navigate]);

    const [data, setData] = useState<AcademicGradeItem>();

    const [institutions, setInstitutions] = useState<InstitutionItem[]>([]);

    const [users, setUsers] = useState<UserItem[]>([]);

    const loadData = async () => {
        try {

            if (id) {
                const response = await Api.get('/academic-grades/get/' + id + '?include=user,institution', {
                    Authorization: 'Bearer ' + token,
                    accept: 'application/json'
                })

                const result: AcademicGradeItem = response.data;

                setData(result);

                // ¿Por que solamente se traen las instituciones si se esta editando?
                setLoading(false);
            }
        } catch (e) {
            setError(true);
        }

        const response_institutions = await Api.get('/institutions', {
            Authorization: "Bearer " + token,
            accept: "application/json",
        })

        const result_institutions: InstitutionItem[] = response_institutions.data;

        setInstitutions(result_institutions);

        const response_users = await Api.get('/users', {
            Authorization: "Bearer " + token,
            accept: "application/json",
        })

        const result_users: UserItem[] = response_users.data;

        setUsers(result_users);


        setLoading(false);
    }

    useEffect(() => { loadData() }, [id]);

    const handleSubmit = async (values: typeof initialValues, { setFieldError }: FormikHelpers<typeof initialValues>) => {

        if (isEditMode) {
            const response = await Api.put('/academic-grades/', values, {
                Authorization: 'Bearer ' + token,
                "Content-Type": 'application/json',
                accept: 'application/json'
            }
            );

            if (response.statusCode == 200) {
                navigate(-1); // Redirect after submission;
            } else {
                const errors = response.data as { [key: string]: string[] };
                Object.entries(errors).forEach(([field, messages]) => {
                    setFieldError(field, messages[0]);
                });
            }

        } else {
            const response = await Api.post('/academic-grades', values, {
                Authorization: 'Bearer ' + token,
                "Content-Type": 'application/json',
                accept: 'application/json'

            });

            if (response.statusCode == 200) {
                navigate(-1); // Redirect after submission;
            } else {
                Object.entries(response.data).forEach((key) => {
                    console.log(key);
                })
            }
        }
    };

    if (error) { return <div className="mt-12"> <MessageToast message='Ha ocurrido un error' type="error" /></div> }
    if (loading) { return <div className="mt-12"> <MessageToast message='Cargando...' type="loading" /></div> }

    const isEditMode = !!id;

    const initialValues = {
        id: data?.id || 0,
        name: data?.name || '',
        titulation_date: data?.titulation_date,
        institution_id: data?.institution_id,
        institution: {
            id: data?.institution_id,
            name: data?.institution?.name,
        },
        user_id: data?.user_id,
        user: {
            id: data?.user_id,
            name: data?.user?.name
        }
    }


    return 
    
};
