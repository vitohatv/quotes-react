import axios from 'axios';
const axiosInstances = axios.create({
    baseURL: 'https://quotes-232e5-default-rtdb.europe-west1.firebasedatabase.app/'
})

export const quotesApi = {
    add: async(data) => {
        const response = await axiosInstances.post('/quotes.json', data);
        return response === response.status;
    },
    edit: async(id, data) => {
        const response = await axiosInstances.put(`/quotes/${id}.json`, data);
        console.log(response);
    },
    show: async(id) => {
        const response = await axiosInstances.get(`/quotes/${id}.json`);
        return response.data;
    }
};
export default axiosInstances;