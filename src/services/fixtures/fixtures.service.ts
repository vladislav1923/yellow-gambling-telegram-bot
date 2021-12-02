import { fetchFixturesByLeaguesIds } from '../../api/fixtures/fixtures.api';
import { CompetitionsIdsEnum } from '../../enums/competitions-ids.enum';
import { boringDayMessage } from '../../constants/boring-day-message';
import { createPredictionsMap, extractFixturesIds } from '../../utils/utils';
import { fetchPredictionsByFixturesIds } from '../../api/predictions/predictions.api';
import { createFixturesListMessage } from '../view/view.service';

const getFixturesListMessage = async (): Promise<string> => {
    const leaguesIds: string[] = Object.values(CompetitionsIdsEnum);
    const fixturesByLeagues = await fetchFixturesByLeaguesIds(leaguesIds);
    const fixturesIds = extractFixturesIds(fixturesByLeagues);
    if (fixturesIds.length === 0) {
        return boringDayMessage;
    }
    const predictionsList = await fetchPredictionsByFixturesIds(fixturesIds);
    const predictionsMap = createPredictionsMap(predictionsList);

    return createFixturesListMessage(fixturesByLeagues, predictionsMap);
};

export { getFixturesListMessage };