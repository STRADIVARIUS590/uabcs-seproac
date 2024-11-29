import Table, { RawData_T } from './ui/Table'

interface User extends RawData_T {
    id: string
    name: string
    email: string
    password: string
}

function del(id: number | string): Promise<any> {
    console.log(id)
    return new Promise((resolve) => {
        resolve(4);
    });
}

export default function Test() {
    const heads = ["id", "nombre", "email", "contraseña", "acciones"];
    const rows = [{ id: 1, name: "pancho", email: "panchogmail.com", password: "popo" }];
    return (
        <Table className={""} headsContent={heads} rowsContents={rows} deleteFn={del}>
        </Table >
    )
}

