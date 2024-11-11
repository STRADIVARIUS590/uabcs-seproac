import { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { Api } from '../../services/Api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { MessageToast } from '../MessageToast';

interface DataItem {
    id: string | number | null | undefined;
    title_trabajo: string | null | undefined;
    user_id: string | null | undefined;
    event_name: string | null | undefined;
    date: string | null | undefined;
    colaborators: number | null | undefined;
    tags: string[]; // Store only tag ids for easier handling
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
    title_trabajo: Yup.string().required('El titulo del trabajo es requerido'),
    user_id : Yup.string().required('El usuario es requerido'),
    event_name : Yup.string().required('El nombre del evento es requerido'),
    date: Yup.date().required('LA fecha es reqerida'),
    colaborators: Yup.string().required('REQUIRED')
});

export const AddEditForm = () => {
    // MIDDLEWARE
    const { token, user } = useSelector((state: RootState) => state.auth);
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const user_permissions = user?.all_permissions || [];

    useEffect(() => {
        if (!user || user_permissions.indexOf("congresses.edit") === -1) {
            navigate("/dashboard");
        }
    }, [user, user_permissions, navigate]);

    // INITIALIZE
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [data, setData] = useState<DataItem>();
    const [users, setUsers] = useState<UserItem[]>([]);
    const [tags, setTags] = useState<TagItem[]>([]);

    const loadData = async () => {
        try {
            if (id) {
                const response = await Api.get("/congresses/get/" + id + "?include=user,tags", {
                    Authorization: "Bearer " + token,
                    accept: "application/json",
                });
                const result = await response.data;
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

    const initialValues: DataItem = {
        id: data?.id || "",
        title_trabajo: data?.title_trabajo || "",
        user_id: data?.user_id || "",
        event_name: data?.event_name || "",
        date: data?.date || "",
        colaborators: data?.colaborators || 0,
        tags: data?.tags.map(tag => tag.id) || [] // Only keep tag ids
    };

    const isEditMode = !!id;

    // HANDLE
    const handleSubmit = async (values: typeof initialValues, { setFieldError }: FormikHelpers<typeof initialValues>) => {
        const response = isEditMode
            ? await Api.put(`/congresses`, values, {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            })
            : await Api.post(`/congresses`, values, {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            });

            
        if (response.statusCode === 200) {
            navigate('/congresses');
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

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            {({ isSubmitting }) => (
                <Form>

                    <input type="hidden" name="id" />
                    <div>
                        <label htmlFor="title_trabajo">Titulo del trabajo</label>
                        <Field name="title_trabajo" type="text" />
                        <ErrorMessage name="title_trabajo" component="div" style={{ color: "red" }} />
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

                    <FieldArray
                        name="tags"
                        render={arrayHelpers => (
                            <div>
                                {tags.map((item, index) => (
                                    <div key={index}>
                                        <label>
                                            <Field
                                                type="checkbox"
                                                name="tags"
                                                value={item.id}
                                                checked={
                                                    arrayHelpers.form.values.tags.some(
                                                        (tag: string) => tag === item.id
                                                    )
                                                }
                                                onChange={e => {
                                                    if (e.target.checked) {
                                                        arrayHelpers.push(item.id);
                                                    } else {
                                                        const idx = arrayHelpers.form.values.tags.indexOf(item.id);
                                                        if (idx !== -1) arrayHelpers.remove(idx);
                                                    }
                                                }}
                                            />
                                            {item.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    />

                    <div>
                        <label htmlFor="event_name">Evento</label>
                        <Field name="event_name" type="text" />
                        <ErrorMessage name="event_name" component="div" style={{ color: "red" }} />
                    </div>

                    <div>
                        <label htmlFor="colaborators">Nro de Colaboradores</label>
                        <Field name="colaborators" type="text" />
                        <ErrorMessage name="colaborators" component="div" style={{ color: "red" }} />
                    </div>


                     <div>
                        <label htmlFor="date">fecha</label>
                        <Field name="date" type="date" />
                        <ErrorMessage name="date" component="div" style={{ color: "red" }} />
                    </div>

                    <div>
                        <button type="submit" disabled={isSubmitting}>
                            {isEditMode ? "Update" : "Add"}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};
