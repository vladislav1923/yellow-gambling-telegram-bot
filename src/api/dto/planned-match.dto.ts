import { JsonProperty, Serializable } from 'typescript-json-serializer';
import { BaseDto } from './base.dto';

@Serializable()
export class PlannedMatchDto extends BaseDto {
    @JsonProperty() id: number | undefined;
    @JsonProperty() home_id: string | undefined;
    @JsonProperty() home_name: string | undefined;
    @JsonProperty() away_id: string | undefined;
    @JsonProperty() away_name: string | undefined;
    @JsonProperty() time: string | undefined;
}