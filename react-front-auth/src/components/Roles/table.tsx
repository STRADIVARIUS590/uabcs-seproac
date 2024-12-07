import { useRoles } from "@/hooks/roles/useRolesData"
import useRolesTableColumns, { RoleItem_T } from "@/hooks/roles/useRolesTableColumns"
import { DataTable } from "../ui/data-table";
import { useEffect, useState } from "react";

export const Roles = () => {
    const { data, fetchData, deleteFn, error, loading } = useRoles()

    useEffect(() => {
        fetchData();
    }, []);

    const { rolesColumns } = useRolesTableColumns({ deleteFn: deleteFn, canDelete: false, canEdit: true });

    console.log(data)

    return (
        <div className="container mx-auto py-10">
            <DataTable pathName="roles" filterField={"name"} filterPlaceholder={"Nombre..."} columns={rolesColumns} data={data} error={error} loading={loading} />
        </div>
    )
}
