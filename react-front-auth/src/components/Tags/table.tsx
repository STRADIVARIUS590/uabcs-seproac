import { DataTable } from "@/components/ui/data-table";
import { MessageToast } from "../MessageToast";
import { useTags } from "@/hooks/tags/useTagsData";
import useTagsTableColumns from "@/hooks/tags/useTagsColumns";

export const Tags = () => {
    const { data, deleteFn, loading, error, canEdit, canDelete, fetchData: updateFn } = useTags()
    const { userColumns } = useTagsTableColumns({ deleteFn, updateFn, canDelete, canEdit });

    if (error) {
        <div className="mt-12"> <MessageToast message='Ha ocurrido un error' type="error" /></div>
    }

    if (loading) {
        <div className="mt-12"> <MessageToast message='Cargando...' type="loading" /></div>
    }

    return (
        <div className="container mx-auto py-10">
            <DataTable filterField={"name"} filterPlaceholder={"Nombre de la etiqueta"} columns={userColumns} data={data} error={error} loading={loading} />
        </div>
    )
}
