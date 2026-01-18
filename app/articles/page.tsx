import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Calendar, User, Eye, Clock } from "lucide-react"

async function getArticles() {
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    take: 20,
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      category: true,
      featuredImage: true,
      views: true,
      readingTime: true,
      publishedAt: true,
      author: {
        select: {
          name: true,
          image: true
        }
      }
    }
  })
  return articles
}

export default async function ArticlesPage() {
  const articles = await getArticles()

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#5eead4] to-[#60a5fa] bg-clip-text text-transparent">
              المقالات العلمية
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            اكتشف مكتبتنا الشاملة من المقالات العلمية المحكمة في مجال معالجة المياه والتقنيات المتقدمة
          </p>
        </header>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {['الكل', 'علوم المياه', 'تقنيات المعالجة', 'العمليات والتشغيل', 'الاستدامة'].map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full border ${
                cat === 'الكل'
                  ? 'bg-[#5eead4] text-gray-900 border-[#5eead4]'
                  : 'border-gray-700 text-gray-300 hover:border-[#5eead4]'
              } transition-colors`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="card group hover:scale-[1.02] transition-transform"
              >
                {/* Article Image */}
                <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-gray-800 to-gray-900">
                  <div className="w-full h-full bg-gradient-to-br from-[#5eead4]/10 to-[#60a5fa]/10" />
                </div>

                {/* Category */}
                <div className="mb-3">
                  <span className="px-3 py-1 bg-[#60a5fa]/10 text-[#60a5fa] rounded-full text-sm">
                    {article.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#5eead4] transition-colors line-clamp-2">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-400 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-800">
                  <div className="flex items-center gap-2">
                    <User size={14} />
                    <span>{article.author.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye size={14} />
                      <span>{article.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{article.readingTime} د</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📄</div>
            <h3 className="text-xl font-bold text-white mb-2">لا توجد مقالات بعد</h3>
            <p className="text-gray-400">سيتم إضافة المقالات قريباً</p>
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            ← العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  )
}
