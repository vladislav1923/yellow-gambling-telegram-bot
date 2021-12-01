import { fetchFixturesByLeagueId } from '../../api/fixtures/fixtures.api';
import { CompetitionsIdsEnum } from '../../enums/competitions-ids.enum';

const getFixtures = async () => {
    const result = await fetchFixturesByLeagueId(CompetitionsIdsEnum.EnglandLeagueId);
    console.log(result.response);
};

export { getFixtures };