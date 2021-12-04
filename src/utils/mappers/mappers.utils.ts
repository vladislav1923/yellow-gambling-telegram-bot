import { FixtureDto } from '../../api/dto/fixture.dto';
import { FixturesResponseDto } from '../../api/dto/fixtures-response.dto';
import { PredictionResponseDto } from '../../api/dto/prediction-response.dto';
import { PredictionDetailsDto } from '../../api/dto/prediction-details.dto';

const extractFixturesIds = (fixturesLists: FixturesResponseDto[]): string[] => {
    const fixturesListsResponses: FixtureDto[][] =
        fixturesLists.map((fixturesList: FixturesResponseDto) => fixturesList.response);
    const flattedList: FixtureDto[] = fixturesListsResponses.flat();
    return flattedList.map((item: FixtureDto) => String(item.fixture?.id));
};

const createPredictionsMap = (predictionsList: PredictionResponseDto[]): Map<string, PredictionDetailsDto> => {
    const map = new Map<string, PredictionDetailsDto>();
    predictionsList.forEach((prediction: PredictionResponseDto) => {
        const { parameters, response } = prediction;
        const fixtureId = parameters ? parameters['fixture'] : null;
        const predictionDetails = response[0] ? response[0].predictions : null;

        if (fixtureId && predictionDetails) {
            map.set(fixtureId, predictionDetails);
        }
    });

    return map;
};

export { extractFixturesIds, createPredictionsMap };