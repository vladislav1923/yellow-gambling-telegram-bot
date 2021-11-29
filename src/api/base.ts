/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { DataInterface } from '../interfaces/data.interface';
import { deserialize } from 'typescript-json-serializer';
import { BaseDto } from './dto/base.dto';

axios.interceptors.request.use(request => {
    console.log('Starting Request', JSON.stringify(request, null, 2));
    return request;
});

axios.interceptors.response.use(response => {
    console.log('Response:', response);
    return response;
});

const get = async <T extends BaseDto>(
    url: string,
    model: new (...params: Array<any>) => T,
    params: DataInterface,
    headers?: DataInterface,
): Promise<T> => {
    const response = await axios.get(url, {
        responseType: 'json',
        params,
        headers,
    });

    return deserialize<T>(response.data, model);
};

export { get };