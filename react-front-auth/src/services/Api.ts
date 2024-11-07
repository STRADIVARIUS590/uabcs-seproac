export class Api {
    static baseUrl = 'http://localhost:8000/api'

    static async post<T>(url: string, data: any, headers: {}): Promise<any> {
        const response = await fetch(`${Api.baseUrl}${url}`, 
            {
            method: 'POST',
              headers: {
            ...headers, // Spread to avoid mutation
            'Content-Type': 'application/json', // Ensure the correct content type is sent
        },
            body: JSON.stringify(data)
        })
    
        const dataResponse = await response.json()
        
        return {
            statusCode : response.status,
            data: dataResponse.data
        } 
    }

    static async get<T>(url: string, headers: {}): Promise<any> {
        const response = await fetch(`${Api.baseUrl}${url}`,
            {
            method: 'GET',
            headers : headers,
        })

        const dataResponse = await response.json()
        
        return {
            statusCode : response.status,
            data: dataResponse.data
        }
    
    }

  static async delete<T>(url: string, headers: {}): Promise<any> {
  try {
        const response = await fetch(`${Api.baseUrl}${url}`, {
        method: 'DELETE',
        headers: {
            ...headers, // Spread to avoid mutation
            'Content-Type': 'application/json', // Ensure the correct content type is sent
        },
        });

        let dataResponse;

        // If the status is 204 (No Content), return null for dataResponse
        if (response.status === 204) {
        dataResponse = null;
        } else {
        // Check if the response is JSON before parsing
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            dataResponse = await response.json(); // Parse JSON response
        } else {
            dataResponse = await response.text(); // If not JSON, treat as text
        }
        }

        return {
        statusCode: response.status,
        data: dataResponse?.data || dataResponse, // Fallback for non-JSON responses
        };
    } catch (error) {
        console.error('Error in DELETE request:', error);

        // Return an error status and message in a structured way
        return {
        statusCode: 500,
        data: 'Error in DELETE request',
        };
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