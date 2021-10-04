import axios from "axios";




export const Key = 'a7094e3f59680ceb019af88b26fa9679'




const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export default api;