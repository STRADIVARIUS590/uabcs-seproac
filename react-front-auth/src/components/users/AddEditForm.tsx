import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Define TypeScript interface for form values
interface FormValues {
  name: string;
  email: string;
  password: string;
  id: string| number;
  // role_id: number;
}


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

interface AddEditFormProps {
  initialValues: FormValues;
  onSubmit: (values: FormValues) => void;
  isEditMode: boolean;

}

const AddEditForm: React.FC<AddEditFormProps> = ({ initialValues, onSubmit, isEditMode }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        onSubmit(values);
      }}
    >
      {({
          isSubmitting,
        
        }) => (
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

          {
              
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
          }

          
  

          <div>
            <button type="submit" disabled={isSubmitting}>
              {isEditMode ? 'Update' : 'Add'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddEditForm;
