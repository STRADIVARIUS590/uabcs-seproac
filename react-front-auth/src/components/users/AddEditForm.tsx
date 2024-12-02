import { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { Api } from '../../services/Api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { DefaultInput, EmailInput } from '../inputs/Forms';
import { MessageToast } from '../MessageToast';
interface RoleItem {
    id: string;
    name: string;
}
export interface UserItem {
    id: number;
    name: string;
    email: string;
    password: string;
    date_ingreso: string;
    birth_date: string;
    role_id: string;
    sex: string;
    role: RoleItem;
    tags: { id: number, name: string }[];
}

export interface TagItem {
    id: string;
    name: string;
}
// Validation schema using Yup
const validationSchema = Yup.object({
    name: Yup.string().required('El nombre es requerido'),
    email: Yup.string().email('Direccion de correo inválida').required('El correo es requerido'),
    password: Yup.string()
        .min(5, 'la contraseña debe tener minimo 5 caracteres')
        // .max(10, 'la contraseña debe maximo 10 caracteres')
        .required('La contraseña es requerida'),
    password_confirmation: Yup.string()
        .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden').required('la confirmación de contraseña es requerida'),

    // date_ingreso: Yup.date().max(
    //     (new Date()).setHours(0,0,0,0),
    //      'Selecciona una fecha valida'),
    //     //  .required('La fecha de ingreso es requerida'),

    // birth_date: Yup.date().max(
    //     ((new Date()).setHours(0,0,0,0)),
    //      'Selecciona una fecha valida')
    //      .required('La fecha de nacimiento es requerida'),

    // role_id:

});

export const AddEditForm = () => {

    const { id } = useParams<{ id?: string }>(); // Grab the id from the URL, optional

    const navigate = useNavigate();

    const [user, setData] = useState<UserItem>()

    const [roles, setRoles] = useState<RoleItem[]>([]);

    const [loading, setLoading] = useState(true);

    const [tags, setTags] = useState<TagItem[]>([]);

    const [error, setError] = useState(false);

    const { token } = useSelector((state: RootState) => state.auth)

    const loadData = async () => {
        try {


            if (id) {

                const response = await Api.get('/users/get/' + id + '?include=tags', {
                    Authorization: 'Bearer ' + token,
                    accept: 'application/json'
                })

                const result: UserItem = await response.data


                setData(result);
            }

            const response_roles = await Api.get('/roles', {
                Authorization: "Bearer " + token,
                accept: "application/json",
            });
            const result_roles: RoleItem[] = await response_roles.data;
            setRoles(result_roles);


            const response_tags = await Api.get('/tags', {
                Authorization: "Bearer " + token,
                accept: "application/json",
            });

            const result_tags = await response_tags.data;
            setTags(result_tags);

            setLoading(false);

        } catch (error) {
            setError(true);
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData();
    }, [id]);


    const initialValues = {
        id: user?.id || 0,
        name: user?.name || '',
        email: user?.email || '',
        password: user?.password || '',
        role_id: user?.role_id,
        date_ingreso: user?.date_ingreso || '',
        birth_date: user?.birth_date || '',
        sex: user?.sex || '',
        tags: user?.tags?.map(tag => tag.id) || [],
        role: {
            id: user?.role_id,
            name: user?.role?.name
        }
    };

    const isEditMode = !!id; // True if we are editing

    // Submit handler
    const handleSubmit = async (values: typeof initialValues, { setFieldError }: FormikHelpers<typeof initialValues>) => {

        if (isEditMode) {
            const response = await Api.put('/users/' + id, values, {
                Authorization: 'Bearer ' + token,
                "Content-Type": 'application/json',
                accept: 'application/json'
            }
            );

            if (response.statusCode == 200) {
                navigate(0); // Redirect after submission;
            } else {
                const errors = response.data as { [key: string]: string[] };
                Object.entries(errors).forEach(([field, messages]) => {
                    setFieldError(field, messages[0]);
                });
            }

        } else {
            const response = await Api.post('/users', values, {
                Authorization: 'Bearer ' + token,
                "Content-Type": 'application/json',
                accept: 'application/json'

            });

            if (response.statusCode == 200) {
                navigate('/users'); // Redirect after submission;
            } else {
                Object.entries(response.data).forEach((key) => {
                    console.log(key);
                });
            }
        }
    };

    if (error) { return <div className="mt-12"> <MessageToast message='Ha ocurrido un error' type="error" /></div> }
    if (loading) { return <div className="mt-12"> <MessageToast message='Cargando...' type="loading" /></div> }


    return (<div> <h1>{isEditMode ? 'Editar usuario' : 'Agregar usuario'}</h1>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <input type="hidden" name='id' />
                    <section className="py-12 bg-gray-50 dark:bg-dark">
                        <div className="container mx-auto max-w-4xl p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold text-center text-gray-700 dark:text-white mb-6">Formulario</h2>
                            <div className="flex flex-wrap -mx-4">
                                {/* Columna 1 */}
                                <div className="w-full md:w-1/2 px-4 mb-6">
                                    <DefaultInput
                                        name="name"
                                        label="Nombre"
                                    />
                                    <EmailInput
                                        name="email"
                                        label="Correo Electrónico"
                                        placeholder="test@uabcs.mx"
                                    />
                                </div>

                                {/* Columna 2 */}
                                <div className="w-full md:w-1/2 px-4 mb-6">
                                    <DefaultInput
                                        type="date"
                                        name="date_ingreso"
                                        label="Fecha de ingreso"
                                    />
                                    <DefaultInput
                                        type="date"
                                        name="birth_date"
                                        label="Fecha de nacimiento"
                                    />
                                </div>

                                {/* Columna 3 */}
                                <div className="w-full md:w-1/2 px-4 mb-6">
                                    <DefaultInput
                                        type="password"
                                        name="password"
                                        label="Contraseña"
                                    />
                                    <DefaultInput
                                        type="password"
                                        name="password_confirmation"
                                        label="Confirma tu contraseña"
                                    />
                                </div>

                                {/* Selección de Rol */}
                                <div className="w-full px-4 mb-6">
                                    <label
                                        htmlFor="role_id"
                                        className="block text-sm font-medium text-gray-700 dark:text-white mb-2"
                                    >
                                        Rol
                                    </label>
                                    <Field
                                        as="select"
                                        name="role_id"
                                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:border-primary"
                                    >
                                        {roles.map((role) => (
                                            <option key={role.id} value={role.id}>
                                                {role.name}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage
                                        name="role_id"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                {/* Etiquetas */}
                                <div className="w-full px-4 mb-6">
                                    <h3 className="text-sm font-medium text-gray-700 dark:text-white mb-2">
                                        Etiquetas
                                    </h3>
                                    <FieldArray
                                        name="tags"
                                        render={(arrayHelpers) => (
                                            <div className="flex flex-wrap gap-4">
                                                {tags.map((item, index) => (
                                                    <label key={index} className="flex items-center space-x-2">
                                                        <Field
                                                            type="checkbox"
                                                            name="tags"
                                                            value={item.id}
                                                            className="w-4 h-4 text-primary border-gray-300 dark:border-gray-700 rounded focus:ring-2 focus:ring-primary"
                                                            checked={arrayHelpers.form.values.tags.includes(item.id)}
                                                            onChange={(e: any) => {
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
                                                        <span className="text-sm text-gray-700 dark:text-white">
                                                            {item.name}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="mt-6 text-right">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200">
                                    {isEditMode ? 'Editar' : 'Guardar'}
                                </button>
                            </div>
                        </div>
                    </section>
                    {/* <div>
            <button type="submit" disabled={isSubmitting}>
              {isEditMode ? 'Editar' : 'Guardar '}
            </button>
          </div> */}
                </Form>
            )}
        </Formik>
    </div>
    );
};
