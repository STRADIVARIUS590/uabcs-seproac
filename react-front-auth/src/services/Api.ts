
// import { useLogout } from "../components/scripts/Logout"
export class Api {

    static baseUrl  = import.meta.env.VITE_API_URL

    static async post(url: string, data: any, headers: {}): Promise<any> {
        const isFormData = data instanceof FormData; // Check if the data is FormData
    
        const response = await fetch(`${Api.baseUrl}${url}`, {
            method: 'POST',
            headers: {
                ...headers,
                ...(isFormData ? {} : { 'Content-Type': 'application/json' }), // Set Content-Type only for JSON
            },
            body: isFormData ? data : JSON.stringify(data), // Use FormData directly if provided
        });
    
        const dataResponse = await response.json();
    
        return {
            statusCode: response.status,
            data: dataResponse.data,
        };
    }
    

    static async get(url: string, headers: {}): Promise<any> {
        const response = await fetch(`${Api.baseUrl}${url}`,
            {
            method: 'GET',
            headers : headers,
        })

        const dataResponse = await response.json()
        

        console.log(dataResponse);
        
         // Trigger authInterceptor with response status
        // Api.authInterceptor({ statusCode: response.status });

        return {
            statusCode : response.status,
            data: dataResponse.data
        }
    
    }

  static async delete(url: string, headers: {}): Promise<any> {
  
        const response = await fetch(`${Api.baseUrl}${url}`, {
        method: 'DELETE',
        headers: {
            ...headers, // Spread to avoid mutation
            'Content-Type': 'application/json', // Ensure the correct content type is sent
        },
        })

        const dataResponse = await response.json()
        
        return {
            statusCode : response.status,
            data: dataResponse.data
        }    
}



    static async put(url: string, data: any, headers : {}): Promise<any> {
        const response = await fetch(`${Api.baseUrl}${url}`, {
            method: 'PUT',
            headers : headers,
            body: JSON.stringify(data)
        })
        
        const dataResponse = await response.json()
        
        return {
            statusCode : response.status,
            data: dataResponse.data
        }
    }
}