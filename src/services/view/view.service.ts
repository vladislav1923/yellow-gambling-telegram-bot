import { FixturesResponseDto } from '../../api/dto/fixtures-response.dto';
import { PredictionDetailsDto } from '../../api/dto/prediction-details.dto';
import { CompetitionsIdsEnum } from '../../enums/competitions-ids.enum';
import { FixtureDto } from '../../api/dto/fixture.dto';
import { getMoscowTime, getToday } from '../../utils/utils';
import { DatePatternsEnum } from '../../enums/date-patterns.enum';

const createFixturesListMessage = (
    fixturesByLeagues: FixturesResponseDto[],
    predictionsMap: Map<string, PredictionDetailsDto>,
): string => {
    const matchesListTitle = getMatchesListTitle();
    const result = fixturesByLeagues.map((fixturesByLeague: FixturesResponseDto) => {
        return createFeaturesListByLeagueMessage(fixturesByLeague, predictionsMap);
    });

    return `${matchesListTitle}\n${result.join('\n\n')}`;
};

const getMatchesListTitle = (): string => {
    return `<b>Матчи на ${getToday(DatePatternsEnum.RussianDatePattern)}</b>`;
};

const createFeaturesListByLeagueMessage = (
    fixturesResponse: FixturesResponseDto,
    predictionsMap: Map<string, PredictionDetailsDto>,
): string => {
    if (fixturesResponse.response.length === 0) {
        return '';
    }

    const leagueTitle = createLeagueTitle(fixturesResponse);
    const fixturesListView = createFixturesListView(fixturesResponse.response, predictionsMap);

    return `<b>${leagueTitle}</b>\n\n${fixturesListView}`;
};

const createLeagueTitle = (fixturesResponse: FixturesResponseDto): string => {
    const leagueId = fixturesResponse.parameters
        ? fixturesResponse.parameters['league'] as CompetitionsIdsEnum
        : null;

    switch (leagueId) {
    case CompetitionsIdsEnum.ChampionsLeagueId:
        return 'Лига Чемпионов 🇪🇺';
    case CompetitionsIdsEnum.RussianLeagueId:
        return 'Российская Премьер Лига 🇷🇺';
    case CompetitionsIdsEnum.EnglandLeagueId:
        return 'Английская Премьер Лига 🏴󠁧󠁢󠁥󠁮󠁧󠁿';
    default:
        return 'Остальное';
    }
};

const createFixturesListView = (
    fixtures: FixtureDto[],
    predictionsMap: Map<string, PredictionDetailsDto>,
): string => {
    const fixturesViews = fixtures.map((fixture: FixtureDto) => {
        const fixtureId = String(fixture.fixture?.id);
        const prediction = predictionsMap.has(fixtureId)
            ? predictionsMap.get(fixtureId)
            : undefined;

        return createFixtureView(fixture, prediction);
    });

    return fixturesViews.join('\n\n');
};

const createFixtureView = (
    fixtures: FixtureDto,
    prediction: PredictionDetailsDto | undefined,
): string => {
    const { fixture, teams } = fixtures;
    if (!fixture || !teams || !prediction) {
        return '';
    }
    const { home, away } = teams;
    if (!home || !away) {
        return '';
    }

    const moscowTime = getMoscowTime(fixture.date);
    const teamsTitle = `${home.name} vs ${away.name} ${moscowTime}`;
    const { advice } = prediction;

    return `${teamsTitle}\n${advice}`;
};

export { createFixturesListMessage };