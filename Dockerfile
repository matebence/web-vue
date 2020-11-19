FROM nginx:latest
RUN mkdir -p /app/desktop
COPY /dist /app/desktop
COPY nginx.conf /etc/nginx/nginx.conf
