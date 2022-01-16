FROM node

WORKDIR /app

COPY package* /app/

RUN npm install

COPY . /app/

EXPOSE 5000

ENV PORT=5000


RUN npm run build

CMD ["node", "dist/src/index.js"]
