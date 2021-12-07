import { JsonProperty, Serializable } from 'typescript-json-serializer';
import { BaseDto } from './base.dto';
import { FixtureTeamDto } from './fixture-team.dto';

@Serializable()
export class PredictionDetailsDto extends BaseDto {
    @JsonProperty() advice: string | null = null;
    @JsonProperty() under_over: string | null = null;
    @JsonProperty() winner: FixtureTeamDto | null = null;
}
