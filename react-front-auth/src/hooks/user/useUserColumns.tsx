"use client"
import { ColumnDef } from "@tanstack/react-table"
import { TableEditDelete } from "@/components/ui/table-edit-delete";
import { TableSortButton } from "@/components/ui/table-sort-button";
import { IUser } from "@/store/authSlice";

const section = 'users'

export interface UserItem_T {
    id: number;
    name: string;
    email: string;
    date_ingreso: string;
    birth_date: string;
    sex: string;
    role_id: string | number;
    role: {
        id: number;
        name: string;
    }
}

// hay una muy buena razon para la existencia de esto
// aun no la descubro
export const useUserTableColumns = ({ deleteUser, canModify, user }: { deleteUser: (id: number | string) => Promise<void>, canModify: boolean, user: IUser | null }) => {
    const userColumns: ColumnDef<UserItem_T>[] = [
        {
            accessorKey: "id",
            header: ({ column }) => {
                return (
                    <TableSortButton column={column} headingText={"ID"} />
                )

            },
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <TableSortButton column={column} headingText={"Nombre"} />
                )

            },
        },
        {
            accessorKey: "email",
            header: ({ column }) => {
                return (
                    <TableSortButton column={column} headingText={"Correo electrónico"} />
                )

            },
        },
        {
            accessorKey: "date_ingreso",
            header: ({ column }) => {
                return (
                    <TableSortButton column={column} headingText={"Fecha de ingreso"} />
                )
            },
            cell: ({ row }) => {
                const date = new Date(row.getValue("date_ingreso"));
                return <div className="text-center font-medium" >
                    {date.toLocaleDateString()}
                </div>
            }
        },
        {
            accessorKey: "birth_date",
            header: ({ column }) => {
                return (
                    <TableSortButton column={column} headingText={"Fecha de nacimiento"} />
                )
            },
            cell: ({ row }) => {
                const date = new Date(row.getValue("date_ingreso"));
                return <div className="text-center font-medium" >
                    {date.toLocaleDateString()}
                </div>
            }
        },
        {
            accessorKey: "sex",
            header: ({ column }) => {
                return (
                    <TableSortButton column={column} headingText={"Género"} />
                )
            },
            cell: ({ row }) => {
                const gender: string = row.getValue("sex");
                return <div className="text-center font-medium" >
                    {gender}
                </div>
            }
        },
        {
            accessorKey: "role",
            header: ({ column }) => {
                return (
                    <TableSortButton column={column} headingText={"Rol"} />
                )
            },
            cell: ({ row }) => {
                const role: {
                    id: number;
                    name: string;
                } = row.getValue("role");
                if (!role) {
                    return;
                }
                return <div className="text-center font-medium" >
                    {role?.name}
                </div>
            }
        },
        {
            id: "actions",
            header: () => <div className="text-center" > Acciones </div>,
            meta: {
                headerClassName: "bg-red-400"
            },
            cell: ({ row }) => {
                const rowUser = row.original
                if (!canModify && user?.id != rowUser.id) {
                    return;
                }
                return (
                    <TableEditDelete
                        deleteTitle="Eliminar usuario"
                        deleteQuestion="¿Está seguro que quiere borrar este usuario?"
                        data={rowUser}
                        section={section}
                        deleteFn={deleteUser} />
                )
            }
        },
    ]
    return (
        {
            userColumns
        }
    )
}

export default useUserTableColumns;
