import { env, exit } from 'process';
import { getToday } from '../../utils/utils';
import { DataInterface } from '../../interfaces/data.interface';
import { AxiosRequestHeaders } from 'axios';
import { get } from '../base';
import { PredictionsResponseDto } from '../dto/predictions-response.dto';

const fetchPredictions = async (): Promise<PredictionsResponseDto> => {
    const { RAPID_API_TOKEN, PREDICTIONS_API_URL } = env;

    if (!RAPID_API_TOKEN || !PREDICTIONS_API_URL) {
        console.error('RAPID_API_TOKEN or PREDICTIONS_API_URL are not defined');
        exit(1);
    }

    const today = getToday();
    const url = `${PREDICTIONS_API_URL}/api/v2/predictions`;
    const params: DataInterface = {
        iso_date: today,
        federation: 'UEFA',
    };
    const headers: AxiosRequestHeaders = {
        'x-rapidapi-host': PREDICTIONS_API_URL,
        'x-rapidapi-key': RAPID_API_TOKEN,
    };

    return get<PredictionsResponseDto>(url, PredictionsResponseDto, params, headers);
};

export { fetchPredictions };