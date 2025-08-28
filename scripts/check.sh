#!/bin/bash

echo "🔍 Запуск повної перевірки проекту..."

# Кольори для виводу
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Функція для виводу статусу
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
        return 1
    fi
}

# Лічильник помилок
ERRORS=0

echo -e "${YELLOW}📋 Перевірка лінтера...${NC}"
npm run lint
if [ $? -ne 0 ]; then
    ((ERRORS++))
    echo -e "${RED}❌ ESLint знайшов помилки${NC}"
else
    echo -e "${GREEN}✅ ESLint - OK${NC}"
fi

echo -e "${YELLOW}🎨 Перевірка форматування...${NC}"
npm run format:check
if [ $? -ne 0 ]; then
    ((ERRORS++))
    echo -e "${RED}❌ Prettier знайшов проблеми з форматуванням${NC}"
    echo -e "${YELLOW}💡 Запустіть: npm run format${NC}"
else
    echo -e "${GREEN}✅ Prettier - OK${NC}"
fi

echo -e "${YELLOW}🧪 Запуск тестів...${NC}"
npm run test
if [ $? -ne 0 ]; then
    ((ERRORS++))
    echo -e "${RED}❌ Тести не пройшли${NC}"
else
    echo -e "${GREEN}✅ Тести - OK${NC}"
fi

echo -e "${YELLOW}🏗️ Перевірка білду...${NC}"
npm run build
if [ $? -ne 0 ]; then
    ((ERRORS++))
    echo -e "${RED}❌ Білд не пройшов${NC}"
else
    echo -e "${GREEN}✅ Білд - OK${NC}"
fi

# Підсумок
echo ""
echo "=========================================="
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}🎉 Всі перевірки пройшли успішно!${NC}"
    echo -e "${GREEN}✨ Проект готовий до push${NC}"
    exit 0
else
    echo -e "${RED}⚠️  Знайдено $ERRORS помилок${NC}"
    echo -e "${YELLOW}🔧 Виправте помилки перед push${NC}"
    exit 1
fi
