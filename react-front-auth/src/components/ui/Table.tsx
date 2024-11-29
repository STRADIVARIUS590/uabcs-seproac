interface StadisticsTableProps {
    className: string | undefined
    headsContent: any[];
    rowsContents: any[][];
    deleteFn: (id: number | string) => Promise<any>;
}

export default function Table({ deleteFn, headsContent, rowsContents }: StadisticsTableProps) {
    const oddColor = 'bg-snow-100';
    const evenColor = 'bg-snow-50';
    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 ">
                    <div className="overflow-hidden">
                        <table
                            className="min-w-full text-center text-sm font-light text-surface dark:text-white ">
                            <thead
                                className="border-b border-neutral-200 font-medium dark:border-white/10 bg-vi-500 text-vi-50">
                                <tr>
                                    {headsContent.map((heading, i) => (<th className="px-6 py-4" key={i}>{heading}</th>))}
                                </tr>
                            </thead>
                            <tbody>
                                {rowsContents.map((row, i) => (
                                    <tr className={`border-vi-50 border-2 ${(i % 2 == 0) ? evenColor : oddColor}`}>
                                        {row.map((rowContent) => (
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">{rowContent}</td>
                                        ))}
                                        <td className="whitespace-nowrap px-6 py-4 font-medium space-x-2">
                                            <button className=" bg-vi-100  text-vi-500 px-4 py-1 rounded-md hover:bg-vi-400 hover:text-vi-50 active:bg-vi-400 active:text-vi-50" type="button">Editar</button>
                                            <button onClick={() => deleteFn(row[0])} className="bg-red-100 hover:bg-red-400 active:bg-red-400  text-red-500 hover:text-vi-50 active:text-vi-50 px-4 py-1 rounded-md" type="button">Borrar</button>
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

// <div className="relative w-full overflow-x-scroll scrollbar scrollbar-gutter-stable">
//     <table className="w-full min-w-full caption-bottom text-sm">
//         <thead className="bg-vi-500 text-vi-50">
//
//         </thead>
//         <tbody className="">
//         </tbody>
//     </table>
// </div>
