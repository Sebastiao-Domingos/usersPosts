import axios from "axios";

const api = axios.create({
    baseURL: process.env.BASE_API_URL,
    headers : {
        "Content-Type" : "application/json",
        "Accept-Type" : "application/json"
    }
    
})

// api.interceptors.request.use((config) => {
//     // config.headers.Authorization = ""
//     return config;
//   });

export {api}