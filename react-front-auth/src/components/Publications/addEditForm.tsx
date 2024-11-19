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
        magazine_name : string | undefined;
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
        const [tags, setTags ] = useState<TagItem[]>([]);
        
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
        };

        useEffect(() => {
            loadData();
            // loadUsers();
        }, [id]);


        const initialValues  = {
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
            tags: data?.tags?.map(tag => tag.id) || [],
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
                <input type="hidden"  name='id'/>
                
                <section className="py-12 dark:bg-dark">
                
                <div className="container">
                    <div className="-mx-4 flex flex-wrap">
                        <DefaultColumn>
                            <DefaultInput name='title' label='Titulo'/>
                            <DefaultInput name='doi' label='DOI'/>
                            <DefaultInput name='type' label='tipo'/>
                            <DefaultInput name='issn_isbn' label='ISSN / ISBN'/>
                            <DefaultInput name='magazine_name' label='Revista'/>
                        </DefaultColumn>

                        <DefaultColumn>
                            <DefaultInput name="authors" label="Autores"/>
                            <DefaultInput name='publication_date' type="date" label='Fecha de publicacion'/>
                            <DefaultInput name='period' label='Periodo'/>

                        <div>
                            <label htmlFor="user_id" className="mb-[10px] block text-base font-medium text-dark dark:text-white">Usuario</label>
                                <Field as="select" name="user_id" className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2">
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </Field>
                            <ErrorMessage name="user_id" component="div" className="text-red-500"  />
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
                            </DefaultColumn>    
                    </div>
                </div>
                </section>
                    
                    <div>
                            <button className="bg-red-800" type="submit" disabled={isSubmitting}>
                                {isEditMode ? "Update" : "Add"}
                            </button>
                    </div> 
                </Form>
            )}
        </Formik>)
    }