import { CommandInterface } from '../interfaces/command.interface';
import { CommandsEnum } from '../enums/commands.enum';

export const commandsList: CommandInterface[] = [
    {
        command: CommandsEnum.Predictions,
        description: 'Прогнозы на сегодня',
    },
    {
        command: CommandsEnum.Help,
        description: 'Помощь',
    },
];
