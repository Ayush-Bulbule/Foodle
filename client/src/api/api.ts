import axios from 'axios'

// export const APP_API_URL = 'https://foodle-api.onrender.com/'
export const APP_API_URL = 'http://localhost:4000/api'


export default axios.create({
    baseURL: APP_API_URL,
});


export const axiosPrivate = axios.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        credentials: 'include',
    },
})


// //Use of intraceptors 
// axios.interceptors.response.use(
//     (config) => {
//         return config;
//     },
//     async (error) => {
//         console.log("API RESPONSEEEEEEEEEEEEEEEE")
//         console.log(error.config)
//         const originalRequest = error.config;

//         if (error.response.status === 401 && originalRequest) {
//             console.log("error 401  dd ")
//             console.log(originalRequest)
//             try {
//                 await axios.get(APP_API_URL + '/refresh', { withCredentials: true })
//                 return axios.request(originalRequest);
//             } catch (err) {
//                 console.log(err)
//             }
//         }

//         if (error.response.status) {
//             console.log("error 401")
//         }
//         throw error;
//     }
// )


// // export const APP_API_URL = 'http://localhost:4000/'