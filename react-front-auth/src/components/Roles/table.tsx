import { useRoles } from "@/hooks/roles/useRolesData"
import useRolesTableColumns from "@/hooks/roles/useRolesTableColumns"
import { DataTable } from "../ui/data-table";

export const Roles = () => {
    const { data, error, loading } = useRoles()
    const { rolesColumns } = useRolesTableColumns({});
    
    return (
        <div className="container mx-auto py-10">
            <DataTable pathName="users" filterField={"name"} filterPlaceholder={"..."} columns={rolesColumns} data={data} error={error} loading={loading} />
        </div>
    )
}