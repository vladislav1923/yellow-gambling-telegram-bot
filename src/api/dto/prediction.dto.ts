import { JsonProperty, Serializable } from 'typescript-json-serializer';
import { BaseDto } from './base.dto';
import { PredictionDetailsDto } from './prediction-details.dto';

@Serializable()
export class PredictionDto extends BaseDto {
    @JsonProperty() predictions: PredictionDetailsDto | null = null;
}
