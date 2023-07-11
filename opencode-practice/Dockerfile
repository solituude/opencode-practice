FROM node:latest
EXPOSE 3000
COPY package.json ./
COPY . .
RUN npm install
CMD ["npm", "start"]