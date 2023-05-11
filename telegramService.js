const fetch = require('node-fetch')
const config = require ("./config.json");

class TelegramService {
    constructor (client) {
        this.client = client
    }

    async sendMessage(data) {
        const body = {a: data};

        const response = await fetch(config.telegram.url, {
            method: 'post',
            body: data,//JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        });
        const result = await response.text();

        console.log(result);
    }
}
module.exports = TelegramService;
