FROM node:latest

RUN npm install -g webpack@3.0.0
RUN npm install -g webpack-dev-server
RUN npm install -g yarn
COPY ./package.json /package.json
COPY ./webpack.config.js /webpack.config.js
RUN yarn