import { JsonProperty, Serializable } from 'typescript-json-serializer';
import { BaseDto } from './base.dto';
import { FixtureStatusesEnum } from '../../enums/fixture-statuses.enum';

@Serializable()
export class FixtureStatusDto extends BaseDto {
    @JsonProperty() short: FixtureStatusesEnum | null = null;
}
