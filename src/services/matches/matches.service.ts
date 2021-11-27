import { fetchLeaguesMatchesForToday } from '../../api/matches/matches.api';
import { PlannedMatchesResponseDto } from '../../api/dto/planned-matches-response.dto';

const getMatches = async (leagueId: string): Promise<PlannedMatchesResponseDto> => {
    const response = await fetchLeaguesMatchesForToday(leagueId);
    return response;
};

export { getMatches };