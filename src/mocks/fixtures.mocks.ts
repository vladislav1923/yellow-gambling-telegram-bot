import { FixtureDto } from '../api/dto/fixture.dto';
import { FixtureStatusesEnum } from '../enums/fixture-statuses.enum';

const HOME_TEAM_NAME_MOCK = 'Sunderland';
const AWAY_TEAM_NAME_MOCK = 'Newcastle United';

const FIXTURE_MOCK: FixtureDto = {
    fixture: {
        id: 1,
        date: '2021-12-01T23:15:00+03:00',
        timestamp: 1638389700,
        status: {
            short: FixtureStatusesEnum.NotStarted,
        },
    },
    teams: {
        home: {
            id: 2,
            name: HOME_TEAM_NAME_MOCK,
        },
        away: {
            id: 3,
            name: AWAY_TEAM_NAME_MOCK,
        },
    },
    league: {
        id: 4,
    },
};

export {
    HOME_TEAM_NAME_MOCK,
    AWAY_TEAM_NAME_MOCK,
    FIXTURE_MOCK,
};