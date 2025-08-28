import { db } from '../server/database/connection'
import { users, products } from '../server/database/schema'
import { createUser } from '../server/utils/auth'

async function seedDatabase() {
  console.log('🌱 Заповнення бази даних тестовими даними...')

  try {
    // Створюємо адміна
    await createUser('Адміністратор', 'admin@kerra.com', 'admin123', 'admin')
    console.log('✅ Створено адміна: admin@kerra.com / admin123')

    // Створюємо звичайних користувачів
    await createUser('Олександр Петренко', 'alex@example.com', 'password123', 'user')
    await createUser('Марія Іванова', 'maria@example.com', 'password123', 'user')
    await createUser('Іван Сидоренко', 'ivan@example.com', 'password123', 'user')
    console.log('✅ Створено тестових користувачів')

    // Додаємо тестові продукти
    await db.insert(products).values([
      {
        name: 'Ноутбук MacBook Pro',
        description: 'Потужний ноутбук для розробників',
        price: 299900, // 2999.00 грн в копійках
      },
      {
        name: 'Смартфон iPhone 15',
        description: 'Новітній смартфон від Apple',
        price: 129900, // 1299.00 грн
      },
      {
        name: 'Навушники AirPods Pro',
        description: 'Бездротові навушники з шумозаглушенням',
        price: 34900, // 349.00 грн
      },
    ])
    console.log('✅ Додано тестові продукти')

    console.log('\n🎉 База даних успішно заповнена!')
    console.log('\n📋 Тестові акаунти:')
    console.log('👤 Адмін: admin@kerra.com / admin123')
    console.log('👤 Користувач: alex@example.com / password123')
    console.log('👤 Користувач: maria@example.com / password123')
    console.log('👤 Користувач: ivan@example.com / password123')

  } catch (error) {
    console.error('❌ Помилка заповнення бази даних:', error)
  }

  process.exit(0)
}

seedDatabase()
