import { PrismaClient, UserRole, ArticleStatus, ProductStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 بدء تحميل البيانات...')

  // تحذير في حالة الإنتاج
  if (process.env.NODE_ENV === 'production') {
    console.log('⚠️  أنت في بيئة إنتاج! تأكد من رغبتك في حذف البيانات.')
    return
  }

  // تنظيف البيانات القديمة
  await prisma.loginAttempt.deleteMany()
  await prisma.comment.deleteMany()
  await prisma.article.deleteMany()
  await prisma.product.deleteMany()
  await prisma.user.deleteMany()

  console.log('✅ تم تنظيف البيانات القديمة')

  // إنشاء المستخدمين الأساسيين
  const adminPassword = await bcrypt.hash('Admin@2024', 10)
  const editorPassword = await bcrypt.hash('Editor@2024', 10)
  const authorPassword = await bcrypt.hash('Author@2024', 10)
  const userPassword = await bcrypt.hash('User@2024', 10)

  const admin = await prisma.user.create({
    data: {
      email: 'admin@qualitysolutions.com',
      name: 'أحمد الخليفي',
      password: adminPassword,
      role: UserRole.ADMIN,
      status: 'ACTIVE',
      emailVerified: new Date(),
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
    }
  })

  const editor = await prisma.user.create({
    data: {
      email: 'editor@qualitysolutions.com',
      name: 'محمد القحطاني',
      password: editorPassword,
      role: UserRole.EDITOR,
      status: 'ACTIVE',
      emailVerified: new Date(),
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=editor'
    }
  })

  const author = await prisma.user.create({
    data: {
      email: 'author@qualitysolutions.com',
      name: 'سعيد الحربي',
      password: authorPassword,
      role: UserRole.AUTHOR,
      status: 'ACTIVE',
      emailVerified: new Date(),
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=author'
    }
  })

  const user = await prisma.user.create({
    data: {
      email: 'user@qualitysolutions.com',
      name: 'خالد العتيبي',
      password: userPassword,
      role: UserRole.USER,
      status: 'ACTIVE',
      emailVerified: new Date(),
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'
    }
  })

  console.log('✅ تم إنشاء المستخدمين الأساسيين')

  // بيانات المقالات العلمية
  const articlesData = [
    {
      title: 'أساسيات كيمياء المياه للمعالجة',
      slug: 'water-chemistry-basics',
      category: 'SCIENCE',
      tags: ['كيمياء', 'أساسيات', 'معالجة'],
      authorId: author.id
    },
    {
      title: 'تقنيات التناضح العكسي الحديثة',
      slug: 'modern-ro-techniques',
      category: 'TECHNOLOGY',
      tags: ['RO', 'تناضح عكسي', 'تحلية'],
      authorId: author.id
    },
    {
      title: 'إدارة محطات المعالجة بكفاءة',
      slug: 'treatment-plant-management',
      category: 'PROCESS',
      tags: ['إدارة', 'تشغيل', 'كفاءة'],
      authorId: author.id
    },
    {
      title: 'الاستدامة في قطاع المياه',
      slug: 'water-sector-sustainability',
      category: 'SUSTAINABILITY',
      tags: ['استدامة', 'بيئة', 'موارد'],
      authorId: author.id
    },
    {
      title: 'معايير جودة مياه الشرب العالمية',
      slug: 'drinking-water-standards',
      category: 'SCIENCE',
      tags: ['معايير', 'جودة', 'صحة'],
      authorId: author.id
    }
  ]

  // إنشاء مقالات تفصيلية
  for (const articleData of articlesData) {
    const content = `
# ${articleData.title}

## المقدمة
هذا المقال يقدم معلومات شاملة حول ${articleData.title.toLowerCase()}، مع التركيز على التطبيقات العملية في قطاع المياه.

## المحتوى الرئيسي
${generateArticleContent(articleData.category)}

## الخلاصة
تعتبر ${articleData.tags[0]} من الجوانب الأساسية في إدارة وتشغيل أنظمة المياه، ويجب الاهتمام بها لضمان جودة وكفاءة العمليات.

## المراجع
1. World Health Organization (WHO) Guidelines
2. Environmental Protection Agency (EPA) Standards
3. ISO 9001:2015 Quality Management Systems
`

    await prisma.article.create({
      data: {
        ...articleData,
        content,
        excerpt: `مقال متكامل عن ${articleData.title} يشمل المبادئ العلمية والتطبيقات العملية.`,
        published: true,
        publishedAt: new Date(),
        status: ArticleStatus.PUBLISHED,
        featuredImage: `https://picsum.photos/seed/${articleData.slug}/800/400`,
        readingTime: Math.floor(Math.random() * 10) + 5,
        views: Math.floor(Math.random() * 1000) + 100,
        seoTitle: articleData.title,
        seoDescription: `دليل شامل عن ${articleData.title} - Quality Solutions`
      }
    })
  }

  console.log('✅ تم إنشاء المقالات العلمية')

  // بيانات المنتجات التقنية
  const productsData = [
    {
      name: 'مرشح كربون نشط صناعي',
      slug: 'industrial-activated-carbon-filter',
      category: 'مرشحات',
      price: 1250,
      stock: 25
    },
    {
      name: 'مضخة غاطسة 5 حصان',
      slug: '5hp-submersible-pump',
      category: 'مضخات',
      price: 3200,
      stock: 12
    },
    {
      name: 'جهاز قياس جودة المياه المتعدد',
      slug: 'multi-parameter-water-quality-meter',
      category: 'أجهزة قياس',
      price: 4500,
      stock: 8
    },
    {
      name: 'مادة كلور حبيبات 70%',
      slug: '70-chlorine-granules',
      category: 'كيميائيات',
      price: 850,
      stock: 50
    },
    {
      name: 'غشاء RO 4040',
      slug: 'ro-membrane-4040',
      category: 'أغشية',
      price: 2800,
      stock: 15
    }
  ]

  // إنشاء المنتجات
  for (const productData of productsData) {
    await prisma.product.create({
      data: {
        ...productData,
        description: `منتج ${productData.name} عالي الجودة مصمم للاستخدام في تطبيقات معالجة المياه الصناعية والتجارية.`,
        shortDescription: `${productData.name} - حل تقني متقدم`,
        originalPrice: productData.price * 1.2,
        subcategory: 'معدات أساسية',
        images: [
          `https://picsum.photos/seed/${productData.slug}-1/800/600`,
          `https://picsum.photos/seed/${productData.slug}-2/800/600`,
          `https://picsum.photos/seed/${productData.slug}-3/800/600`
        ],
        specifications: {
          'السعة': '20,000 لتر/ساعة',
          'ضغط العمل': '10 بار',
          'درجة الحرارة': '5-45°م',
          'المواد': 'فولاذ مقاوم للصدأ 304',
          'الاتصالات': 'DN100 Flange',
          'الضمان': '3 سنوات'
        },
        features: [
          'كفاءة عالية في الإزالة',
          'تصميم متين وطويل الأمد',
          'سهولة التركيب والصيانة',
          'متوافق مع المعايير الدولية'
        ],
        sku: `QS-${productData.category.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 1000)}`,
        status: ProductStatus.ACTIVE,
        rating: 4.5 + Math.random() * 0.5,
        reviewCount: Math.floor(Math.random() * 100) + 20,
        weight: Math.floor(Math.random() * 50) + 10,
        dimensions: {
          length: Math.floor(Math.random() * 100) + 50,
          width: Math.floor(Math.random() * 50) + 20,
          height: Math.floor(Math.random() * 50) + 20
        }
      }
    })
  }

  console.log('✅ تم إنشاء المنتجات التقنية')

  // إضافة تعليقات تقييمية
  const firstArticle = await prisma.article.findFirst()
  if (firstArticle) {
    await prisma.comment.create({
      data: {
        content: 'مقال رائع وشامل، شكرًا للمعلومات القيمة',
        articleId: firstArticle.id,
        authorId: user.id,
        approved: true
      }
    })
  }

  console.log('✅ تم إنشاء التعليقات التقييمية')

  console.log('🎉 تم تحميل جميع البيانات بنجاح!')
  console.log('🔗 يمكنك الآن زيارة الموقع')
  console.log('👤 بيانات الدخول:')
  console.log('   - المدير: admin@qualitysolutions.com / Admin@2024')
  console.log('   - المحرر: editor@qualitysolutions.com / Editor@2024')
  console.log('   - الكاتب: author@qualitysolutions.com / Author@2024')
  console.log('   - المستخدم: user@qualitysolutions.com / User@2024')
}

