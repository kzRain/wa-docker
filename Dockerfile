FROM node:19

WORKDIR /usr/src/app

RUN git clone https://github.com/kzRain/wa-docker.git

WORKDIR /usr/src/app/wa-docker
RUN npm install

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list
RUN apt-get update && apt-get -y install google-chrome-stable

COPY ./config.json ./

EXPOSE 7777
CMD [ "node", "index.js" ]
