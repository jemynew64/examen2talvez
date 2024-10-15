# Usa una imagen oficial de Node.js como base
FROM node:20

# Crea el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias del backend
RUN npm install

# Copia el resto de la aplicación al contenedor
COPY . .

# Expone el puerto en el que el servidor Express escuchará
EXPOSE 3000

# Comando para ejecutar migraciones y seeders y luego iniciar la aplicación
CMD ["sh", "-c", "npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all && npm run dev"]


