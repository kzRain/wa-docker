// const fs = require('fs')
// const Downloader = require('./downloader')
// const _ = require('lodash')
// const downloadManager = new Downloader()
const { WebSocket } = require('ws')

class WebSocketService {
    constructor(client, wss) {
        this.client = client
        this.wss = wss
    }

    async handleMessage(e) {
        let i;
        let obj = JSON.parse(e);
        // let filePath;
        if (obj.type === 'send_message') {
            let numbers = obj.data
            let options = {}
            for (i in numbers) {
                options = numbers[i].options !== undefined ? numbers[i].options : {}
                await this.client.sendMessage(`${numbers[i].number}@c.us`, numbers[i].message, options)
            }
        } else if (obj.type === 'check_number') {
            let numbers = obj.data
            this.client.isRegisteredUser(`${numbers[0].number}@c.us`).then(rs => {
                this.wss.clients.forEach(function each(cli) {
                    if (cli.readyState === WebSocket.OPEN) {
                            cli.send(JSON.stringify({result: rs}));
                        }
                    });
                }
            );
        } else if (obj.type === 'checkWa') {
            let numbers = obj.data
            this.client.isRegisteredUser(numbers[0].to).then(rs => {
                this.wss.clients.forEach(function each(cli) {
                        if (cli.readyState === WebSocket.OPEN) {
                            cli.send(JSON.stringify({result: rs}));
                        }
                    });
                }
            );
        } else if (obj.type === 'sendWa') {
            //  let validType = ['text', 'image', 'document', 'location', 'video']
            let numbers = obj.data
            let options = {}
            let tmpAttachment = {}
            for (i in numbers) {
                options = numbers[i].options !== undefined ? numbers[i].options : {}
                // if (options.media) {
                //     options.media = new MessageMedia(options.media.mimetype, options.media.b64data, options.media.filename)
                // }
                //
                // if (numbers[i].url_public) {
                //     filePath = config.folderDownload + "/" + numbers[i].url_public.substring(numbers[i].url_public.lastIndexOf('/') + 1);
                //     await downloadManager.download(numbers[i].url_public, filePath)
                //         .then(fileInfo => numbers[i].attachment = fileInfo.path)
                //         .catch(err => console.log(err))
                // }
                //
                // if (numbers[i].attachment !== undefined) {
                //     if (numbers[i].attachment) {
                //         if (fs.existsSync(numbers[i].attachment)) {
                //             if (tmpAttachment[numbers[i].attachment] === undefined) {
                //                 tmpAttachment[numbers[i].attachment] = MessageMedia.fromFilePath(numbers[i].attachment)
                //             }
                //             options['media'] = tmpAttachment[numbers[i].attachment]
                //         }
                //     }
                // }
                // // jika mimetype tidak ada dalam list mimetypecaption maka kirim dulu captionnya scecara terpisah
                // if (options.media) {
                //     if (!_.includes(config.mimetypeCaption, options.media.mimetype)) {
                //         if (!_.isEmpty(numbers[i].message)) {
                //             await client.sendMessage(numbers[i].to, numbers[i].message)
                //         }
                //     }
                // }

                await this.client.sendMessage(numbers[i].to, numbers[i].message, options)
            }
            tmpAttachment = {}
        }
    }

}

module.exports = WebSocketService;
