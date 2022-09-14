FROM node:latest

WORKDIR /usr/softclever/identificacao

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npx", "prisma", "generate"]
CMD ["npm", "run", "dev"]