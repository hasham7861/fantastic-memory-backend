FROM node:16-slim
WORKDIR  /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 5000 
CMD ["npm", "run", "dev"]