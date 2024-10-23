type Props = {
    label: string,
    name: string, 
    placeholder?: string,
    id?: string,
    error?: string,
    type?: 'text' | 'email' | 'password' | 'date' | 'select',
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string | number
}

const InputLabel = ({label, name, placeholder, id , error, type, onChange, value}: Props) => {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input 
                type={type ?? 'text'} 
                name={name} 
                id={id} 
                onChange={onChange} 
                placeholder={placeholder}
                value={value}
            />
            {
                error && <small className="text-red-500"> {error} </small>
            }
        </div>
    )
}

export default InputLabel