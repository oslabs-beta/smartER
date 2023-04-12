FROM node:18.12
WORKDIR /smarter-lite
COPY . .
RUN npm install
RUN npm run build
EXPOSE 9001
ENTRYPOINT [ "npx", "nodemon",  "./server/server.ts"]
