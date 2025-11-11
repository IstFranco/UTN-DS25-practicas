# backend/Dockerfile

# Build (Construcción)
# Usamos una imagen de Node.js para instalar dependencias y compilar el TypeScript
FROM node:18-alpine AS builder

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código fuente del backend
COPY . .

# Generamos el cliente de Prisma
RUN npx prisma generate

# Compilamos el código de TypeScript a JavaScript
RUN npm run build


# Production (Producción)
# Usamos una imagen más ligera solo con Node.js, sin las herramientas de build
FROM node:18-alpine

WORKDIR /app

# Copiamos solo los archivos de dependencias de producción
COPY package*.json ./
RUN npm install --omit=dev

# Copiamos el código compilado (de la carpeta 'dist') desde la etapa anterior
COPY --from=builder /app/dist ./dist


# Copia el cliente generado
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# El puerto que la aplicación usará (debe coincidir con el .env)
EXPOSE 3001

# El comando para iniciar el servidor cuando el contenedor arranque
CMD [ "npm", "start" ]