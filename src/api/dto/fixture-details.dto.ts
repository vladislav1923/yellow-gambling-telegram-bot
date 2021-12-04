import { JsonProperty, Serializable } from 'typescript-json-serializer';
import { BaseDto } from './base.dto';
import { FixtureStatusDto } from './fixture-status.dto';

@Serializable()
export class FixtureDetailsDto extends BaseDto {
    @JsonProperty() id: number | null = null;
    @JsonProperty() date: string | null = null;
    @JsonProperty() timestamp: number | null = null;
    @JsonProperty() status: FixtureStatusDto | null = null;
}
