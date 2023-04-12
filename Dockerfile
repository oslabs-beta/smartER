FROM ts-node:latest
WORKDIR /smarter-lite
COPY . .
RUN npm install
RUN npm run build
EXPOSE 9001
ENTRYPOINT [ "ts-node",  "./server/server.ts"]
