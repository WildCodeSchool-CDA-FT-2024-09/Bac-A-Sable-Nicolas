FROM node:lts-alpine AS dev

WORKDIR /app
COPY *.json ./
RUN npm i
COPY src src

EXPOSE 3000

CMD ["npm", "run", "dev"]