import { JsonProperty, Serializable } from 'typescript-json-serializer';
import { BaseDto } from './base.dto';
import { PredictionDto } from './prediction.dto';

@Serializable()
export class PredictionsResponseDto extends BaseDto {
    @JsonProperty() data: PredictionDto[] = [];
}