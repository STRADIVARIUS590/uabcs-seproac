import { useUser } from "@/hooks/user/useUserData";
import { DataTable } from "../paymets/data-table";
import { useUserTableColumns } from "@/hooks/user/useUserColumns";

export const UsersTest = () => {

    const { data, deleteUser, loading, error, user, canModify } = useUser()
    const { userColumns } = useUserTableColumns({ deleteUser, user, canModify });
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={userColumns} data={data} error={error} loading={loading} />
        </div>
    )
}
