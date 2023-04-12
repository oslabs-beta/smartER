FROM node:latest
WORKDIR /smarter-lite
COPY . .
RUN npm install
RUN tsc
RUN webpack --config ./webpack.config.js
EXPOSE 9001
ENTRYPOINT [ "node",  "./server/server.js"]
