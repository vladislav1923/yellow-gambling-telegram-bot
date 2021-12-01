import { JsonProperty, Serializable } from 'typescript-json-serializer';
import { BaseDto } from './base.dto';

@Serializable()
export class FixtureTeamDto extends BaseDto {
    @JsonProperty() id: number | null = null;
    @JsonProperty() name: string | null = null;
}
