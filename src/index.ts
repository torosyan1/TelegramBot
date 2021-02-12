import axios from 'axios';
import express from 'express';
import schedule from 'node-schedule';
import moment from 'moment-timezone';
import TelegramBot from 'node-telegram-bot-api';
const app = express();
const bot = new TelegramBot('botToken', { polling: true });
const nowHours = moment.tz(new Date(), 'Europe/London').hours()
    schedule.scheduleJob(' */1 * * * *', async () => {
        const dogCoinData =  (await axios.get('https://api.cryptonator.com/api/ticker/doge-usd')).data.ticker
        if(dogCoinData.change > 0 && nowHours >= 10 && nowHours <= 23){
            bot.sendMessage('userID', `${dogCoinData.price} USD`);
        }
    });
app.listen(3000, () => console.log('listening on port 3000!'));