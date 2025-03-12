FROM node

WORKDIR /app

COPY package.json ./

RUN npm install

RUN npx prisma generate

RUN npx prisma migrate dev --name ok

COPY . .

RUN npm run build

CMD ["node", "dist/main.js"]

EXPOSE 3000