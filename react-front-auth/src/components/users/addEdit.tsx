import { useEffect } from "react"
import { Api } from "../../services/Api"
import { Formik } from "formik"
export const UserAddEdit = () => {

    const initialValues = {
        name : '',
        email : '',
        date_ingreso : '',
        birth_date : '',
        sex : '',
        role_id : 0
    }


    async function createUser(data, setSubmiting)
    {
        const response = Api.post('/api/users', data)

        const result = await response;

        console.log(result);
        
    }

    return <div>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({
            // handleSubmit,
            // handleChange,
            // errors,
            // values
        }) => (

            useEffect(() => {})

            <form onSubmit={handleSubmit}>

            </form>
            
            )}</Formik>
    </div>

}