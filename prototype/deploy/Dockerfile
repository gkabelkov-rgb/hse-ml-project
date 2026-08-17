# Вариант через Docker: nginx с прототипами внутри.
#   docker build -t wb-proto .
#   docker run -d --name wb-proto -p 8080:80 --restart unless-stopped wb-proto
FROM nginx:alpine
COPY www/ /usr/share/nginx/html/
EXPOSE 80
