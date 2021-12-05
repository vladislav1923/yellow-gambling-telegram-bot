import 'dotenv/config';
import { launchBot } from './bot/bot';

const token = process.env.BOT_TOKEN;

if (!token) {
    process.exit();
}

launchBot(token);
