import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Api } from "../../services/Api";
import { ErrorMessage, Field, FieldArray, Form, Formik, FormikHelpers } from "formik";
import { MessageToast } from "../MessageToast";
import { DefaultColumn, DefaultInput } from "../inputs/Forms";
import { TagItem } from "../Users/AddEditForm";

interface PublicationItem {
    id: string;
    title: string | undefined;
    user_id: string | undefined;
    type: string | undefined;
    issn_isbn: string | undefined;
    doi: string | undefined;
    magazine_name: string | undefined;
    authors: string | undefined;
    publication_date: string | undefined;
    period: string | undefined;
    user: {
        name: string | undefined
    },
    tags: TagItem[]
}

interface UserItem {
    name: string;
    id: string;
}

export const AddEditForm = () => {

    // MIDDLEWARE
    const { token, user } = useSelector((state: RootState) => state.auth);
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const user_permissions: string[] = user?.all_permissions || [];

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
    const [tags, setTags] = useState<TagItem[]>([]);

    const loadData = async () => {
        if (id) {
            const response = await Api.get("/publications/get/" + id + "?include=user,tags", {
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

        const response_tags = await Api.get('/tags', {
            Authorization: "Bearer " + token,
            accept: "application/json",
        });

        const result_tags = await response_tags.data;
        setTags(result_tags);

        setLoading(false);

        setError(false);
    };

    useEffect(() => {
        loadData();
        // loadUsers();
    }, [id]);


    const initialValues = {
        id: data?.id || 0,
        title: data?.title || "",
        user_id: data?.user_id || 1,
        type: data?.type || "",
        issn_isbn: data?.issn_isbn || "",
        doi: data?.doi || "",
        magazine_name: data?.magazine_name || "",
        authors: data?.authors || "",
        publication_date: data?.publication_date || "",
        period: data?.period || "",
        tags: data?.tags?.map(tag => tag.id) || [],
        user: {
            name: data?.user?.name || "",
        }
    }

    const isEditMode = !!id

    // HANDLE
    const handleSubmit = async (values: typeof initialValues, { setFieldError }: FormikHelpers<typeof initialValues>) => {

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

    if (error) { return <div className="mt-12"> <MessageToast message='Ha ocurrido un error' type="error" /></div> }
    if (loading) { return <div className="mt-12"> <MessageToast message='Cargando...' type="loading" /></div> }

    return (<Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
    >
        {({
            isSubmitting
        }) => (

            <Form>
                <input type="hidden" name="id" />

                <section className="py-12 bg-gray-100 dark:bg-gray-800">
                    <div className="container mx-auto">
                        <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-8 text-center">
                            {isEditMode ? 'Editar Publicación' : 'Agregar Publicación'}
                        </h1>
                        <div className="bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 md:p-8">
                            <div className="flex flex-wrap -mx-4">
                                {/* Primera columna */}
                                <DefaultColumn>
                                    <DefaultInput
                                        name="title"
                                        label="Título"


                                    />
                                    <DefaultInput
                                        name="doi"
                                        label="DOI"


                                    />
                                    <DefaultInput
                                        name="type"
                                        label="Tipo"


                                    />
                                    <DefaultInput
                                        name="issn_isbn"
                                        label="ISSN / ISBN"


                                    />
                                    <DefaultInput
                                        name="magazine_name"
                                        label="Revista"


                                    />
                                </DefaultColumn>

                                {/* Segunda columna */}
                                <DefaultColumn>
                                    <DefaultInput
                                        name="authors"
                                        label="Autores"


                                    />
                                    <DefaultInput
                                        name="publication_date"
                                        type="date"
                                        label="Fecha de publicación"


                                    />
                                    <DefaultInput
                                        name="period"
                                        label="Periodo"


                                    />

                                    {/* Selector de Usuario */}
                                    <div >
                                        <label
                                            htmlFor="user_id"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                        >
                                            Usuario
                                        </label>
                                        <Field
                                            as="select"
                                            name="user_id"
                                            className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 shadow-sm focus:ring-2 focus:ring-primary focus:border-primary"
                                        >
                                            {users.map((user) => (
                                                <option key={user.id} value={user.id}>
                                                    {user.name}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage
                                            name="user_id"
                                            component="div"
                                            className="text-red-500 text-sm mt-1"
                                        />
                                    </div>
                                </DefaultColumn>

                                {/* Tercera columna para etiquetas */}
                                <DefaultColumn>
                                    <FieldArray
                                        name="tags"
                                        render={(arrayHelpers) => (
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Etiquetas
                                                </h3>
                                                {tags.map((item, index) => (
                                                    <div key={index} className="flex items-center mb-2">
                                                        <Field
                                                            type="checkbox"
                                                            name="tags"
                                                            value={item.id}
                                                            className="w-4 h-4 text-primary border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary"
                                                            checked={arrayHelpers.form.values.tags.some(
                                                                (tag: string) => tag === item.id
                                                            )}
                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                if (e.target.checked) {
                                                                    arrayHelpers.push(item.id);
                                                                } else {
                                                                    const idx = arrayHelpers.form.values.tags.indexOf(
                                                                        item.id
                                                                    );
                                                                    if (idx !== -1) arrayHelpers.remove(idx);
                                                                }
                                                            }}
                                                        />
                                                        <label className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                                            {item.name}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    />
                                </DefaultColumn>
                            </div>

                            {/* Botón de acción */}
                            <div className="mt-6 text-right">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
                                >
                                    {isEditMode ? 'Actualizar' : 'Agregar'}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </Form>



        )}
    </Formik>)
}
