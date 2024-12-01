import { DataTable } from "@/components/ui/data-table";
import useTagsTableColumns from "@/hooks/tags/useTagsColumns";
import { useTags } from "@/hooks/tags/useTagsData";

export const Tags = () => {
    const { data, deleteFn, loading, error, user, canModify } = useTags()
    const { userColumns } = useTagsTableColumns({ deleteFn, user, canModify });
    return (
        <div className="container mx-auto py-10">
            <DataTable filterField={"name"} filterPlaceholder={"Nombre de la etiqueta"} columns={userColumns} data={data} error={error} loading={loading} />
        </div>
    )
}
