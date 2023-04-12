FROM node:latest
WORKDIR /smarter-lite
COPY . .
RUN npm install
RUN webpack --config ./webpack.config.js
RUN tsc
EXPOSE 9001
ENTRYPOINT [ "node",  "./server/server.js"]
