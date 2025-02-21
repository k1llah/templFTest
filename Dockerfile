# Используем Node.js как базовый образ
FROM node:20-alpine as build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json
COPY package.json package-lock.json ./

# Устанавливаем все зависимости, включая devDependencies
RUN npm ci

# Копируем исходный код
COPY . /app

# Выполняем nuxt prepare и сборку приложения
RUN npm run build

# Этап production
FROM node:20-alpine

WORKDIR /app

# Копируем собранные файлы и зависимости
COPY --from=build /app/.output ./.output
COPY --from=build /app/package.json ./package.json

RUN export PORT=3000

# Открываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["node", ".output/server/index.mjs"]
