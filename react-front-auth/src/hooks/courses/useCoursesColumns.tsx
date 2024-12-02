"use client"
import { ColumnDef } from "@tanstack/react-table"
import { TableEditDelete } from "@/components/ui/table-edit-delete";
import { TableSortButton } from "@/components/ui/table-sort-button";
import { IUser } from "@/store/authSlice";

const section = 'courses'

export interface CourseItem {
    id: string | number;
    user_id: string | number;
    institution_id: string | undefined | null;
    total_hours: number | string | undefined;
    name: string | undefined;
    total_students: number | string | undefined;
    educative_level: number | string | undefined;
    period: number | string | undefined;
    start_date: number | string | undefined;
    end_date: number | string | undefined;
    user: {
        id: string,
        name: string,
    },
    institution: {
        id: string,
        name: string,
    }
}

// hay una muy buena razon para la existencia de esto
// aun no la descubro
const useCoursesTableColumns = ({ deleteFn, canEdit, canDelete, user }: { deleteFn: (id: number | string) => Promise<void>, canEdit: boolean, canDelete: boolean, user: IUser | null }) => {
    const userColumns: ColumnDef<CourseItem>[] = [
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
                    <TableSortButton column={column} headingText={"Titulo del trabajo"} />
                )

            },
        },
        {
            accessorKey: "total_hours",
            header: ({ column }) => {
                return (
                    <TableSortButton column={column} headingText={"Titulo del trabajo"} />
                )

            },
        },
        {
            accessorKey: "total_students",
            header: ({ column }) => {
                return (
                    <TableSortButton column={column} headingText={"Titulo del trabajo"} />
                )

            },
        },
        {
            accessorKey: "educative_level",
            header: ({ column }) => {
                return (
                    <TableSortButton column={column} headingText={"Nivel educativo"} />
                )

            },
        },
        {
            accessorKey: "start_date",
            header: ({ column }) => {
                return (
                    <TableSortButton column={column} headingText={"Fecha de inicio"} />
                )
            },
            cell: ({ row }) => {
                const date = new Date(row.getValue("start_date"));
                return <div className="text-center font-medium" >
                    {date.toLocaleDateString()}
                </div>
            }
        },
        {
            accessorKey: "end_date",
            header: ({ column }) => {
                return (
                    <TableSortButton column={column} headingText={"Fecha de finalización"} />
                )
            },
            cell: ({ row }) => {
                const date = new Date(row.getValue("end_date"));
                return <div className="text-center font-medium" >
                    {date.toLocaleDateString()}
                </div>
            }
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
            accessorKey: "institution",
            header: ({ column }) => {
                return (
                    <TableSortButton column={column} headingText={"Usuario"} />
                )
            },
            cell: ({ row }) => {
                const institution: {
                    name: string;
                } = row.getValue("institution");
                if (!institution) {
                    return;
                }
                return <div className="text-center font-medium" >
                    {institution?.name}
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
                        deleteTitle="Eliminar curso"
                        deleteQuestion="¿Está seguro que quiere borrar este curso?"
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
export default useCoursesTableColumns
