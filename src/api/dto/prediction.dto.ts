import { JsonProperty, Serializable } from 'typescript-json-serializer';
import { BaseDto } from './base.dto';
import { PredictionStatusesEnum } from '../../enums/prediction-statuses.enum';
import { PredictionCompetitionNameEnum } from '../../enums/prediction-competition-name.enum';
import { PredictionCompetitionClustersEnum } from '../../enums/prediction-competition-clusters.enum';

@Serializable()
export class PredictionDto extends BaseDto {
    @JsonProperty() id: number | null = null;
    @JsonProperty() home_team: string | null = null;
    @JsonProperty() away_team: string | null = null;
    @JsonProperty() start_date: string | null = null;
    @JsonProperty() prediction: string | null = null;
    @JsonProperty() is_expired = false;
    @JsonProperty() result: string | null = null;
    @JsonProperty() status: PredictionStatusesEnum | null = null;
    @JsonProperty() competition_cluster: PredictionCompetitionClustersEnum | null = null;
    @JsonProperty() competition_name: PredictionCompetitionNameEnum | null = null;
}