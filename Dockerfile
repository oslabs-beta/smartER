FROM node:18.12.1
WORKDIR /smarter-lite
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
ENTRYPOINT [ "node", "./server/server.ts" ]