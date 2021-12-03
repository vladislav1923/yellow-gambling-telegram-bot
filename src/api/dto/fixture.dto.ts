import { JsonProperty, Serializable } from 'typescript-json-serializer';
import { BaseDto } from './base.dto';
import { FixtureDetailsDto } from './fixture-details.dto';
import { FixtureTeamsDetailsDto } from './fixture-teams-details.dto';
import { FixtureLeagueDetailsDto } from './fixture-league-details.dto';

@Serializable()
export class FixtureDto extends BaseDto {
    @JsonProperty() fixture: FixtureDetailsDto | null = null;
    @JsonProperty() teams: FixtureTeamsDetailsDto | null = null;
    @JsonProperty() league: FixtureLeagueDetailsDto | null = null;
}
