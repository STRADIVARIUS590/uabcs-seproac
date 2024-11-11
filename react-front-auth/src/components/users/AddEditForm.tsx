import {useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { Api } from '../../services/Api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
interface RoleItem {
  id: string; 
  name: string;
}
interface UserItem {
  id: number;   
  name: string;
  email: string;
  password: string;
  date_ingreso: string;
  birth_date: string;
  role_id : string;
  sex: string;
    role: RoleItem
  // Add more fields as necessary
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
  //      'Selecciona una fecha valida'),
      //  .required('La fecha de nacimiento es requerida'),
    
  // role_id: 

});

const AddEditForm = () => {

 const { id } = useParams<{ id?: string }>(); // Grab the id from the URL, optional

  const navigate = useNavigate();

  const [user, setData] = useState<UserItem>()

  const [roles, setRoles] = useState<RoleItem[]>([]);

  const [loading, setLoading] = useState(true);
  
  const [error, setError] = useState(true);

  const { token } = useSelector((state: RootState) => state.auth)

  const loadData = async () => {
        try { 

        
        if(id){

            const response = await Api.get('/users/get/' + id, {
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

        setLoading(false);

        } catch(error) {
          setError(true);
          setLoading(false)
        }
    }

    useEffect(() => {
        loadData();
      }, [id]);


const initialValues = {
    name: user?.name ?? '' ,
    email: user?.email?? '',
    password : '',
    id : user?.id ?? '0',
    role_id : user?.role_id ?? 0,
    date_ingreso: user?.date_ingreso ?? '',
    birth_date: user?.birth_date ?? '',
    sex : user?.sex ?? '',
    role: {
        id: user?.role_id ?? '',
        name: user?.role?.name ?? ''
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
          navigate('/users'); // Redirect after submission;
        }else{
        Object.entries(response.data).forEach((key) => {        
        setFieldError(key[0], key[1][0])
      })
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
        Object.entries(response.data).forEach((key) => { })
      }
    }
  };

  if(loading) return <p>Loading</p>

  return (
      <div> 
        <h1>{isEditMode ? 'Edit User' : 'Add User'}</h1> 
    <Formik 
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit} 
    >
      {({ isSubmitting }) => (
        <Form>
          <input type="hidden"  name='id'/>
          <div>
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" />
            <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
          </div>

              
          <div>
            <label htmlFor="password">Contraseña</label>
            <Field name="password" type="password"/>
            <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
          </div>

          <div>
            <label htmlFor="password_confirmation">Confirma Contraseña</label>
            <Field name="password_confirmation" type="password"/>
            <ErrorMessage name="password_confirmation" component="div" style={{ color: 'red' }} />
          </div>

          <div>
            <label htmlFor="date_ingreso">Facha de ingreso</label>
            <Field name="date_ingreso" type="date" />
            <ErrorMessage name="date_ingreso" component="div" style={{ color: 'red' }} />
          </div>

          <div>
            <label htmlFor="birth_date">Fecha de nacimiento</label>
            <Field name="birth_date" type="date" />
            <ErrorMessage name="birth_date" component="div" style={{ color: 'red' }} />
          </div>


          <div>
              <label htmlFor="role_id">Rol</label>
              <Field as="select" name="role_id">
                  {roles.map((role) => (
                      <option key={role.id} value={role.id} selected={initialValues.role_id == role.id}>
                          {role.name}
                      </option>
                  ))}
              </Field>
              <ErrorMessage name="user_id" component="div" style={{ color: 'red' }} />
          </div>
  

          <div>
            <button type="submit" disabled={isSubmitting}>
              {isEditMode ? 'Update' : 'Add'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
      </div>
);
};

export default AddEditForm;
