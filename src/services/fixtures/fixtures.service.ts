import { fetchFixturesByLeaguesIds } from '../../api/fixtures/fixtures.api';
import { CompetitionsIdsEnum } from '../../enums/competitions-ids.enum';
import { boringDayMessage } from '../../constants/boring-day-message';
import { createPredictionsMap, extractFixturesIds, getToday } from '../../utils/utils';
import { fetchPredictionsByFixturesIds } from '../../api/predictions/predictions.api';
import { createFixturesListMessage } from '../view/view.service';
import { getMessageToCache, setMessageToCache } from '../cache/cache.service';

const getFixturesListMessage = async (): Promise<string> => {
    const today = getToday();
    const cacheMessage = getMessageToCache(today);
    if (cacheMessage) {
        console.log('return message from cache');
        return cacheMessage;
    }

    const leaguesIds: string[] = Object.values(CompetitionsIdsEnum);
    const fixturesByLeagues = await fetchFixturesByLeaguesIds(leaguesIds);
    const fixturesIds = extractFixturesIds(fixturesByLeagues);

    if (fixturesIds.length === 0) {
        setMessageToCache(today, boringDayMessage);
        return boringDayMessage;
    }

    const predictionsList = await fetchPredictionsByFixturesIds(fixturesIds);
    const predictionsMap = createPredictionsMap(predictionsList);
    const message = createFixturesListMessage(fixturesByLeagues, predictionsMap);

    setMessageToCache(today, message);

    return message;
};

export { getFixturesListMessage };