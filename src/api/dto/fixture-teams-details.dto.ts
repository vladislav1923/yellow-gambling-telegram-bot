import { JsonProperty, Serializable } from 'typescript-json-serializer';
import { BaseDto } from './base.dto';
import { FixtureTeamDto } from './fixture-team.dto';

@Serializable()
export class FixtureTeamsDetailsDto extends BaseDto {
    @JsonProperty() home: FixtureTeamDto | null = null;
    @JsonProperty() away: FixtureTeamDto | null = null;
}
