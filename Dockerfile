FROM node:18

# RUN mkdir /files
WORKDIR /public-ip

COPY package*.json ./

RUN npm install

COPY index.js ./


CMD [ "npm", "start" ]

