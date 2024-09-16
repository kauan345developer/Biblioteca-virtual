FROM node:alpine
ARG VITE_SERVER_URL=http://127.0.0.1:7999
ENV VITE_SERVER_URL=$VITE_SERVER_URL
WORKDIR /biblioteca
COPY public/ /biblioteca/public
COPY src/ /biblioteca/src
COPY index.html /biblioteca/
COPY package.json /biblioteca/
COPY vite.config.js /biblioteca/
RUN npm install
RUN npm run build
