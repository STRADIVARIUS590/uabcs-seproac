export class Api {
    static baseUrl = 'http://localhost:8000/api'

    static async post<T>(url: string, data: any): Promise<any> {
        const response = await fetch(`${Api.baseUrl}${url}`, {
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
}