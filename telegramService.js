const fetch = require('node-fetch')
const config = require ("./config.json");

class TelegramService {
    constructor (client) {
        this.client = client
    }

    async sendMessage(type, data) {
        const body = {type: type, data:data};

        const response = await fetch(config.telegram.url, {
            method: 'post',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        });
        const result = await response.json();

        console.log(result);
    }
}
module.exports = TelegramService;
