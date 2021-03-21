FROM node:10

WORKDIR /server

COPY . /server

RUN npm install

EXPOSE 8080

CMD [ "npm", "start" ]
