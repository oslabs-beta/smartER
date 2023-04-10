FROM node:18.13.0
WORKDIR /smarter-lite
COPY . .
RUN npm install
EXPOSE 3000
ENTRYPOINT [ "node", "./server/server.ts" ]
CMD ["npm", "run", "start"]
