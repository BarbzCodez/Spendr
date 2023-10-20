# create web docker image from artifacts
FROM steebchen/nginx-spa:stable
LABEL org.opencontainers.image.source="https://github.com/BarbzCodez/Spendr"
COPY ./.docker/client/static /app
EXPOSE 80
CMD ["nginx"]