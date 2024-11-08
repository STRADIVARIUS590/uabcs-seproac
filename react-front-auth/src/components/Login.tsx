import { Formik } from "formik"
// import { Api } from "../services/Api"
import * as Yup from "yup"
import InputLabel from "./inputs/InputLabel"
import Button from "./Buttons/Button"
import { useAppDispatch } from "../store"
import { loginUser } from "../store/authSlice"
// import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
// import { useEffect } from "react"
// import Swal from "sweetalert2"
const Login = () => {
    
    const dispatch = useAppDispatch();

    const navigate  = useNavigate();

    // const  { isLogged } = useSelector((state: RootState ) => state.auth);

    // if(isLogged) {
    //     navigate('/dashboard');
    // }

    const initialValues = {
        'email': 'sistemas@gmail.com',
        'password': 'secret',
    }



    const onSubmit = (values: typeof initialValues) => {
        dispatch(loginUser(values)).then((response) => {
            console.log(response);

            if(response.type == 'auth/loginUser/fulfilled'){
                navigate('/dashboard');
            }else{
              
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