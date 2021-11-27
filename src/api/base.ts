import axios from 'axios';
import { env } from 'process';
import { DataInterface } from '../interfaces/data.interface';

axios.interceptors.request.use(request => {
    console.log('Starting Request', JSON.stringify(request, null, 2));
    return request;
});

axios.interceptors.response.use(response => {
    console.log('Response:', response);
    return response;
});

const get = async <T>(url: string, params: DataInterface): Promise<T> => {
    const fullUrl = `${env.API_URL}/${url}`;
    return axios.get(fullUrl, {
        responseType: 'json',
        params,
    });
};

export { get };