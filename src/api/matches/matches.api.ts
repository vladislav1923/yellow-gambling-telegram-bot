import { get } from '../base';
import { getToday } from '../../utils/utils';
import { DataInterface } from '../../interfaces/data.interface';
import { exit, env } from 'process';
import { PlannedMatchesResponseDto } from '../dto/planned-matches-response.dto';

const fetchLeaguesMatchesForToday = async (leagueId: string): Promise<PlannedMatchesResponseDto> => {
    const { API_TOKEN, API_SECRET } = env;

    if (!API_TOKEN || !API_SECRET) {
        console.error('API_KEY or API_SECRET are not defined');
        exit(1);
    }

    const today = getToday();
    const params: DataInterface = {
        competition_id: leagueId,
        date: today,
        key: API_TOKEN,
        secret: API_SECRET,
    };

    return get<PlannedMatchesResponseDto>('api-client/fixtures/matches.json', params);
};

export { fetchLeaguesMatchesForToday };