function generateArticleContent(category: string): string {
  const contents: Record<string, string> = {
    SCIENCE: `
### المبادئ العلمية
1. الخصائص الكيميائية للمياه
2. التفاعلات والذوبانية
3. التوازن الكيميائي

### التطبيقات العملية
- تحليل عينات المياه
- مراقبة الجودة
- تقييم المخاطر`,

    TECHNOLOGY: `
### التقنيات المستخدمة
1. أنظمة التناضح العكسي
2. الترشيح الفائق
3. التبادل الأيوني

### معايير الأداء
- معدل الإنتاجية
- كفاءة الإزالة
- استهلاك الطاقة`,

    PROCESS: `
### مراحل التشغيل
1. المعالجة الأولية
2. المعالجة الرئيسية
3. المعالجة النهائية

### مراقبة الجودة
- نقاط التحكم
- المؤشرات الرئيسية
- التقارير الدورية`,

    SUSTAINABILITY: `
### مبادئ الاستدامة
1. كفاءة استخدام المياه
2. إعادة الاستخدام
3. تقليل النفايات

### المعايير البيئية
- اللوائح المحلية
- المعايير الدولية
- أفضل الممارسات`
  }

  return contents[category] || 'محتوى المقال التفصيلي...'
}

main()
  .catch((e) => {
    console.error('❌ خطأ في تحميل البيانات:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
