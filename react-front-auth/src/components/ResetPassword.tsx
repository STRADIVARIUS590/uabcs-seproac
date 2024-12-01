import { Formik } from "formik";
import * as Yup from "yup";
import InputLabel from "./inputs/InputLabel";
import Button from "./Buttons/Button";
import { Link } from "react-router-dom"
import axios from 'axios'; 

const ResetPassword = () => {
    const initialValues = {
        'email': '',
    }
    
    const onSubmit = (values: typeof initialValues) => {
        axios.post('http://localhost:8000/api/password/send-token', { email: values.email })
            .then((response) => {
                console.log('Correo de restablecimiento enviado', response);
            })
            .catch((error) => {
                console.error('Error al enviar el correo de restablecimiento', error);
            });
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Correo no válido').required('Requerido'),
    });

    return (
        <div className="w-full h-screen bg-left-top-radial flex justify-center flex-col content-center items-center">
            <div className="w-full my-auto flex flex-col items-center content-center">
                <img src="./logohd-gm.png" alt="Logo" className="w-[325px] h-auto" />
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    {({
                        handleSubmit,
                        handleChange,
                        values,
                        errors,
                    }) => (
                        <form onSubmit={handleSubmit} className="font-sans text-violet-50 flex flex-col w-full p-4 space-y-2 md:p-24 md:w-3/4 xl:w-1/3 rounded-xl md:shadow-2xl md:ring-4 m-4 mb-auto space-y-6">
                            <InputLabel
                                label="Correo electrónico"
                                name="email"
                                type="email"
                                error={errors.email}
                                value={values.email}
                                onChange={handleChange}
                            />

                            <Button
                                value="Enviar Código"
                                type="submit"
                                className="rounded-full bg-vi-50 text-vi-900 font-bold py-2 px-4 hover:bg-vi-100 hover:text-vi-900 w-full mx-auto"
                            />

                            <Link to="/login" className="text-left text-xs opacity-85 hover:opacity-100 mt-4 flex justify-center">
                                Regresar al login
                            </Link>

                        </form>
                    )}
                </Formik>

            </div>
            <footer className="bg-vi-50 h-1/6 w-full rounded-t-[70px] flex justify-center items-center">
                <img src="./dasclogo.png" alt="Logo Footer" className="h-24" />
            </footer>
        </div>
    );
}

export default ResetPassword;
