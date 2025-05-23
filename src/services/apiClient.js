import apiClient from "../plugins/axios.js";

export async function getData(url) {
    try {
        const response = await apiClient.get(url);
        return response.data;
    } catch (error) {
        console.error('error en la peticion GET', error);
        throw error;
    }
} 

export async function postData(url, data,){
    try {
        console.log("data", data);
        const response = await apiClient.post(url, data);
        return response.data;
    } catch (error){
        console.error('Error en la peticion POST', error);
        throw error;
    }
}

export async function putData(url, data) {
    try {
        
        const response = await apiClient.put(url,data);
        return response.data;
    } catch (error) {
        console.error('error en la peticion PUT', error);
        throw error;    
    }
}
