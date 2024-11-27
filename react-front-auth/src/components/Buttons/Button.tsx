type Props = {
    value: string,
    type?: "submit" | "button",
    className?: string
}
const Button = ({ value, type, className }: Props) => {
    return (
        <button
            type={type ?? 'button'}
            className={className}
        >
            {value}
        </button>
    )
}

export default Button;
