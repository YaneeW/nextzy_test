import axios from 'axios'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const apiRequest = async(service,method,endpoint,body)=>{
    try{
        if(!service || !method ){
            return {
                status: 'error',
                message: 'Please add service or method request',
                data: null
            }
        } else if(service === 'datalist'){
            const response = await axios({
                baseURL: `${apiUrl}${endpoint}`,
                method: method.toUpperCase(),
                data: body,
                timeout: 10000,
            })
            return {
                status: 'success',
                message: 'ok',
                data: response.data
            }
        }
    }catch(error){
        return {
            status: 'error',
            message: error.message || 'Somethimg went wrong',
            data: null
        }
    }
}
    