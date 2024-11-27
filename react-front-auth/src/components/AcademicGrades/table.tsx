import { useSelector } from "react-redux";
import { Api } from "../../services/Api";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MessageToast } from "../MessageToast";

interface Props {
    academic_grades : {
        id: string | number;
        name: string,
        titulation_date : string | number;
        institution : {
            id: string | number;
            name: string | number;

        }
        user : {
            id: string | number;
            name: string | number;
        }
    }[]
}

export const AcademicGrades = ({academic_grades} : Props) => {

    const navigate = useNavigate();

    const { token } = useSelector((state: RootState) => state.auth);

    const [ error, setError ] = useState<boolean>(false);
    
    const [ data, setData ] = useState(academic_grades);
  
    // const [loading ]= useState<boolean>(false);

    const deleteAcademicGrade = async ( id : number | string ) => {
        // setLoading(true);
        const response = Api.delete('/academic-grades/' + id, {
            Authorization: 'Bearer ' + token,
            accept: 'application/json'       
        })

        const result = await response;

          if(result.statusCode == 200) {
                setData((prevTags) => prevTags.filter((tag) => tag.id !== id));
            }else {
                setError(true)
            }
        }
        // setLoading(false);

    if(error){ return <div className="mt-12">  <MessageToast message='Ha ocurrido un error' type="error"/> </div>}   
    
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

            <h1 >Grados Academicos</h1>
            <table className="text-center w-full text-sm text-left rtl:text-right font-small text-gray-900 dark:text-gray-400">
                <thead>
                    <tr>
                        <th scope="col" className="px-6 py-3"> #</th>
                        <th scope="col" className="px-6 py-3"> Nombre</th>
                        <th scope="col" className="px-6 py-3"> Usuario </th>
                        <th scope="col" className="px-6 py-3"> Institution </th>
                        <th scope="col" className="px-6 py-3"> Fecha de Titulacion </th>
                        <th scope="col" className="px-6 py-3"> Acciones </th>
                    </tr>
                </thead>
                    <tbody>

                    {data.map((item) => (
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={item.id}>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.id}</th>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.name}</th>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.user?.name}</th>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.institution?.name }</th>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.titulation_date}</th>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <button onClick={() => deleteAcademicGrade(item.id)}> Eliminar</button>
                            <button onClick={() => navigate('/academic-grades/edit/' + item.id)}>Editar</button>
                        </th>
                    </tr>
                    ))} 
                </tbody>
            </table>     
        </div>
    ) 
}