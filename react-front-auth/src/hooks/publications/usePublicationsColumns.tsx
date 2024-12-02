"use client"
import { ColumnDef } from "@tanstack/react-table"
import { TableEditDelete } from "@/components/ui/table-edit-delete";
import { TableSortButton } from "@/components/ui/table-sort-button";
import { IUser } from "@/store/authSlice";

const section = 'projects'

export interface PublicationItem {
    id: string;
    title: string | undefined;
    user_id: string | undefined;
    type: string | undefined;
    issn_isbn: string | undefined;
    doi: string | undefined;
    magazine_name: string | undefined;
    authors: string | undefined;
    publication_date: string | undefined;
    period: string | undefined;
    user: {
        name: string | undefined
    }
}

// hay una muy buena razon para la existencia de esto
// aun no la descubro
const usePublicationsTableColumns = ({ deleteFn, canDelete, canEdit, user }: { deleteFn: (id: number | string) => Promise<void>, canEdit: boolean, canDelete: boolean, user: IUser | null }) => {
    const userColumns: ColumnDef<PublicationItem>[] = [
        {
            accessorKey: "id",
            header: ({ column }) => {
                return (
                    <TableSortButton column={column} headingText={"ID"} />
                )

            },
        },
        {
            accessorKey: "title",
            header: ({ column }) => {
                return (
                    <TableSortButton column={column} headingText={"Titulo"} />
                )

            },
        },
        {
            accessorKey: "issn_isbn",
            header: ({ column }) => {
                return (
                    <TableSortButton column={column} headingText={"ISSN/ISBN"} />
                )

            },
        },
        {
            accessorKey: "doi",
            header: ({ column }) => {
                return (
                    <TableSortButton column={column} headingText={"DOI"} />
                )

            },
        },
        {
            accessorKey: "magazine_name",
            header: ({ column }) => {
                return (
                    <TableSortButton column={column} headingText={"Revista"} />
                )

            },
        },
        {
            accessorKey: "authors",
            header: ({ column }) => {
                return (
                    <TableSortButton column={column} headingText={"Autores"} />
                )

            },
        },
        {
            accessorKey: "magazine_name",
            header: ({ column }) => {
                return (
                    <TableSortButton column={column} headingText={"Revista"} />
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
            accessorKey: "publication_date",
            header: ({ column }) => {
                return (
                    <TableSortButton column={column} headingText={"Fecha"} />
                )
            },
            cell: ({ row }) => {
                const date = new Date(row.getValue("publication_date"));
                return <div className="text-center font-medium" >
                    {date.toLocaleDateString()}
                </div>
            }
        },
        {
            accessorKey: "period",
            header: ({ column }) => {
                return (
                    <TableSortButton column={column} headingText={"Periodo"} />
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
                        canDelete={canDelete}
                        canEdit={canEdit}
                        deleteTitle="Eliminar publicación"
                        deleteQuestion="¿Está seguro que quiere borrar esta publicación?"
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

export default usePublicationsTableColumns;
