# 가져올 이미지를 정의
FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]