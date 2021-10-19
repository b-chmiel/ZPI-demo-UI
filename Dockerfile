FROM node:16.10-alpine
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY ./ ./
RUN yarn
CMD ["yarn", "run", "start"]
