"use client"
import { ColumnDef } from "@tanstack/react-table"
import { TableEditDelete } from "@/components/ui/table-edit-delete";
import { TableSortButton } from "@/components/ui/table-sort-button";
import { IUser } from "@/store/authSlice";

const section = 'tags'

export interface TagItem {
    id: string | number
    name: string
    slug: string
}

// hay una muy buena razon para la existencia de esto
// aun no la descubro
export const useTagsTableColumns = ({ deleteFn, canModify, user }: { deleteFn: (id: number | string) => Promise<void>, canModify: boolean, user: IUser | null }) => {
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
                if (!canModify && user?.id != rowOriginalData.id) {
                    return;
                }
                return (
                    <TableEditDelete data={rowOriginalData} section={section} deleteFn={deleteFn} />
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
