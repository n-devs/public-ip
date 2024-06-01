FROM node:18

# RUN mkdir /files
WORKDIR /files

COPY package*.json ./

RUN npm install

COPY index.js ./


CMD [ "npm", "start" ]

