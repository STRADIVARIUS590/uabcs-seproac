import {useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { Api } from '../../services/Api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
 
// Define TypeScript interface for form values
// interface FormValues {
//   name: string;
//   email: string;
//   password: string;
//   id: string| number;
//   role_id: number;
// }

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required('El nombre es requerido'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
            .min(5, 'la contraseña debe tener minio 5 caracteres')
            .max(10, 'la contraseña debe maximo 10 caracteres')
            .required('La contraseña es requerida'),
  password_confirmation: Yup.string()
            .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'). required('la confirmacion de contraseña es requirida')

});

const AddEditForm = () => {

 const { id } = useParams<{ id?: string }>(); // Grab the id from the URL, optional

  const navigate = useNavigate();

  const [user, setUser] = useState({
    'name': '',
    'email': '',
    'password': '',
    'id' : id || 0,
    // 'role_id' : 0
  })

  const [isLoading, setIsLoading] = useState(true);

  const { token } = useSelector((state: RootState) => state.auth)

  const loadUser = async () => {

        if(id){

            const response = await Api.get('/users/get/' + id, {
                Authorization: 'Bearer ' + token,
                accept: 'application/json'
            })
            
            const result = await response.data
            
            setUser(result);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        loadUser();
      }, []);


const initialValues = {
    'name': user?.name??'' ,
    'email': user?.email?? '',
    'password' : '',
    'id' : user?.id ?? '0'  ,
    // 'role_id' : user?.role_id ?? 0,
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

  if(isLoading) return <p>Loading</p>

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
              
              <div>
                <label htmlFor="password">Contraseña</label>
                <Field name="password" type="password"/>
                <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
              </div>

              <div>
                <label htmlFor="password_confirmation">Confirma Contraseña</label>
                <Field name="password_confirmation" type="confirmation"/>
                <ErrorMessage name="password_confirmation" component="div" style={{ color: 'red' }} />
              </div>
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
