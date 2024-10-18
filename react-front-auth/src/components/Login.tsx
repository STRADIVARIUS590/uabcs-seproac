import { Formik } from "formik"
import { Api } from "../services/Api"
import * as Yup from "yup"
import InputLabel from "./inputs/InputLabel"
import Button from "./Buttons/Button"
import { useAppDispatch, RootState } from "../store"
import { loginUser } from "../store/authSlice"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import Swal from "sweetalert2"
const Login = () => {
    
    const dispatch = useAppDispatch();

    const navigate  = useNavigate();

    const  { isLogged } = useSelector((state: RootState ) => state.auth);

    const initialValues = {
        'email': '',
        'password': '',
    }

    const onSubmit = (values: typeof initialValues) => {
        dispatch(loginUser(values)).then((response) => {
            console.log(response.type);

            if(response.type == 'auth/loginUser'){
                navigate('/dashboard');
            }else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Do you want to continue',
                    icon: 'error',
                    confirmButtonText: 'Cool'
})
            }
        })

        // Api.post('/users/login', values).then((response) => {
        //     console.log(response)
        // });
    }

    const validationSchema = Yup.object({
        email: Yup.string().required('Requerido'),
        password: Yup.string().required('Requerido'),
    })

    return (
        <div>
            <h1>Login</h1>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        errors,

                    }) => (
                        <form onSubmit={handleSubmit}>
                            <InputLabel 
                                label="Correo"
                                name="email"
                                error={errors.email}
                                value={values.email}
                                onChange={handleChange}
                            />

                            <InputLabel 
                                label="Contraseña" 
                                name="password"
                                error={errors.password} 
                                value={values.password}
                                onChange={handleChange}
                            />
                            <Button value="Enviar" type="submit"/>
                        </form>
                    )}
            </Formik>
                           
        </div>
    )
}

export default Login 