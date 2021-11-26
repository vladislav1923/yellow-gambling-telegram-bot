import {Telegraf} from 'telegraf';
import {commandsList} from '../constants/commands-list';

const startBot = (token: string): void => {
    const bot = new Telegraf(token);
    bot.start((ctx) => {
        ctx.setMyCommands(commandsList);
        ctx.reply('Wel come click /help');
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