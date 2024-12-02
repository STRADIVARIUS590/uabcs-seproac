"use client"
import { ColumnDef } from "@tanstack/react-table"
import { TableEditDelete } from "@/components/ui/table-edit-delete";
import { TableSortButton } from "@/components/ui/table-sort-button";
import { TagForm } from "@/components/Tags/tag-form";

const section = 'tags'

export interface TagItem {
    id: string | number
    name: string
    slug: string
}


// hay una muy buena razon para la existencia de esto
// aun no la descubro
export const useTagsTableColumns = ({ deleteFn, updateFn, canDelete, canEdit }: { deleteFn: (id: number | string) => Promise<void>, updateFn: () => void, canEdit: boolean, canDelete: boolean }) => {
    const userColumns: ColumnDef<TagItem>[] = [
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
            accessorKey: "slug",
            header: ({ column }) => {
                return (
                    <TableSortButton column={column} headingText={"Descripción"} />
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
                return (
                    <TableEditDelete
                        canDelete={canDelete}
                        canEdit={canEdit}
                        editModalContent=<TagForm updateFn={updateFn} isEditMode={true} data={rowOriginalData} />
                        deleteTitle="Eliminar etiqueta"
                        deleteQuestion="¿Está seguro que quiere borrar esta etiqueta?"
                        isEditModal={true}
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

export default useTagsTableColumns;
