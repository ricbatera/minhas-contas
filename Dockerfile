FROM nginx:latest

WORKDIR /app

ENV URLSERVIDOR='http://minhascontas.rdrtech.com.br:8081/'

COPY ./dist/contas-pessoais /usr/share/nginx/html

EXPOSE 80