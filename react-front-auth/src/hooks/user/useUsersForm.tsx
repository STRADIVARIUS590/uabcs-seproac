
import { UseFormRegister, UseFormHandleSubmit, FieldValues, FieldError } from 'react-hook-form';
interface Props {
    reset? : (values?: FieldValues) => void;
    setValue? : (name: string, value: any, config?: any) => void;
    register? : UseFormRegister<any>;
    handleSubmit? : UseFormHandleSubmit<any>;
    onSubmit? : (data: any) => void;
    errors: { [key: string]: FieldError };
    getById: (id: number | string) => Promise<void>
}
export const useUsersForm = ( {getById} : Props) => {


    const loadData = async  (id : number | string | undefined ) => {
        return id ?  getById(id) : null
    }

    return { loadData };    
}