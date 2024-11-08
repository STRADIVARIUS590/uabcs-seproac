import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Api } from "../../services/Api";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { MessageToast } from "../MessageToast";

interface PublicationItem {
    id: string;
    title: string | undefined;
    user_id: string | undefined;
    type: string | undefined;
    issn_isbn: string | undefined;
    doi: string | undefined;
    magazine_name : string | undefined;
    authors: string | undefined;
    publication_date: string | undefined;
    period: string | undefined;
    user: {
        name: string | undefined
    }
}
interface UserItem {
    name: string | null | undefined;
    id: string | null | undefined;
}
export const AddEditForm = () => {

      // MIDDLEWARE
    const { token, user } = useSelector((state: RootState) => state.auth);
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const user_permissions = user?.all_permissions || [];

    useEffect(() => {
        if (!user || user_permissions.indexOf("publications.edit") === -1) {
            navigate("/dashboard");
        }
    }, [user, user_permissions, navigate]);
    

    // INITIALIZE
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<PublicationItem>();
    const [users, setUsers] = useState<UserItem[]>([]);
    const [error, setError] = useState<boolean>(false);
    
    const loadData = async () => {
        if (id) {
            const response = await Api.get("/publications/get/" + id + "?include=user", {
                Authorization: "Bearer " + token,
                accept: "application/json",
            });
            const result: PublicationItem = await response.data;
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


    const initialValues: PublicationItem = {
        id: data?.id ||  "",
        title: data?.title || "",
        user_id: data?.user_id || "",
        type: data?.type || "",
        issn_isbn: data?.issn_isbn || "",
        doi: data?.doi || "",
        magazine_name: data?.magazine_name || "",
        authors: data?.authors || "",
        publication_date: data?.publication_date || "",
        period: data?.period || "",
        user: {
            name: data?.user?.name || "", 
        }
    }    

        const isEditMode = !!id

    // HANDLE
    const handleSubmit = async (values: typeof initialValues, { setFieldError }: FormikHelpers<typeof initialValues> ) => {
              
        const response = isEditMode
        ? await Api.put(`/publications`, values, {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        })
        : await Api.post(`/publications`, values, {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        });

    if (response.statusCode === 200) {
        navigate('/publications');
    } else {
        const errors = response.data as { [key: string]: string[] };
        Object.entries(errors).forEach(([field, messages]) => {
            setFieldError(field, messages[0]);
        });
    }
    };

    if(error){       return <MessageToast message='Ha ocurrido un error' type="error"/>}
    if(loading){     return <MessageToast message='Cargando...' type="loading"/> }

    return (<Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        >
        {({
            isSubmitting
        }) => (
            <Form>
                <input type="hidden" name="id" />               
               <div>
                    <label htmlFor="title">Titulo</label>
                    <Field name="title" type="text" />
                    <ErrorMessage name="title" component="div" style={{ color: "red" }} />
                </div>

                <div>
                    <label htmlFor="type">Tipo</label>
                    <Field name="type" type="text" />
                    <ErrorMessage name="type" component="div" style={{ color: "red" }} />
                </div>

                <div>
                    <label htmlFor="doi">DOI</label>
                    <Field name="doi" type="text" />
                    <ErrorMessage name="doi" component="div" style={{ color: "red" }} />
                </div>

                <div>
                    <label htmlFor="issn_isbn">ISSN / ISBN</label>
                    <Field name="issn_isbn" type="text" />
                    <ErrorMessage name="issn_isbn" component="div" style={{ color: "red" }} />
                </div>

                <div>
                    <label htmlFor="magazine_name">Revista</label>
                    <Field name="magazine_name" type="text" />
                    <ErrorMessage name="magazine_name" component="div" style={{ color: "red" }} />
                </div>

                <div>
                    <label htmlFor="authors">Autores</label>
                    <Field name="autors" type="text" />
                    <ErrorMessage name="authors" component="div" style={{ color: "red" }} />
                </div>

                <div>
                    <label htmlFor="publication_date">Fecha de Publicacion</label>
                    <Field name="publication_date" type="date" />
                    <ErrorMessage name="publication_date" component="div" style={{ color: "red" }} />
                </div>
                
                 <div>
                    <label htmlFor="period">Periodo</label>
                    <Field name="period" type="text" />
                    <ErrorMessage name="period" component="div" style={{ color: "red" }} />
                </div>
                <div>
                        <button type="submit" disabled={isSubmitting}>
                            {isEditMode ? "Update" : "Add"}
                        </button>
                </div>
            </Form>
        )}
    </Formik>)
}