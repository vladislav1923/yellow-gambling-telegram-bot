import { env, exit } from 'process';
import { getToday } from '../../utils/utils';
import { DataInterface } from '../../interfaces/data.interface';
import { AxiosRequestHeaders } from 'axios';
import { get } from '../base';
import { FixturesListDto } from '../dto/fixtures-list.dto';

const fetchFixturesByLeagueId = async (leagueId: string): Promise<FixturesListDto> => {
    const { RAPID_API_TOKEN, FOOTBALL_API_HOST, FOOTBALL_API_URL } = env;

    if (!RAPID_API_TOKEN || !FOOTBALL_API_HOST || !FOOTBALL_API_URL) {
        console.error('Env variables are not defined');
        exit(1);
    }

    const today = getToday();
    const url = `${FOOTBALL_API_URL}/fixtures`;
    const params: DataInterface = {
        date: today,
        league: leagueId,
        season: '2021',
    };
    const headers: AxiosRequestHeaders = {
        'x-rapidapi-host': FOOTBALL_API_HOST,
        'x-rapidapi-key': RAPID_API_TOKEN,
    };

    return get<FixturesListDto>(url, FixturesListDto, params, headers);
};

export { fetchFixturesByLeagueId };