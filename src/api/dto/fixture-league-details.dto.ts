import { JsonProperty, Serializable } from 'typescript-json-serializer';
import { BaseDto } from './base.dto';

@Serializable()
export class FixtureLeagueDetailsDto extends BaseDto {
    @JsonProperty() id: number | null = null;
}
