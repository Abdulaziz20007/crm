FROM node:20-buster

WORKDIR /app

COPY package.json ./

RUN npm install 

COPY . .

RUN npx prisma generate

RUN npm run build

CMD ["node", "dist/main.js"]

EXPOSE 3030