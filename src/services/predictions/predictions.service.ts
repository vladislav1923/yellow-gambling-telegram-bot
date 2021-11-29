import { PredictionDto } from '../../api/dto/prediction.dto';
import { fetchPredictions } from '../../api/predictions/predictions.api';
import { PredictionCompetitionClustersEnum } from '../../enums/prediction-competition-clusters.enum';
import { PredictionCompetitionNameEnum } from '../../enums/prediction-competition-name.enum';
import { PredictionStatusesEnum } from '../../enums/prediction-statuses.enum';
import { leaguesTitles } from '../../constants/leagues-titles';
import { leaguesIcons } from '../../constants/leagues-icons';

const getPredictionsMessage = async (): Promise<string> => {
    const response = await fetchPredictions();
    console.log('response', response);
    const predictions = filterPredictions(response.data);

    return createPredictionMessage(predictions);
};

const createPredictionMessage = (predictions: PredictionDto[]): string => {
    if (!predictions || predictions.length === 0) {
        return 'На сегодня ничего нет, приходи завтра';
    }

    const leagues: Map<PredictionCompetitionClustersEnum, PredictionDto[]> = new Map();

    predictions.forEach((prediction: PredictionDto) => {
        if (!prediction.competition_cluster) {
            return;
        }

        if (leagues.has(prediction.competition_cluster)) {
            const leaguePredictions = leagues.get(prediction.competition_cluster) as PredictionDto[];
            const copiedLeaguePredictions = [...leaguePredictions];
            copiedLeaguePredictions.push(prediction);

            leagues.set(prediction.competition_cluster, copiedLeaguePredictions);
        } else {
            const leaguePredictions = [prediction];
            leagues.set(prediction.competition_cluster, leaguePredictions);
        }
    });

    const predictionsViews: string[] = [];

    for (const [league, predictions] of leagues) {
        const leagueTitle = leaguesTitles.get(league);
        const leagueView = `${leagueTitle} ${leaguesIcons.get(league)} \n`;
        const leaguePredictionsView = predictions.map((prediction: PredictionDto) => {
            return `
                ${prediction.home_team} vs ${prediction.away_team} \n
                Прогноз: ${prediction.prediction} \n
                ${prediction.is_expired ? 'Результат: ' + prediction.result : ''}
                ${prediction.is_expired ? ' ' + getStatusEmoji(prediction.status) : ''} \n
            `;
        });

        predictionsViews.push(`${leagueView}${leaguePredictionsView}`);
    }

    return predictionsViews.join('\n\n');
};

const getStatusEmoji = (status: PredictionStatusesEnum | null): string => {
    switch (status) {
    case PredictionStatusesEnum.Won:
        return ' 💃🏻 ';
    case PredictionStatusesEnum.Lost:
        return ' 😖 ';
    default:
        return '';
    }
};

const filterPredictions = (predictions: PredictionDto[]): PredictionDto[] => {
    return predictions.filter((prediction: PredictionDto) => {
        switch (prediction.competition_cluster) {
        case PredictionCompetitionClustersEnum.ChampionsLeague:
        case PredictionCompetitionClustersEnum.EuropaLeague:
            return true;
        case PredictionCompetitionClustersEnum.England:
            return prediction.competition_name === PredictionCompetitionNameEnum.EnglandHighLeague;
        case PredictionCompetitionClustersEnum.Italy:
            return prediction.competition_name === PredictionCompetitionNameEnum.ItalianHighLeague;
        case PredictionCompetitionClustersEnum.Spain:
            return prediction.competition_name === PredictionCompetitionNameEnum.SpainHighLeague;
        case PredictionCompetitionClustersEnum.Russia:
            return prediction.competition_name === PredictionCompetitionNameEnum.RussianHighLeague;
        default:
            return false;
        }
    });
};

export { getPredictionsMessage };