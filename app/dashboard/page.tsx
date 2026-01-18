import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"

async function getDashboardData() {
  const [articlesCount, productsCount, usersCount] = await Promise.all([
    prisma.article.count(),
    prisma.product.count(),
    prisma.user.count(),
  ])

  return {
    articlesCount,
    productsCount,
    usersCount,
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login")
  }

  const data = await getDashboardData()

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">لوحة التحكم</h1>
              <p className="text-gray-400 mt-1">
                مرحباً {session.user?.name} ({session.user?.email})
              </p>
            </div>
            <div className="text-sm bg-gray-800 px-3 py-1 rounded-full">
              <span className="text-gray-400">الدور: </span>
              <span className="text-[#5eead4] font-medium">{session.user?.role}</span>
            </div>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-white mb-1">{data.articlesCount}</div>
                <div className="text-gray-400">مقالة</div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <span className="text-2xl">📄</span>
              </div>
            </div>
            <Link
              href="/articles"
              className="inline-block mt-4 text-[#60a5fa] hover:underline text-sm"
            >
              إدارة المقالات →
            </Link>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-white mb-1">{data.productsCount}</div>
                <div className="text-gray-400">منتج</div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <span className="text-2xl">🛒</span>
              </div>
            </div>
            <Link
              href="/products"
              className="inline-block mt-4 text-[#c084fc] hover:underline text-sm"
            >
              إدارة المنتجات →
            </Link>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-white mb-1">{data.usersCount}</div>
                <div className="text-gray-400">مستخدم</div>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
            </div>
            <Link
              href="/users"
              className="inline-block mt-4 text-[#10b981] hover:underline text-sm"
            >
              إدارة المستخدمين →
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h3 className="text-lg font-bold mb-4 text-white">إجراءات سريعة</h3>
            <div className="space-y-3">
              <Link
                href="/articles/new"
                className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <span>✏️ كتابة مقال جديد</span>
                <span className="text-gray-400">→</span>
              </Link>
              <Link
                href="/products/new"
                className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <span>📦 إضافة منتج جديد</span>
                <span className="text-gray-400">→</span>
              </Link>
              <Link
                href="/settings"
                className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <span>⚙️ الإعدادات</span>
                <span className="text-gray-400">→</span>
              </Link>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-bold mb-4 text-white">نشاط حديث</h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-800/30 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-300">تم إنشاء مقال جديد</p>
                    <p className="text-xs text-gray-500 mt-1">منذ ساعة</p>
                  </div>
                  <span className="text-[#60a5fa] text-sm">📄</span>
                </div>
              </div>
              <div className="p-3 bg-gray-800/30 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-300">تم تسجيل مستخدم جديد</p>
                    <p className="text-xs text-gray-500 mt-1">منذ 3 ساعات</p>
                  </div>
                  <span className="text-[#10b981] text-sm">👤</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
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
