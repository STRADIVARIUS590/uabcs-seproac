export class Api {
    static baseUrl = 'http://localhost:8000/api'

    static async post<T>(url: string, data: any): Promise<any> {
        const response = await fetch(`${Api.baseUrl}${url}`, 
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
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

    static async delete(url: string, headers: {}): Promise<any> {
        const response = await fetch(`${Api.baseUrl}${url}`,
            {
                method: 'DELETE',
                headers : headers
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