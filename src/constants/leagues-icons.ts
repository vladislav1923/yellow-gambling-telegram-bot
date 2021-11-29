import { PredictionCompetitionClustersEnum } from '../enums/prediction-competition-clusters.enum';

export const leaguesIcons = new Map<PredictionCompetitionClustersEnum, string>()
    .set(PredictionCompetitionClustersEnum.Russia, ' 🇷🇺 ')
    .set(PredictionCompetitionClustersEnum.Spain, ' 🇪🇸 ')
    .set(PredictionCompetitionClustersEnum.Italy, ' 🇮🇹 ')
    .set(PredictionCompetitionClustersEnum.England, ' 🏴󠁧󠁢󠁥󠁮󠁧󠁿 ')
    .set(PredictionCompetitionClustersEnum.ChampionsLeague, ' 🇪🇺 ')
    .set(PredictionCompetitionClustersEnum.EuropaLeague, ' 🇪🇺 ');