import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 بدء تحميل البيانات...')

  // تنظيف البيانات القديمة
  await prisma.comment.deleteMany()
  await prisma.article.deleteMany()
  await prisma.user.deleteMany()

  console.log('✅ تم تنظيف البيانات القديمة')

  // إنشاء المستخدمين
  const adminPassword = await bcrypt.hash('Admin@2024', 10)
  const userPassword = await bcrypt.hash('User@2024', 10)

  const admin = await prisma.user.create({
    data: {
      email: 'admin@qualitysolutions.com',
      name: 'أحمد الخليفي',
      password: adminPassword,
      role: 'ADMIN',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
    }
  })

  const user = await prisma.user.create({
    data: {
      email: 'user@qualitysolutions.com',
      name: 'خالد العتيبي',
      password: userPassword,
      role: 'USER',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'
    }
  })

  console.log('✅ تم إنشاء المستخدمين')

  // إنشاء المقالات
  const articles = [
    {
      title: 'أساسيات كيمياء المياه للمعالجة',
      slug: 'water-chemistry-basics',
      category: 'SCIENCE',
      tags: ['كيمياء', 'أساسيات', 'معالجة'],
      authorId: admin.id
    },
    {
      title: 'تقنيات التناضح العكسي الحديثة',
      slug: 'modern-ro-techniques',
      category: 'TECHNOLOGY',
      tags: ['RO', 'تناضح عكسي', 'تحلية'],
      authorId: admin.id
    }
  ]

  for (const article of articles) {
    await prisma.article.create({
      data: {
        ...article,
        content: `# ${article.title}\n\nمحتوى المقال عن ${article.title}`,
        excerpt: `مقال متكامل عن ${article.title}`,
        published: true,
        publishedAt: new Date(),
        featuredImage: `https://picsum.photos/seed/${article.slug}/800/400`,
        views: 100
      }
    })
  }

  console.log('✅ تم إنشاء المقالات')
  console.log('🎉 تم تحميل جميع البيانات بنجاح!')
  console.log('👤 بيانات الدخول:')
  console.log('   - المدير: admin@qualitysolutions.com / Admin@2024')
  console.log('   - المستخدم: user@qualitysolutions.com / User@2024')
}

main()
  .catch((e) => {
    console.error('❌ خطأ في تحميل البيانات:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
