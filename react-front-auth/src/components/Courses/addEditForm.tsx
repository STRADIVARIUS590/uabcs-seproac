import { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { Api } from '../../services/Api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { MessageToast } from '../MessageToast';
interface CourseItem {

    id: string;
    user_id: string;
    institution_id: string | undefined | null; 
    total_hours: number | string | undefined;
    name: string | undefined;
    total_students: number | string | undefined;
    educative_level: number | string | undefined;
    period: number | string | undefined;   
    start_date: number | string | undefined;
    end_date: number | string | undefined; 
    user: {
        id: string,
        name: string,
    },
    institution: {
        id: string, 
        name: string,
    }
}

interface TagItem {
    id: string | null | undefined;
    name: string | null | undefined;
}
interface UserItem {
    name: string | null | undefined;
    id: string | null | undefined;
}

const validationSchema = Yup.object({
    name: Yup.string().required('El nombre es requerido'),
    total_hours: Yup.number().required('El total de horas es requerido').min(50),
    total_students: Yup.number().required('El total de estudiantes es requerido').min(5),
    period: Yup.string().required('El periodo es requerido'),
    nivel_educativo: Yup.string().required('El nivel educativo es requerido'),
    start_date: Yup.date().required('La fecha de inicio es requerida'),
    end_date: Yup.date().required('La fecha de fin es requerida'),
});

export const AddEditForm = () => {
     // MIDDLEWARE
    const { token, user } = useSelector((state: RootState) => state.auth);
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const user_permissions = user?.all_permissions || [];

    useEffect(() => {
        if (!user || user_permissions.indexOf("courses.edit") === -1) {
            navigate("/dashboard");
        }
    }, [user, user_permissions, navigate]);

    // INITIALIZE
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [data, setData] = useState<CourseItem>();
    const [users, setUsers] = useState<UserItem[]>([]);
    const [tags, setTags] = useState<TagItem[]>([]);
    
       const loadData = async () => {
        try {
            if (id) {
                const response = await Api.get("/courses/get/" + id + "?include=user,tags", {

                    Authorization: "Bearer " + token,
                    accept: "application/json",
                });
                const result: CourseItem = await response.data;
                setData(result);
            }

            const response_users = await Api.get('/users', {
                Authorization: "Bearer " + token,
                accept: "application/json",
            });
            const result_users: UserItem[] = await response_users.data;
            setUsers(result_users);

            const response_tags = await Api.get('/tags', {
                Authorization: "Bearer " + token,
                accept: "application/json",
            });
            const result_tags: TagItem[] = await response_tags.data;
            setTags(result_tags);

            setLoading(false);
        } catch (error) {
            setError(true);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [id]);

    const initialValues: CourseItem = {
        id: data?.id || "",
        user_id: data?.user_id || "",
        institution_id: data?.institution_id || '',
        name: data?.name || "",
        total_hours: data?.total_hours || 0,
        total_students: data?.total_students || 0,
        educative_level: data?.educative_level || '',
        period: data?.period || '',
        start_date: data?.start_date || '',
        end_date: data?.end_date || '',
        user: {
            id: data?.user_id || "",
            name: data?.user.name ?? ''
        },
        institution: {
            id: data?.institution_id || "", 
            name: data?.institution?.name || ''
        }
    }

    const isEditMode = !!id;

    // HANDLE
    const handleSubmit = async (values: typeof initialValues, { setFieldError }: FormikHelpers<typeof initialValues>) => {
        const response = isEditMode
            ? await Api.put(`/courses`, values, {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            })
            : await Api.post(`/courses`, values, {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            });

            
        if (response.statusCode === 200) {
            navigate('/courses');
        } else {
            const errors = response.data as { [key: string]: string[] };
            Object.entries(errors).forEach(([field, messages]) => {
                setFieldError(field, messages[0]);
            });
        }
    };
     // HTML
    if (error) { return <MessageToast message='Ha ocurrido un error' type="error" /> }
    if (loading) { return <MessageToast message='Cargando...' type="loading" /> }

    return ( <Formik 
        initialValues={initialValues}
        onSubmit={handleSubmit} 
        validationSchema={validationSchema}
    >
        {({ isSubmitting }) => (
            <Form>
              <input type="hidden" name="id" />
                <div>
                    <label htmlFor="name">Nombre</label>
                    <Field name="name" type="text" />
                    <ErrorMessage name="name" component="div" style={{ color: "red" }} />
                </div>

                <div>
                    <label htmlFor="total_hours">Horas totales</label>
                    <Field name="total_hours" type="number" />
                    <ErrorMessage name="total_hours" component="div" style={{ color: "red" }} />
                </div>

                <div>
                    <label htmlFor="total_students">Nro de Estudiantes</label>
                    <Field name="total_students" type="number" />
                    <ErrorMessage name="total_students" component="div" style={{ color: "red" }} />
                </div>

                <div>
                    <label htmlFor="educative_level">Nivel edicativo</label>
                    <Field name="educative_level" type="text" />
                    <ErrorMessage name="educative_level" component="div" style={{ color: "red" }} />
                </div>

                <div>
                    <label htmlFor="period">Periodo</label>
                    <Field name="period" type="text" />
                    <ErrorMessage name="period" component="div" style={{ color: "red" }} />
                </div>
                
                <div>
                    <label htmlFor="start_date">Fecha de inicio</label>
                    <Field name="start_date" type="date" />
                    <ErrorMessage name="start_date" component="div" style={{ color: "red" }} />
                </div>

                <div>
                    <label htmlFor="end_date">Fecha de fin </label>
                    <Field name="end_date" type="date" />
                    <ErrorMessage name="end_date" component="div" style={{ color: "red" }} />
                </div>









                 <div>
                    <button type="submit" disabled={isSubmitting}>
                        {isEditMode ? "Update" : "Add"}
                    </button>
                </div>


            </Form>
        )}

    </Formik> )
}