FROM node:lts-alpine AS dev

WORKDIR /app
COPY *.json ./
RUN npm i

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]