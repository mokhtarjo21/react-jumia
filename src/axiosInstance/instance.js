import axios from "axios";
// import { store } from "../Store/store";
// import { changeLoader } from "../Store/Slices/loader";


export const instance = axios.create({
    baseURL: "http://127.0.0.1:8000",
    
})

// export const req = instance.interceptors.request.use((config) => {
//     console.log(config);
//     store.dispatch(changeLoader(true))
//     return config


// }, (err) => {
//     console.log(err);

// })
// export const res = instance.interceptors.response.use((config) => {
//     console.log(config);
//     store.dispatch(changeLoader(false))

//     return config


// }, (err) => {
//     console.log(err);
//     return Promise.reject(err)

// })