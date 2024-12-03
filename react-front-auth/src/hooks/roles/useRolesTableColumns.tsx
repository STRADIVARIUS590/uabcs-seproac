import { Column, ColumnDef } from "@tanstack/react-table"
// import { TableEditDelete } from "@/components/ui/table-edit-delete";
import { TableSortButton } from "@/components/ui/table-sort-button";
// import { IUser } from "@/store/authSlice";
export interface RoleItem_T {
    id: string | number; 
    name: string;
}
// const section = 'roles';
export const useRolesTableColumns = ({}) => {
    const rolesColumns: ColumnDef<RoleItem_T>[] = [
        {
            accessorKey: "id",

            header: ({ column } : { column: Column<RoleItem_T, unknown>}) => {
                return <TableSortButton column={column} headingText={"ID"}/>
            }
        },

        {
            accessorKey: "name",

            header : ({ column } : { column: Column<RoleItem_T, unknown>}) => {
                return <TableSortButton column={column} headingText={"Nombre"}/>
            }
        }
    ]
    return ( 
        {
            rolesColumns
        }
    );
}

export default useRolesTableColumns;