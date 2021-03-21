FROM node:10

# создание директории приложения
WORKDIR /server

# установка зависимостей
# символ астериск ("*") используется для того чтобы по возможности 
# скопировать оба файла: package.json и package-lock.json
COPY . /server

RUN npm install
# Если вы создаете сборку для продакшн
# RUN npm ci --only=production

EXPOSE 8080

CMD [ "npm", "start" ]
