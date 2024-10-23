import { useEffect, useState } from "react"
import { Form, useParams } from "react-router-dom"
import { Api } from "../services/Api"
import { useSelector } from "react-redux"
import { RootState } from "../store"
import { Formik } from "formik"
import InputLabel from "./inputs/InputLabel"
import Button from "./Buttons/Button"

export const EditUser = () => {


    const { token } = useSelector((state: RootState) => state.auth)

    const initialValues = {
        'name' : '',
        'email' : '',
        'date_ingreso' : '',
        'birth_date' : '',
        'sex' : '',
        'role_id' : 0
    }

    const [user, setUser] = useState(initialValues)
    const [roles, setRoles] = useState([]);


    const { id } = useParams()

    const loadUser = async () => {
        const response = await Api.get('/users/get/' + id, {
            Authorization: 'Bearer ' + token,
            accept: 'application/json'
        })

        const result = await response.data

        setUser(result.user);
    }

    const loadRoles = async () => {
        const response = await Api.get('/roles', {
            Authorization: 'Bearer ' + token,
            accept: 'application/json'
        })

        const result = await response.data;
        
        setRoles(response.data)
    }

    const onSubmit = async (values: typeof initialValues) => {
            const response = await Api.put('/users/', values, {
                    Authorization: 'Bearer ' + token,
                    accept: 'application/json'
            })

            const result = await response.data

            console.error('qeqwe'  + response);
        
    }

    useEffect(() => {
        loadUser();
        loadRoles();
    }, []);

    function formatDate(date: string) {
    const d=  new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(d.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}



    const { name, email, date_ingreso, birth_date, role_id } = user;

    const onInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        
        setUser({...user, [e.target.name] : e.target.value})
        console.log(user);
        
    }


    return <div>

    <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({
            handleSubmit,
            errors,
            // values
        }) => (
            <form onSubmit={handleSubmit}>
                <InputLabel
                    label="Nombre"
                    name="name"
                    error={errors.name}
                    value={name}
                    onChange={onInputChange}
                    />
                 <InputLabel
                    label="Correo"
                    name="email"
                    error={errors.email}
                    value={email}
                    onChange={onInputChange}
                    />
                 <InputLabel
                    label="Nombre"
                    name="date_ingreso"
                    type="date"
                    error={errors.date_ingreso}
                    value={formatDate(date_ingreso)}
                    onChange={onInputChange}
                   />
                 <InputLabel
                    label="Fecha de nacimiento"
                    name="birth_date"
                    type="date"
                    error={errors.birth_date}
                    value={formatDate(birth_date)}
                    onChange={onInputChange}
                    />
                    <select name="role" onChange={(e) => onInputChange(e)}>
                    {roles.map((role) => (
                        <option key={role.id} value={role.id} selected={role.id === role_id}>
                        {role.name}
                        </option>
                    ))}

    
                    </select>
                    <Button value="Enviar!" type="submit"/>

            </form>
        )}
    </Formik>
    </div>

    
}

export default EditUser