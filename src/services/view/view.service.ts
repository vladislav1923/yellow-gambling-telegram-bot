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

    return createFixturesListView(fixturesResponse.response, predictionsMap);
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
    const { fixture, teams, league } = fixtures;
    if (!fixture || !teams || !league || !prediction) {
        return '';
    }
    const { home, away } = teams;
    if (!home || !away) {
        return '';
    }

    const moscowTime = getMoscowTime(fixture.date);
    const leagueIcon = getLeagueEmoji(league?.id);
    const teamsTitle = `${leagueIcon}󠁥󠁮󠁧 <b>${home.name} vs ${away.name}</b> ${moscowTime}`;
    const { advice } = prediction;

    return `${teamsTitle}\n${advice}`;
};

const getLeagueEmoji = (leagueId: number | null): string => {
    const leagueIdAsString = String(leagueId);
    switch (leagueIdAsString) {
    case CompetitionsIdsEnum.ChampionsLeagueId:
        return '🇪🇺';
    case CompetitionsIdsEnum.RussianLeagueId:
        return '🇷🇺';
    case CompetitionsIdsEnum.EnglandLeagueId:
        return '🏴󠁧󠁢󠁥󠁮󠁧󠁿';
    default:
        return '';
    }
};

export { createFixturesListMessage };