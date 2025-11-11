# frontend/Dockerfile

# Build (Construcción)
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copiamos el código fuente del frontend
COPY . .

# Creamos la build de producción de React/Vite
RUN npm run build


# Production (Servidor)
# Usamos Nginx, un servidor web de alto rendimiento, para servir los archivos estáticos
FROM nginx:stable-alpine

# Copiamos los archivos estáticos generados en la etapa anterior a la carpeta de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Le decimos al contenedor que exponga el puerto 80 (el default de Nginx)
EXPOSE 80

# El comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]