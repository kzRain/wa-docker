const TelegramService = require('./telegramService')
const WebSocketService = require('./webSocket')
const WhatsAppService = require('./whatsApp')
const config = require('./config.json')
const qrcode = require('qrcode-terminal')
const { WebSocketServer} = require('ws')

const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: config.puppeteer
});

const wss = new WebSocketServer({
    port: config.websocketPort
})

wss.on('connection', ws => {
    ws.on('message', async message => {
        await wsService.handleMessage(message);
    })
});


const service = new TelegramService(client);
const wsService = new WebSocketService(client, wss);
const waService = new WhatsAppService(client);
client.on('qr', async qr => {
    if (config.telegram.url!==undefined) {
        await service.sendMessage(qr)
    } else {
        qrcode.generate(qr, {small: true});
    }
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {
    console.log('MESSAGE RECEIVED', msg);
    await waService.handleWAMessage(msg);
});

client.initialize();




