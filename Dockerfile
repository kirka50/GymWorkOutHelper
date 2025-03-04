# Используем базовый образ для Node.js (ARM64-совместимый)
FROM node:22 AS builder

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package.json /

# Устанавливаем зависимости
RUN npm install --legacy-peer-deps
# Копируем все файлы проекта
COPY . .

# Собираем проект
RUN npm run build

# Создаём новый минимальный образ для запуска
FROM nginx:latest

# Копируем собранные файлы в Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]