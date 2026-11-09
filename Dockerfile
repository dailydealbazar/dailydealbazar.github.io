# Written by blitz.cloud for this project. It is yours now: blitz.cloud
# builds from it as it is, and you can change it like any other file.
FROM nginxinc/nginx-unprivileged:1.27-alpine
COPY . /usr/share/nginx/html
EXPOSE 8080
