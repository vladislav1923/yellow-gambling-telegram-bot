import { JsonProperty, Serializable } from 'typescript-json-serializer';
import { BaseDto } from './base.dto';
import { PredictionDto } from './prediction.dto';
import { DataInterface } from '../../interfaces/data.interface';

@Serializable()
export class PredictionResponseDto extends BaseDto {
    @JsonProperty() parameters: DataInterface | null = null;
    @JsonProperty() response: PredictionDto[] = [];
}
