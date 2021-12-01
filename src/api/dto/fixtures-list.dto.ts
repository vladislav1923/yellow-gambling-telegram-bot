import { JsonProperty, Serializable } from 'typescript-json-serializer';
import { BaseDto } from './base.dto';
import { FixtureDto } from './fixture.dto';

@Serializable()
export class FixturesListDto extends BaseDto {
    @JsonProperty() response: FixtureDto[] = [];
}