FROM node:latest
WORKDIR /smarter-lite
COPY . .
RUN npm install
RUN npm run tsc
RUN npm run build2
EXPOSE 9001
ENTRYPOINT [ "node",  "./server/server.js"]
