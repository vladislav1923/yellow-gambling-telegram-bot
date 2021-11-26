import {CommandItemInterface} from '../interfaces/commandItem.interface';
import {CommandsEnum} from '../enums/commands.enum';

export const commandsList: CommandItemInterface[] = [
    {
        command: CommandsEnum.Help,
        description: 'Помощь',
    },
];
