import { Telegraf } from 'telegraf';
import { commandsList } from '../constants/commands-list';
import { CommandsEnum } from '../enums/commands.enum';
import { welcomeMessage } from '../constants/welcome-message';
import { helpMessage } from '../constants/help-message';
import { defaultMessage } from '../constants/default-message';
import { errorMessage } from '../constants/error-message';
import { getFixturesListMessage } from '../services/fixtures/fixtures.service';
import { initCacheStore } from '../services/cache/cache.service';

const launchBot = async (token: string): Promise<void> => {
    await initCacheStore();

    const bot = new Telegraf(token);
    bot.start((ctx) => {
        ctx.setMyCommands(commandsList);
        ctx.reply(welcomeMessage);
    });
    bot.command(CommandsEnum.Matches, async (ctx) => {
        try {
            const message = await getFixturesListMessage();
            await ctx.replyWithHTML(message);
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

    console.log('Bot launched');

    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
};

export { launchBot };