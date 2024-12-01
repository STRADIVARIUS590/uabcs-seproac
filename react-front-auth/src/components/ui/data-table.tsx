"use client"

import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    SortingState,
    getSortedRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    VisibilityState,
} from "@tanstack/react-table"


import { useState } from "react"
import TableContent from "../ui/table-content"
import TableInputFilter from "../ui/table-input-filter"
import TableNextPrev from "../ui/table-next-prev"
// import TableVisibility from "../ui/table-visibility"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    loading: boolean
    error: boolean
}

export function DataTable<TData, TValue>({
    columns,
    data,
    loading,
    error
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="md:w-full space-y-4">
            <TableInputFilter<number> table={table} field={"email"} placeholder="Buscar por correo" />
            <div className="rounded-md">
                <TableContent table={table} loading={loading} error={error} />
            </div>
            <TableNextPrev table={table} />
        </div>
    )

}
