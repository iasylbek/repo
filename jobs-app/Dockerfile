# backend/Dockerfile
FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV PORT=5000
ENV MONGO_URI=mongodb://mongo:27017/mydatabase
ENV JWT_SECRET=your_jwt_secret

EXPOSE 5000

CMD ["npm", "start"]
