import 'dotenv/config';
import { startBot } from './bot/bot';

const token = process.env.BOT_TOKEN;

if (!token) {
    process.exit();
}

startBot(token);
