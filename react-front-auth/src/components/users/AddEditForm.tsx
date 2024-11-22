import {useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { Api } from '../../services/Api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { DefaultColumn, DefaultInput, EmailInput } from '../inputs/Forms';
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
  role_id : string;
  sex: string;
  role: RoleItem;
  tags: { id: number, name: string}[];
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
            .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'). required('la confirmación de contraseña es requerida'),

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

const AddEditForm = () => {

 const { id } = useParams<{ id?: string }>(); // Grab the id from the URL, optional

  const navigate = useNavigate();

  const [user, setData] = useState<UserItem>()

  const [roles, setRoles] = useState<RoleItem[]>([]);

  const [loading, setLoading] = useState(true);
  
  const [tags, setTags ] = useState<TagItem[]>([]);

  const [error, setError] = useState(false);

  const { token } = useSelector((state: RootState) => state.auth)

  const loadData = async () => {
        try { 

        
        if(id){

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

        } catch(error) {
          setError(true);
          setLoading(false)
        }
    }

    useEffect(() => {
        loadData();
      }, [id]);


const initialValues  = {
    id: user?.id || 0,
    name: user?.name ||  '' ,
    email: user?.email || '',
    password : user?.password || '',
    role_id : user?.role_id,
    date_ingreso: user?.date_ingreso || '',
    birth_date: user?.birth_date || '',
    sex : user?.sex || '',
    tags: user?.tags?.map(tag => tag.id) || [],
    role: {
        id: user?.role_id,
        name: user?.role?.name
    }
  };

  const isEditMode = !!id; // True if we are editing

  // Submit handler
  const handleSubmit = async (values: typeof initialValues,  { setFieldError } : FormikHelpers< typeof initialValues > ) => {
    
    if (isEditMode) {    
      const response = await Api.put('/users/' + id, values,  {
              Authorization: 'Bearer ' + token,
              "Content-Type": 'application/json',
              accept: 'application/json'
            }
        );

        if(response.statusCode == 200){
          navigate(0); // Redirect after submission;
        }else{
          const errors = response.data as { [key: string]: string[] };
            Object.entries(errors).forEach(([field, messages]) => {
                setFieldError(field, messages[0]);
          });    
      }

    }else {
      const response = await Api.post('/users', values, {
          Authorization: 'Bearer ' + token,
          "Content-Type": 'application/json',
          accept: 'application/json'
         
      });

      if(response.statusCode == 200){
        navigate('/users'); // Redirect after submission;
      }else{
        Object.entries(response.data).forEach((key) => { console.log(key);
         });
      }
    }
  };
  
  if(error){       return <MessageToast message='Ha ocurrido un error' type="error"/>}
  if(loading){     return <MessageToast message='Cargando...' type="loading"/> }



  return ( <div> <h1>{isEditMode ? 'Editar usuario' : 'Agregar usuario'}</h1> 
    <Formik 
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit} 
    >
      {({ isSubmitting }) => (
        <Form>
          <input type="hidden"  name='id'/>
            <section className="py-12 dark:bg-dark">
              <div className="container">
                <div className="-mx-4 flex flex-wrap">
                      <DefaultColumn>
                        <DefaultInput name='name' label='Nombre'/>
                        <EmailInput name='email' label='Correo Electronico' placeholder='test@uabcs.mx'/>
                      </DefaultColumn>
                      
                      <DefaultColumn>
                        <DefaultInput type='date' name='date_ingreso' label='Fecha de ingreso'/>
                        <DefaultInput type='date' name='birth_date' label='Fecha de nacimiento'/>
                      </DefaultColumn>


                      <DefaultColumn>
                        <DefaultInput type='password' name='password' label='Contraseña'/>
                        <DefaultInput type='password' name='password_confirmation' label='Conforma tu contraseña'/>
                      </DefaultColumn>

                      {/* <DefaultColumn> */}
                        <label htmlFor="role_id" className='mb-[10px] block text-base font-medium text-dark dark:text-white'>Rol</label>
                        <Field as="select" name="role_id" className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2">
                          {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                              {role.name}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage name="role_id" component="div" className="text-red-500"/>
                      {/* </Default Column>   */}

                </div>
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
                                                onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
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

      </section>
          <div>
            <button type="submit" disabled={isSubmitting}>
              {isEditMode ? 'Editar' : 'Guardar '}
            </button>
          </div>
        </Form>
      )}
    </Formik>
      </div>
);
};

export default AddEditForm;
