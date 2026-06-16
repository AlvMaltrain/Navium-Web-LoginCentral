# ─── Etapa 1: Build (compilar el front con Node) ───
FROM node:20-alpine AS build

WORKDIR /app

# Copiamos package.json + lo que necesita el postinstall (scripts y vendor)
COPY package*.json ./
COPY scripts ./scripts
COPY vendor ./vendor

# Instala dependencias (dispara el postinstall que copia variables.css)
RUN npm install

# Copiamos el resto del código y compilamos
COPY . .
RUN npm run build

# ─── Etapa 2: Serve (servir los estáticos con Nginx) ───
FROM nginx:alpine

# Copiamos los archivos compilados al directorio que Nginx sirve
COPY --from=build /app/dist /usr/share/nginx/html

# Copiamos nuestra config de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]