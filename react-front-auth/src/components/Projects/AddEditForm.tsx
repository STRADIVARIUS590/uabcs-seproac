import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Api } from "../../services/Api";
import * as Yup from 'yup';
import { MessageToast } from "../MessageToast";
import { ErrorMessage, Field, Formik, FormikHelpers, Form } from "formik";
const validationSchema = Yup.object({
    name: Yup.string().required('El nombre es requerido'),
    description: Yup.string().required('La descripcion es requerida'),
    objetives: Yup.string().required('Los objetivos son requeridos'),
    colaborators: Yup.string().required('Los colaboradores son requeridos'),
    start_date: Yup.date().required('La fecha de inicio es requerida'),
    end_date: Yup.string().required('La fecha de fin es requerida'),
    type: Yup.string().required('El tipo es reqerido'),
    period: Yup.string().required('El periodo es requerido'),
})

interface ProjectItem {
    id: string | number;
    name: string | undefined;
    description: string | undefined;
    user_id: string | number | undefined;
    objetives: string | undefined;
    colaborators: string | undefined;
    start_date: string | undefined;
    end_date: string | undefined;
    type: string | undefined;
    period: string | undefined;
    user: {
        name: string | undefined
    }
}

interface UserItem {
    name: string;
    id: string 
}
export const AddEditForm = () => {
    
      // MIDDLEWARE
    const { token, user } = useSelector((state: RootState) => state.auth);
    
    const { id } = useParams<{ id?: string }>();
    
    const navigate = useNavigate();
    
    const user_permissions = user?.all_permissions || [];

    // if (!user || user_permissions.indexOf("projects.edit") === -1) {
    //     navigate("/dashboard");
    // }

    useEffect(() => {
        if (!user || user_permissions.indexOf("projects.edit") === -1) {
            navigate("/dashboard");
        }
    }, [user, user_permissions, navigate]);

    // INITIALIZE
   
    const [isLoading, setLoading] = useState<boolean>(true);
    
    const [error, setError] = useState<boolean>(false);

    const [data, setData] = useState<ProjectItem>();
    
    const [users, setUsers] = useState<UserItem[]>([]);
    const loadData = async () => {
        if (id) {
            const response = await Api.get("/projects/get/" + id + "?include=user", {
                Authorization: "Bearer " + token,
                accept: "application/json",
            });
            const result = await response.data;
            setData(result);
        }

        const response = await Api.get('/users', {
                Authorization: "Bearer " + token,
                accept: "application/json",
            })
        const result: UserItem[] = await response.data;

        setUsers(result);

        setLoading(false);
    };

    useEffect(() => {
        loadData();
        // loadUsers();
    }, [id]);

    const initialValues: ProjectItem = {
        id: data?.id || "",
        name: data?.name || "",
        description: data?.description || "",
        user_id: data?.user_id || "", 
        objetives: data?.objetives || "",
        colaborators: data?.colaborators || "",
        start_date: data?.start_date || "",
        end_date: data?.end_date || "",
        type: data?.type || "",
        period: data?.period || "",
        user: {
            name: data?.user?.name || "",
            }
    }

    const isEditMode = !!id;

       // HANDLE
    const handleSubmit = async (values: typeof initialValues, { setFieldError }: FormikHelpers<typeof initialValues> ) => {
        console.error(JSON.stringify(values));
        
        const response = isEditMode
        ? await Api.put(`/projects`, values, {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        })
        : await Api.post(`/projects`, values, {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        });
        console.error(response);
        
    if (response.statusCode === 200) {
        navigate('/projects');
    } else {
        const errors = response.data as { [key: string]: string[] };
        Object.entries(errors).forEach(([field, messages]) => {
            setFieldError(field, messages[0]);
        });
    }
    };

    if(error){         return <MessageToast message='Ha ocurrido un error' type="error"/>}
    if(isLoading){     return <MessageToast message='Cargando...' type="loading"/> }

    return (
    <Formik 
        initialValues={initialValues} 
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
            <Form>
        
                <input type="hidden" name="id" />
                    <div>
                        <label htmlFor="name">Nombre</label>
                        <Field name="name" type="text" />
                        <ErrorMessage name="name" component="div" style={{ color: "red" }} />
                    </div>

                    <div>
                        <label htmlFor="description">Descripcion</label>
                        <Field name="description" type="text" />
                        <ErrorMessage name="description" component="div" style={{ color: "red" }} />
                    </div>

                    <div>
                        <label htmlFor="objetives">Objetivos</label>
                        <Field name="objetives" type="text" />
                        <ErrorMessage name="objetives" component="div" style={{ color: "red" }} />
                    </div>
                        
                    <div>
                        <label htmlFor="colaborators">Colaboradores</label>
                        <Field name="colaborators" type="text" />
                        <ErrorMessage name="colaborators" component="div" style={{ color: "red" }} />
                    </div>

                    <div>
                        <label htmlFor="start_date">Fecha de inicio</label>
                        <Field name="end_date" type="date" />
                        <ErrorMessage name="start_date" component="div" style={{ color: "red" }} />
                    </div>

                    <div>
                        <label htmlFor="end_date">Fecha de fin</label>
                        <Field name="end_date" type="date" />
                        <ErrorMessage name="end_date" component="div" style={{ color: "red" }} />
                    </div>
                        
                    <div>
                        <label htmlFor="type">Tipo</label>
                        <Field name="type" type="text" />
                        <ErrorMessage name="type" component="div" style={{ color: "red" }} />
                    </div>

                    <div>
                        <label htmlFor="period">Periodo</label>
                        <Field name="period" type="text" />
                        <ErrorMessage name="period" component="div" style={{ color: "red" }} />
                    </div>

                    <div>
                    <label htmlFor="user_id">Usuario</label>
                    <Field as="select" name="user_id">
                        <option value="">Select a user</option> {/* Default empty option */}
                        {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                        ))}
                    </Field>
                    <ErrorMessage name="user_id" component="div" style={{ color: 'red' }} />
                    </div>


                    <div>
                        <button type="submit" disabled={isSubmitting}>
                            {isEditMode ? "Update" : "Add"}
                        </button>
                    </div>
            </Form>  
        )}

    </Formik>);
}