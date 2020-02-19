FROM node:10

COPY ["package.json", "package-lock.json", "/usr/src/"]

WORKDIR /usr/src

RUN rm -rf node_modules

RUN npm install

COPY [".", "/usr/src/"]

EXPOSE 3000

CMD ["npm", "run", "dev"]