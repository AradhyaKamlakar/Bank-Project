import {Proxy} from './Proxy'

export const getRequest = async (route) => {
    try {
        
        const res = await fetch(Proxy.Server_Proxy + route,{
            method : 'GET',
            headers : {
                'Content-Type': 'application/json'
            }
        })

        const data = await res.json()

        return data;


    } catch (error) {
        return {
            error : error,
        }
    }
}



export const postRequest = async (route, body = {}) => {
    try {
        
        const res = await fetch(Proxy.Server_Proxy + route,{
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(body)
        })

        const data = await res.json()
        console.log('under post request', data);
        return data;


    } catch (error) {
        return {
            error : error,
        }
    }
}