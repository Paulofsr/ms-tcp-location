FROM alpine:3.12

RUN apk update && \
    apk add nodejs && \
    apk add nodejs-npm && \
    mkdir /app && \
    npm install nodemon@2.0.4 -g

WORKDIR /app

COPY ./ .

RUN npm i

EXPOSE 9000

CMD ["npm", "start"]
