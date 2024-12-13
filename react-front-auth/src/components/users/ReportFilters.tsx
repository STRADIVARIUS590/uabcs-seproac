import { Api } from "@/services/Api";
import { RootState } from "@/store";
import { loadEnvFile } from "process";
import { useState } from "react";
import { useSelector } from "react-redux";
import { start } from "repl";

export const ButtonFilters = () => {
    const { token } = useSelector((state: RootState) => state.auth);

    const [ startDate, setStartDate ] = useState<string | null>();
    const [ endDate, setEndDate ] = useState<string | null>();


    const handleDownload = async ({ format, startDate, endDate }: { format: string, startDate?: string | null, endDate? : string | null }) => {
        var endpoint = Api.baseUrl + '/reports?type=users&format=' + format;
        
        if(startDate ){
            endpoint += `&start_date=${startDate}`;
        }
        
        if(endDate) {
            endpoint += `&end_date=${endDate}`;
        }

        try {
            const response = await fetch(endpoint, {
                method: 'GET',  // Assuming a GET request to fetch the file
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': format === 'xlsx'
                        ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                        : format === 'pdf'
                        ? 'application/pdf'
                        : format === 'xml'
                        ? 'application/xml'
                        : format === 'txt'
                        ? 'text/plain'
                        : 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch the ${format} file`);
            }

            // Log the entire response headers to check if Content-Disposition is there
            const headers = response.headers;
            console.log('Response headers:', headers);
            
            //   Content-Disposition: attachment; filename=REPORTE_USUARIOS_SEPROAC_CREATED_2024_12_13_162047.xlsx
            // Extract filename from the Content-Disposition header if available
            const disposition = headers.get('Content-Disposition') || headers.get('content-disposition');
            let filename = `report.${format}`; // Default filename

            if (disposition) {
                // Improved regex to handle filenames with or without quotes and extra spaces
                const matches = /filename\*?=(?:UTF-8'')?["']?([^;"']+)["']?/.exec(disposition);
                console.log('Filename matches:', matches);

                if (matches && matches[1]) {
                    filename = matches[1].trim();
                }
            }


            // Create a Blob from the response (file content)
            const blob = await response.blob();

            // Create a temporary download link
            const link = document.createElement('a');
            const url = window.URL.createObjectURL(blob);
            link.href = url;
            link.download = filename;  // Use the extracted filename

            // Trigger the download
            document.body.appendChild(link);
            link.click();

            // Clean up
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(`Error downloading the ${format} file:`, error);
        }
    };

     const svgIcons = {
        xlsx: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
            >
                <path d="M19 2H8c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h8c.55 0 1-.45 1-1s-.45-1-1-1H8V4h11v5c0 .55.45 1 1 1s1-.45 1-1V4c0-1.1-.9-2-2-2z" />
                <path d="M16 13.41L14.59 12 10 16.59 5.41 12 4 13.41 10 19.41 16 13.41z" />
            </svg>
        ),
        txt: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
            >
                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
                <path d="M8 14h8v2H8zm0-4h8v2H8z" />
            </svg>
        ),
        json: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
            >
                <path d="M16 3H5c-1.1 0-2 .9-2 2v14a2 2 0 002 2h14c1.1 0 2-.9 2-2V8l-5-5zm4 16H5V5h10v4h4v10z" />
                <path d="M10 14h4v2h-4zm0-4h4v2h-4z" />
            </svg>
        ),
        xml: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
            >
                <path d="M6 2h9l6 6v13a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm6 13l3.5-5h-7L12 9l-3.5 5h7L12 17z" />
            </svg>
        ),
    };

    // Define buttons with corresponding properties
    const buttonConfig = [
        { format: 'xlsx', color: '#217346', icon: svgIcons.xlsx, label: 'XLSX' },
        { format: 'txt', color: '#4A4A4A', icon: svgIcons.txt, label: 'TXT' },
        { format: 'json', color: '#F7A41D', icon: svgIcons.json, label: 'JSON' },
        { format: 'xml', color: '#005B96', icon: svgIcons.xml, label: 'XML' },
    ];
    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap', // Allow buttons to wrap onto new lines
                gap: '15px',
                padding: '20px',
                justifyContent: 'center', // Centers buttons horizontally
            }}
        >

            <label htmlFor="start_date">Fecha de inicio</label>
            <input type="date"  onChange={(e) => {
                setStartDate(e.target.value);
            }}/>


            <label htmlFor="end_date">Fecha de Fin</label>
            <input type="date"  onChange={(e) => {
                setEndDate(e.target.value);
            }}/>


            {buttonConfig.map(({ format, color, icon, label }) => (
                <button
                    key={format}
                    onClick={() => handleDownload({ format, startDate, endDate })}
                    style={{
                        backgroundColor: color,
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '10px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        minWidth: '120px', // Set a minimum width for buttons
                        textAlign: 'center',
                    }}
                >
                    {icon}
                    {label}
                </button>
            ))}
        </div>
    
    );
};
