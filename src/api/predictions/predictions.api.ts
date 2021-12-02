import { env, exit } from 'process';
import { DataInterface } from '../../interfaces/data.interface';
import { AxiosRequestHeaders } from 'axios';
import { get } from '../base';
import { PredictionResponseDto } from '../dto/prediction-response.dto';

const fetchPredictionByFixtureId = async (fixtureId: string): Promise<PredictionResponseDto> => {
    const { RAPID_API_TOKEN, FOOTBALL_API_HOST, FOOTBALL_API_URL } = env;

    if (!RAPID_API_TOKEN || !FOOTBALL_API_HOST || !FOOTBALL_API_URL) {
        console.error('Env variables are not defined');
        exit(1);
    }

    const url = `${FOOTBALL_API_URL}/predictions`;
    const params: DataInterface = {
        fixture: fixtureId,
    };
    const headers: AxiosRequestHeaders = {
        'x-rapidapi-host': FOOTBALL_API_HOST,
        'x-rapidapi-key': RAPID_API_TOKEN,
    };

    return get<PredictionResponseDto>(url, PredictionResponseDto, params, headers);
};

const fetchPredictionsByFixturesIds = async (fixtureId: string[]): Promise<PredictionResponseDto[]> => {
    return Promise.all([
        ...fixtureId.map((leagueId: string) => fetchPredictionByFixtureId(leagueId)),
    ]);
};

export { fetchPredictionsByFixturesIds, fetchPredictionByFixtureId };