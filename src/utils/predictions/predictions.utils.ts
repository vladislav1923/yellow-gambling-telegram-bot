import { FixtureDto } from '../../api/dto/fixture.dto';
import { PredictionDetailsDto } from '../../api/dto/prediction-details.dto';
import { PredictionNameEnum } from '../../enums/prediction-name.enum';
import { FixtureTeamsDetailsDto } from '../../api/dto/fixture-teams-details.dto';
import { FixtureTeamDto } from '../../api/dto/fixture-team.dto';

const prepareAdvice = (
    fixture: FixtureDto,
    prediction: PredictionDetailsDto | undefined,
): string => {
    if (!prediction || !prediction.advice) {
        return '';
    }

    const { advice, under_over, winner } = prediction;
    const { teams } = fixture;
    if (!teams) {
        return '';
    }

    const predictionName = advice?.split(' : ')[0] as PredictionNameEnum;

    switch (predictionName) {
    case PredictionNameEnum.Winner:
        return prepareWinnerPrediction(winner, teams);
    case PredictionNameEnum.ComboWinner:
        return prepareComboWinnerPrediction(under_over, winner, teams);
    case PredictionNameEnum.DoubleChance:
        return prepareDoubleChancePrediction(advice, teams);
    case PredictionNameEnum.ComboDoubleChance:
        return prepareComboDoubleChancePrediction(advice, under_over, teams);
    default:
        return '';
    }
};

const prepareWinnerPrediction = (
    winner: FixtureTeamDto | null,
    teams: FixtureTeamsDetailsDto,
): string => {
    if (!winner) {
        return '';
    }

    if (teams.home?.name === winner?.name) {
        return 'Победитель 1';
    } else {
        return 'Победитель 2';
    }
};

const prepareComboWinnerPrediction = (
    underOver: string | null,
    winner: FixtureTeamDto | null,
    teams: FixtureTeamsDetailsDto,
): string => {
    if (!underOver) {
        return '';
    }

    const winnerName = prepareWinnerPrediction(winner, teams);

    const total = prepareTotal(underOver);

    return `${winnerName} и ${total}`;
};

const prepareDoubleChancePrediction = (
    advice: string,
    teams: FixtureTeamsDetailsDto,
): string => {
    if (advice.includes(String(teams.home?.name))) {
        return '1X';
    } else {
        return 'Х2';
    }
};

const prepareComboDoubleChancePrediction = (
    advice: string,
    underOver: string | null,
    teams: FixtureTeamsDetailsDto,
): string => {
    const doubleChanceTeam = prepareDoubleChancePrediction(advice, teams);

    if (!underOver) {
        return doubleChanceTeam;
    }

    const total = prepareTotal(underOver);

    return `${doubleChanceTeam} и ${total}`;
};

const prepareTotal = (underOver: string): string => {
    const pointer = underOver[0];
    const value = underOver.substring(1);

    if (pointer === '+') {
        return `ТБ${value}`;
    } else {
        return `ТМ${value}`;
    }
};

export { prepareAdvice };