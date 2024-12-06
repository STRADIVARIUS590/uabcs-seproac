import { useRoles } from "@/hooks/roles/useRolesData"
import useRolesTableColumns, { RoleItem_T } from "@/hooks/roles/useRolesTableColumns"
import { DataTable } from "../ui/data-table";
import { useEffect, useState } from "react";

export const Roles = () => {
    const { fetchData, error, loading } = useRoles()
    const [data, setData] = useState<RoleItem_T[]>([]);

    const loadData = async () => {
        const fetchedData = await fetchData();
        setData(fetchedData);
    };

    useEffect(() => {
        loadData();
    }, []);

    const { rolesColumns } = useRolesTableColumns({});

    return (
        <div className="container mx-auto py-10">
            <DataTable pathName="roles" filterField={"name"} filterPlaceholder={"Nombre..."} columns={rolesColumns} data={data} error={error} loading={loading} />
        </div>
    )
}
