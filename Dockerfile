# Dockerfile for frontend

# Utiliser l'image Node.js officielle
FROM node:20

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste de l'application
COPY . .

# Construire l'application Next.js
RUN npm run build

# Exposer le port sur lequel l'application sera accessible
EXPOSE 3000

# Démarrer l'application Next.js
CMD ["npm", "start"]
