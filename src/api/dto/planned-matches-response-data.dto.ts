import { PlannedMatchDto } from './planned-match.dto';
import { JsonProperty, Serializable } from 'typescript-json-serializer';
import { BaseDto } from './base.dto';

@Serializable()
export class PlannedMatchesResponseDataDto extends BaseDto {
    @JsonProperty() fixtures: PlannedMatchDto[] = [];
}