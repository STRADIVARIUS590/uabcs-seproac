import { Formik } from "formik"
// import { Api } from "../services/Api"
import * as Yup from "yup"
import InputLabel from "./inputs/InputLabel"
import Button from "./Buttons/Button"
import { useAppDispatch } from "../store"
import { loginUser } from "../store/authSlice"
// import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
// import { useEffect } from "react"
// import Swal from "sweetalert2"
const Login = () => {

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

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

            if (response.type == 'auth/loginUser/fulfilled') {
                navigate('/dashboard');
            } else {
                // console.log('si esto sale no funciona')
                navigate('/dashboard');

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
        <div className="w-full h-screen bg-left-top-radial flex justify-center flex-col content-center items-center">
            <div className="w-full my-auto flex flex-col items-center content-center">
                <img src="./logohd-gm.png" alt="" className="w-[325px] h-auto" />
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>

                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        errors,

                    }) => (
                        <form onSubmit={handleSubmit} className=" font-sans text-violet-50 flex flex-col w-full p-4 space-y-2 md:p-24 md:w-3/4 xl:w-1/3  rounded-xl md:shadow-2xl md:ring-4 m-4 mb-auto ">
                            <InputLabel
                                label="Correo electrónico"
                                name="email"
                                type="email"
                                error={errors.email}
                                value={values.email}
                                onChange={handleChange}
                            />
                            <InputLabel
                                label="Contraseña"
                                name="password"
                                type="password"
                                error={errors.password}
                                value={values.password}
                                onChange={handleChange}
                            />
                            <Link to="/reset-password" className="text-left text-xs opacity-85 hover:opacity-100">
                                ¿Olvidaste tu contraseña? Ni modo.
                            </Link>

                            <Button value="Entrar" type="submit" className="rounded-full bg-vi-50 text-vi-900 font-bold py-2 px-4 hover:bg-vi-100 hover:text-vi-800 w-full md:w-1/2 mx-auto" />

                        </form>
                    )}
                </Formik>
            </div>
            <footer className="bg-vi-50 h-1/6 w-full rounded-t-[70px] flex justify-center items-center">
                <img src="./dasclogo.png" alt="" className="h-24" />
            </footer>
        </div>
    )
}

export default Login
