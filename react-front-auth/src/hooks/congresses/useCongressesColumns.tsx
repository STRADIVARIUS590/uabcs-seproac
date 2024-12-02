"use client"
import { ColumnDef } from "@tanstack/react-table"
import { TableEditDelete } from "@/components/ui/table-edit-delete";
import { TableSortButton } from "@/components/ui/table-sort-button";
import { IUser } from "@/store/authSlice";

const section = 'projects'

export interface CongressItem {
    id: string | number;
    title_trabajo: string;
    user_id: string | number;
    event_name: string | null;
    date: string | null;
    colaborators: number | null
    user: {
        name: string
    }
}

// hay una muy buena razon para la existencia de esto
// aun no la descubro
export const useCongressesTableColumns = ({ deleteFn, canEdit, canDelete, user }: { deleteFn: (id: number | string) => Promise<void>, canEdit: boolean, canDelete: boolean, user: IUser | null }) => {
    const userColumns: ColumnDef<CongressItem>[] = [
        {
            accessorKey: "id",
            header: ({ column }) => {
                return (
                    <TableSortButton column={column} headingText={"ID"} />
                )

            },
        },
        {
            accessorKey: "title_trabajo",
            header: ({ column }) => {
                return (
                    <TableSortButton column={column} headingText={"Titulo del trabajo"} />
                )

            },
        },
        {
            accessorKey: "user",
            header: ({ column }) => {
                return (
                    <TableSortButton column={column} headingText={"Usuario"} />
                )
            },
            cell: ({ row }) => {
                const user: {
                    name: string;
                } = row.getValue("user");
                if (!user) {
                    return;
                }
                return <div className="text-center font-medium" >
                    {user?.name}
                </div>
            }
        },
        {
            accessorKey: "event_name",
            header: ({ column }) => {
                return (
                    <TableSortButton column={column} headingText={"Nombre del evento"} />
                )
            },
        },
        {
            accessorKey: "date",
            header: ({ column }) => {
                return (
                    <TableSortButton column={column} headingText={"Fecha"} />
                )
            },
            cell: ({ row }) => {
                const date = new Date(row.getValue("date"));
                return <div className="text-center font-medium" >
                    {date.toLocaleDateString()}
                </div>
            }
        },
        {
            accessorKey: "colaborators",
            header: ({ column }) => {
                return (
                    <TableSortButton column={column} headingText={"No. de colaboradores"} />
                )
            },
        },
        {
            id: "actions",
            header: () => <div className="text-center" > Acciones </div>,
            meta: {
                headerClassName: "bg-red-400"
            },
            cell: ({ row }) => {
                const rowOriginalData = row.original
                let editSelf = false;
                let deleteSelf = false;
                if (user?.id == rowOriginalData.user_id) {
                    editSelf = true;
                    deleteSelf = true;
                }
                return (
                    <TableEditDelete
                        canEdit={canEdit || editSelf}
                        canDelete={canDelete || editSelf}
                        deleteTitle="Eliminar congreso"
                        deleteQuestion="¿Está seguro que quiere borrar este congreso?"
                        data={rowOriginalData}
                        section={section}
                        deleteFn={deleteFn} />
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

export default useCongressesTableColumns;
