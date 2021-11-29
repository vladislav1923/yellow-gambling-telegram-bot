import { PredictionDto } from '../../api/dto/prediction.dto';
import { fetchPredictions } from '../../api/predictions/predictions.api';
import { PredictionCompetitionClustersEnum } from '../../enums/prediction-competition-clusters.enum';
import { PredictionCompetitionNameEnum } from '../../enums/prediction-competition-name.enum';
import { PredictionStatusesEnum } from '../../enums/prediction-statuses.enum';
import { leaguesTitles } from '../../constants/leagues-titles';
import { leaguesIcons } from '../../constants/leagues-icons';
import { format } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import ruLocale from 'date-fns/locale/ru/index.js';

const getPredictionsMessage = async (): Promise<string> => {
    const response = await fetchPredictions();
    const predictions = filterPredictions(response?.data ?? []);

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
        const leagueView = `${leagueTitle} ${leaguesIcons.get(league)}`;
        const leaguesPredictionsView = getLeaguesPredictionsView(league, predictions);

        predictionsViews.push(`${leagueView}\n${leaguesPredictionsView}`);
    }

    return predictionsViews.join('\n\n');
};

const getLeaguesPredictionsView = (league: PredictionCompetitionClustersEnum, predictions: PredictionDto[]): string => {
    const leaguePredictionsView = predictions.map((prediction: PredictionDto) => {
        const teamsView = `${prediction.home_team} vs ${prediction.away_team}`;
        const predictionView = `Прогноз: ${prediction.prediction}`;
        const resultView = prediction.is_expired
            ? getResult(prediction)
            : `${getMoscowTime(prediction.start_date)}`;
        return `${teamsView} \n ${predictionView} \n ${resultView}`;
    });

    return leaguePredictionsView.join('\n\n');
};

const getResult = (prediction: PredictionDto): string => {
    if (!prediction.result || prediction.status === PredictionStatusesEnum.Pending) {
        return 'Расчитываем результат';
    }

    return `Результат: ${prediction.result} ${getStatusEmoji(prediction.status)}`;
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

const getMoscowTime = (date: string | null): string => {
    if (!date) {
        return '';
    }
    const moscowDate = zonedTimeToUtc(date, 'Moscow');
    const time = format(moscowDate, 'HH:mm', {
        locale: ruLocale,
    });

    return `${time} МСК`;
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