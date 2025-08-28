# Хостинг та Деплоймент

## Хостинг платформа

### Railway (Повноцінний додаток з базою даних)

**Переваги:**

- Безкоштовний план
- Автоматичний деплоймент з Git
- CDN та edge functions
- Простота налаштування

**Налаштування:**

1. Створіть акаунт на [vercel.com](https://vercel.com)
2. Підключіть GitHub репозиторій
3. Додайте environment variables в Vercel dashboard:
   - `NODE_ENV=production`
   - `API_SECRET=your-secret-key`

**GitHub Secrets (для CI/CD):**

- `VERCEL_TOKEN` - Personal Access Token з Vercel
- `VERCEL_ORG_ID` - Organization ID
- `VERCEL_PROJECT_ID` - Project ID

### 2. Railway

**Переваги:**

- Підтримка PostgreSQL
- Простий деплоймент з Dockerfile
- Автоматичне масштабування
- Безкоштовний план з обмеженнями

**Налаштування:**

1. Створіть акаунт на [railway.app](https://railway.app)
2. Підключіть GitHub репозиторій
3. Railway автоматично знайде Dockerfile
4. Додайте environment variables

**GitHub Secrets:**

- `RAILWAY_TOKEN` - API token з Railway

### 3. DigitalOcean App Platform

**Переваги:**

- Повний контроль над інфраструктурою
- Підтримка баз даних
- Масштабування
- Прозора ціна

**Налаштування:**

1. Створіть акаунт на [digitalocean.com](https://digitalocean.com)
2. Використайте файл `.do/app.yaml`
3. Налаштуйте через DigitalOcean dashboard

## Швидкий старт

### Локальне тестування

```bash
# Запустіти в development режимі
npm run dev

# Тестувати API
npm run test:api

# Побудувати для продакшену
npm run build:prod

# Запустити продакшн сервер
npm start
```

### Деплоймент через Git

1. **Development:**

   ```bash
   git push origin develop
   ```

2. **Staging:**

   ```bash
   git checkout staging
   git merge develop
   git push origin staging
   ```

3. **Production:**
   ```bash
   git checkout main
   git merge staging
   git push origin main
   ```

## Environment Variables

### Development

```
NODE_ENV=development
API_BASE=http://localhost:3000
API_SECRET=dev-secret
ENABLE_DEBUG_MODE=true
```

### Production

```
NODE_ENV=production
API_BASE=https://your-domain.com
API_SECRET=secure-production-secret
ENABLE_DEBUG_MODE=false
```

## Моніторинг

### Health Check

- URL: `/api/health`
- Відповідь: `{"status": "ok", "timestamp": "...", "environment": "..."}`

### API Endpoints

- `GET /api/users` - список користувачів
- `POST /api/users` - створити користувача
- `GET /api/users/:id` - отримати користувача
- `POST /api/auth/login` - авторизація
- `GET /api/admin/stats` - статистика (потребує авторизації)

## Troubleshooting

### Проблеми з деплойментом

1. Перевірте логи в хостинг платформі
2. Переконайтесь, що всі environment variables налаштовані
3. Перевірте health endpoint після деплойменту

### Проблеми з API

1. Перевірте CORS налаштування
2. Переконайтесь, що middleware працює правильно
3. Перевірте авторизацію для захищених роутів

### Логи

```bash
# Локальні логи
npm run dev

# Продакшн логи (залежить від платформи)
vercel logs
railway logs
```
