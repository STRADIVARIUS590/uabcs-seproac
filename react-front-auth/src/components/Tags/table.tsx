import { useNavigate } from "react-router-dom";
import { Api } from "../../services/Api";
import { useEffect, useState } from "react";
import { MessageToast } from "../MessageToast";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { AddEdit } from "./addEdit";

interface Props {
    tags : { id : string | number ; name : string, slug: string }[]
}

export const Tags = ({tags} : Props) => {
   
    
    const  { token, user } = useSelector((state: RootState ) => state.auth);

    const [ data , setData] = useState(tags);

    const navigate = useNavigate();

    const user_permissions: string[] = user?.all_permissions || [];

    const [canDelete, setCanDelete ] = useState<boolean>(false);
   
    const [canEdit, setCanEdit ] = useState<boolean>(false);
   
    useEffect(() => {
        if (!user || user_permissions.indexOf("tags.get") === -1) {
            navigate(-1);
        }
        if(user && user_permissions.indexOf("tags.destroy") > -1) {
            setCanDelete(true);
        }

        if(user && user_permissions.indexOf("tags.edit") > -1) {
            setCanEdit(true)
        }
        
    }, [user, user_permissions, navigate, data]);
 

   const [error, setError] = useState<boolean>(false);

   const [loading ] = useState<boolean>(false);

   const [showModal, setShowModal ] = useState<boolean>(false);

   const [editId, setEditId] = useState<string | number | null | undefined>();

   const deleteTag = async ( id : string | number ) => {
        // setLoading(true);
         const response = Api.delete('/tags/' + id, {
                Authorization: 'Bearer ' + token,
                accept: 'application/json'
            })
    
            const result = await response;
    
            if(result.statusCode == 200) {
                const updatedTags = tags.filter(tag => tag.id !== id); // Create a new array without the deleted tag
                setData(updatedTags); // Update state to trigger re-render

            }else {
                setError(true)
            }
            // setLoading(false);
        }


    if(error){  return <MessageToast message='Ha ocurrido un error' type="error"/>}
    if(loading){  return <MessageToast message='Cargando...' type="info"/>}
    
    return (
       
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <button onClick={() => setShowModal(true)}>Agregar</button>
            <h1 >Categorias</h1>
            <table className="text-center w-full text-sm text-left rtl:text-right font-small text-gray-900 dark:text-gray-400">
                <thead>
                    <tr>
                        <th scope="col" className="px-6 py-3"> #</th>
                        <th scope="col" className="px-6 py-3"> Nombre</th>
                        <th scope="col" className="px-6 py-3"> Slug </th>
                        <th scope="col" className="px-6 py-3"> Acciones </th>
                    </tr>
                </thead>

                      <tbody>

                    {data.map((item) => (
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700" key={item.id}>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.id}</th>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.name}</th>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.slug}</th>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            <button disabled={!canDelete} onClick={() => deleteTag(item.id)}>Eliminar</button>
                            <button disabled={!canEdit}  onClick={() => {setShowModal(true) ;setEditId(item.id)}} >Editar</button>

                        </th>
                    </tr>
                    ))} 
                </tbody>
                {
                    showModal && <AddEdit id={editId} show={true} onClose={() => {
                        setShowModal(false), setEditId(null)}}></AddEdit>
                }
            </table>
        </div>
    )
    
}