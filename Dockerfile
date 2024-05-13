# Stage 1: Construir la aplicación Angular
FROM node:18.13-alpine as build-angular

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo package.json al directorio de la aplicación
COPY ./chatapp-front/package.json /app


# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY ./chatapp-front /app

# Construir la aplicación Angular en modo de producción
RUN npm run build --prod

# Stage 2: Configurar servidor web Nginx

FROM nginx:1.17.1-alpine

COPY --from=build-angular /app/dist/chatapp-front /usr/share/nginx/html