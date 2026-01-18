import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Calendar, User, Eye, Clock, Share2, Bookmark } from "lucide-react"
import Link from "next/link"
import CommentsSection from "@/components/comments/CommentsSection"

async function getArticle(slug: string) {
  const article = await prisma.article.findUnique({
    where: { slug },
    include: {
      author: {
        select: { name: true, image: true }
      },
      comments: {
        where: { approved: true },
        include: {
          author: {
            select: { name: true, image: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      }
    }
  })

  if (!article) {
    return null
  }

  // زيادة عدد المشاهدات
  await prisma.article.update({
    where: { slug },
    data: { views: { increment: 1 } }
  })

  return article
}

export default async function ArticlePage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const article = await getArticle(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-400">
          <Link href="/" className="hover:text-white">الرئيسية</Link>
          <span className="mx-2">/</span>
          <Link href="/articles" className="hover:text-white">المقالات</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{article.title}</span>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-[#5eead4]/10 text-[#5eead4] rounded-full text-sm">
              {article.category}
            </span>
            <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
              {article.readingTime} دقيقة قراءة
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {article.title}
          </h1>

          {/* Author and Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-400">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{article.author.name}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>
                {new Date(article.publishedAt || article.createdAt).toLocaleDateString('ar-SA')}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Eye size={16} />
              <span>{article.views} مشاهدة</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="aspect-video rounded-xl overflow-hidden mb-8 bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="w-full h-full bg-gradient-to-br from-[#5eead4]/20 to-[#60a5fa]/20" />
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-invert prose-lg max-w-none mb-12">
          <div className="text-gray-300 leading-relaxed whitespace-pre-line">
            {article.content}
          </div>
        </article>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-white mb-3">الوسوم:</h3>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-gray-700 cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-12">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700">
            <Share2 size={18} />
            مشاركة
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700">
            <Bookmark size={18} />
            حفظ
          </button>
          <Link
            href="#comments"
            className="flex items-center gap-2 px-4 py-2 bg-[#5eead4] text-gray-900 rounded-lg font-semibold hover:bg-[#5eead4]/90"
          >
            أضف تعليقاً
          </Link>
        </div>

        {/* Back to Articles */}
        <div className="text-center mt-12">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            ← العودة إلى قائمة المقالات
          </Link>
        </div>
      </div>
    </div>
  )
}
