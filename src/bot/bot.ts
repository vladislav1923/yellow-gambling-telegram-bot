import { Telegraf } from 'telegraf';
import { commandsList } from '../constants/commands-list';
import { getPredictionsMessage } from '../services/predictions/predictions.service';
import { CommandsEnum } from '../enums/commands.enum';
import { welcomeMessage } from '../constants/welcome-message';
import { helpMessage } from '../constants/help-message';
import { defaultMessage } from '../constants/default-message';
import { errorMessage } from '../constants/error-message';

const startBot = (token: string): void => {
    const bot = new Telegraf(token);
    bot.start((ctx) => {
        ctx.setMyCommands(commandsList);
        ctx.reply(welcomeMessage);
    });
    bot.command(CommandsEnum.Predictions, async (ctx) => {
        try {
            const predictionMessage = await getPredictionsMessage();
            ctx.reply(predictionMessage);
        } catch (e) {
            console.error(e);
            ctx.reply(errorMessage);
        }
    });
    bot.help((ctx) => ctx.reply(helpMessage));
    bot.on('text', (ctx) => {
        ctx.reply(defaultMessage);
    });
    bot.launch();

    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
};

export { startBot };