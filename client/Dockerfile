FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]