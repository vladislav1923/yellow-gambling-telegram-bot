import { PredictionCompetitionClustersEnum } from '../enums/prediction-competition-clusters.enum';

export const leaguesTitles = new Map<PredictionCompetitionClustersEnum, string>()
    .set(PredictionCompetitionClustersEnum.Russia, 'Российская Премьер Лига')
    .set(PredictionCompetitionClustersEnum.Spain, 'Испанская Примера')
    .set(PredictionCompetitionClustersEnum.Italy, 'Итальянская Серия А')
    .set(PredictionCompetitionClustersEnum.England, 'Английская Премьер Лига')
    .set(PredictionCompetitionClustersEnum.ChampionsLeague, 'Лига Чемпионов')
    .set(PredictionCompetitionClustersEnum.EuropaLeague, 'Лига Европы');