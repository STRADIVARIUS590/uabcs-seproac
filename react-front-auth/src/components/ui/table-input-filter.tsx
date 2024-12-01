import { Table as ReactTable } from "@tanstack/react-table";
import { Input } from "@/components/ui/input"

interface FilterProperties {
    table: ReactTable<any>,
    field: string,
    placeholder: string,
}


export default function TableInputFilter<InputType extends string | number | readonly string[] | undefined>({ table, field, placeholder }: FilterProperties) {
    return (
        <div className="flex items-center py-45">
            <Input placeholder={placeholder}
                value={(table.getColumn(field)?.getFilterValue() as (InputType)) ?? ""}
                onChange={(event) => table.getColumn(field)?.setFilterValue(event.target.value)}
                className="max-w-sm focus-visible:ring-vi-500 focus-visible:border-none"
            />
        </div>
    )
}

