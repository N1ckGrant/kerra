# Deployment & Git Workflow

## Git Branch Strategy

### Гілки:

- `main` - продакшн код (production)
- `staging` - тестування перед релізом
- `develop` - розробка та інтеграція
- `feature/*` - нові функції
- `hotfix/*` - термінові виправлення

### Workflow:

```
feature → develop → staging → main
```

## Environment Configuration

### Development (.env.development)

```bash
NODE_ENV=development
API_BASE=http://localhost:3000
ENABLE_DEBUG_MODE=true
```

### Staging (.env.staging)

```bash
NODE_ENV=staging
API_BASE=https://staging-api.kerra.com
ENABLE_DEBUG_MODE=false
```

### Production (.env.production)

```bash
NODE_ENV=production
API_BASE=https://api.kerra.com
ENABLE_DEBUG_MODE=false
```

## Deployment Process

### 1. Development (develop branch)

- Автоматичний деплой при push
- URL: https://dev.kerra.com
- Для тестування нових функцій

### 2. Staging (staging branch)

- Автоматичний деплой при push
- URL: https://staging.kerra.com
- Фінальне тестування перед релізом

### 3. Production (main branch)

- Автоматичний деплой при push
- URL: https://kerra.com
- Продакшн середовище

## Commands

### Розробка нової функції:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/new-feature
# ... розробка ...
git commit -m "feat: add new feature"
git push origin feature/new-feature
# Створити Pull Request develop ← feature/new-feature
```

### Реліз на staging:

```bash
git checkout develop
git pull origin develop
git checkout staging
git merge develop
git push origin staging
```

### Реліз на production:

```bash
git checkout staging
git pull origin staging
git checkout main
git merge staging
git push origin main
```

### Hotfix:

```bash
git checkout main
git pull origin main
git checkout -b hotfix/critical-fix
# ... виправлення ...
git commit -m "fix: critical security issue"
git push origin hotfix/critical-fix
# Створити Pull Request main ← hotfix/critical-fix
```

## CI/CD Pipeline

### GitHub Actions Workflow:

1. **Test** - lint, typecheck, build
2. **Deploy Develop** - автоматично при push на develop
3. **Deploy Staging** - автоматично при push на staging
4. **Deploy Production** - автоматично при push на main

### Environment Protection:

- `main` - потребує review
- `staging` - потребує review
- `develop` - автоматичний деплой

## Monitoring

### Health Checks:

- `/health` - статус додатку
- `/metrics` - метрики (якщо потрібно)

### Logs:

- Development: локальні логи
- Staging: централізовані логи
- Production: централізовані логи + алерти

## Rollback

### Швидкий rollback:

```bash
git checkout main
git revert HEAD
git push origin main
```

### Повний rollback:

```bash
git checkout main
git reset --hard HEAD~1
git push --force origin main
```
