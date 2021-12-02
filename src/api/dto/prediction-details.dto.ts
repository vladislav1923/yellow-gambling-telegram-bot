import { JsonProperty, Serializable } from 'typescript-json-serializer';
import { BaseDto } from './base.dto';

@Serializable()
export class PredictionDetailsDto extends BaseDto {
    @JsonProperty() advice: string | null = null;
}
