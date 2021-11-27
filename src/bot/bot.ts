import { Telegraf, Markup } from 'telegraf';
import { commandsList } from '../constants/commands-list';
import { leaguesMap } from '../constants/leagues-map';
import { getMatches } from '../services/matches/matches.service';
import { PlannedMatchesResponseDto } from '../api/dto/planned-matches-response.dto';
import { PlannedMatchDto } from '../api/dto/planned-match.dto';

const startBot = (token: string): void => {
    const bot = new Telegraf(token);
    bot.start((ctx) => {
        ctx.setMyCommands(commandsList);
        ctx.reply('Wel come click /matches');
    });
    bot.command('matches', (ctx) => {
        const leaguesButtons = [];
        for (const [id, name] of leaguesMap) {
            leaguesButtons.push(Markup.button.callback(name, id));
        }
        ctx.reply('Выбери лигу', Markup.inlineKeyboard(leaguesButtons));
    });
    bot.action(/.+/, async (ctx) => {
        const value = ctx.match[0];

        if (leaguesMap.has(value)) {
            const response: PlannedMatchesResponseDto = await getMatches(value);
            response?.data?.fixtures.forEach((match: PlannedMatchDto) => {
                ctx.reply(`
                    ${match.home_name} vs ${match.away_name}
                `);
            });
        }
    });
    bot.help((ctx) => ctx.reply('Помоги себе сам'));
    bot.on('text', (ctx) => {
        ctx.reply('Ничего не понял. Ильдар, это ты? Посмотри команды здесь /help');
    });
    bot.hears('hi', (ctx) => ctx.reply('Hey there'));
    bot.launch();

    // Enable graceful stop
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
};

export { startBot };