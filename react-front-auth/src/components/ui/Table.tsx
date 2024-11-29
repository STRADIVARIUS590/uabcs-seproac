import { Link } from "react-router-dom";

export interface RawData_T {
    id: string | number;
}

interface TableProps {
    className: string | undefined
    headsContent: any[];
    rowsContents: RawData_T[];
    section: string;
    deleteFn: (id: number | string) => Promise<any>;
}

export default function Table({ section, deleteFn, headsContent, rowsContents }: TableProps) {
    const oddColor = 'bg-snow-100';
    const evenColor = 'bg-snow-50';
    rowsContents.map(row => console.log("for us", Object.values(row)))
    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
                <div className="inline-block min-w-1/2 py-2 sm:px-6 lg:px-8  rounded-md">
                    <div className="overflow-hidden">
                        <table
                            className="min-w-full text-center text-sm font-light text-surface dark:text-white ">
                            <thead
                                className="border-b border-neutral-200 font-medium dark:border-white/10 bg-vi-500 text-vi-50 rounded-md">
                                <tr>
                                    {headsContent.map((heading, i) => (<th className="px-6 py-4" key={i}>{heading}</th>))}
                                </tr>
                            </thead>
                            <tbody>
                                {rowsContents.map((row, i) => (
                                    <tr key={row.id} className={`border-vi-50 border-2 ${(i % 2 == 0) ? evenColor : oddColor}`}>
                                        {Object.values(row).map((rowContent, k) => {
                                            return <td key={(i + 1) * k} className="whitespace-nowrap px-6 py-4 font-medium">{rowContent || "N/A"}</td>
                                        })}
                                        <td className="whitespace-nowrap px-6 py-4 font-medium space-x-2" >
                                            <Link to={`/${section}/edit/${row.id}`} className=" bg-vi-100  text-vi-500 px-4 py-1 rounded-md hover:bg-vi-400 hover:text-vi-50 active:bg-vi-400 active:text-vi-50" type="button">Editar</Link>
                                            <button onClick={() => deleteFn(row.id)} className="bg-red-100 hover:bg-red-400 active:bg-red-400  text-red-500 hover:text-vi-50 active:text-vi-50 px-4 py-1 rounded-md" type="button">Borrar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
