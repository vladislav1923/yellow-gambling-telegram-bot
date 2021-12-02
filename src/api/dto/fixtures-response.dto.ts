import { JsonProperty, Serializable } from 'typescript-json-serializer';
import { BaseDto } from './base.dto';
import { FixtureDto } from './fixture.dto';
import { DataInterface } from '../../interfaces/data.interface';

@Serializable()
export class FixturesResponseDto extends BaseDto {
    @JsonProperty() parameters: DataInterface | null = null;
    @JsonProperty() response: FixtureDto[] = [];
}