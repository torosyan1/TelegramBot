import axios from 'axios';
import express from 'express';
import schedule from 'node-schedule';
import moment from 'moment-timezone';
import TelegramBot from 'node-telegram-bot-api';

const app = express();

const bot = new TelegramBot('1637315126:AAHJVp8FNBssJSwiDRMfkQGs0c20FsvQFCg', { polling: true });

const nowHours = moment.tz(new Date(), 'Europe/London').hours()

schedule.scheduleJob('* */3 * * *', async () => {

    const dogCoinData = (await axios.get('https://api.cryptonator.com/api/ticker/doge-usd')).data.ticker
    
    if (dogCoinData.change > 0 && nowHours >= 10 && nowHours <= 23) {
        bot.sendMessage('-1001374073373', `price : ${dogCoinData.price}$ USD\nchange : ${dogCoinData.change}$ USD `);
    }
});

app.listen(3000, () => console.log('listening on port 3000!'));
