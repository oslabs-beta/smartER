FROM node:18.13.0
WORKDIR /smarter-lite
COPY . .
RUN npm install
EXPOSE 8080
CMD ["npm", "run", "start"]
