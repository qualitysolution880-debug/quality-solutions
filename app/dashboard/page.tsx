import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#5eead4] via-[#60a5fa] to-[#c084fc] bg-clip-text text-transparent">
              Quality Solutions
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            المنصة المتكاملة لعلوم المياه والتقنيات المتقدمة
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/login"
              className="btn-primary px-8 py-3 text-center"
            >
              تسجيل الدخول
            </Link>
            <Link
              href="/dashboard"
              className="px-8 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors text-center"
            >
              لوحة التحكم
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <div className="card mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#5eead4]">
            مرحباً بك في منصة المياه الرائدة
          </h2>
          <p className="text-gray-300 mb-6">
            هنا تجد كل ما تحتاجه من معارف علمية، أدوات تقنية، ومنتجات متخصصة في مجال معالجة المياه.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/articles"
              className="btn-primary text-center"
            >
              استكشاف المقالات
            </Link>
            <Link
              href="/products"
              className="px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors text-center"
            >
              زيارة المتجر
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card text-center">
            <div className="text-3xl font-bold text-[#5eead4] mb-2">100+</div>
            <div className="text-gray-400">مقال علمي</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-[#60a5fa] mb-2">50+</div>
            <div className="text-gray-400">منتج تقني</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-[#c084fc] mb-2">24/7</div>
            <div className="text-gray-400">دعم متخصص</div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-[#60a5fa]">المقالات العلمية</h3>
            <p className="text-gray-400 mb-4">
              اكتشف مكتبتنا الشاملة من المقالات العلمية المحكمة
            </p>
            <Link href="/articles" className="text-[#5eead4] hover:underline">
              تصفح المقالات →
            </Link>
          </div>
          
          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-[#c084fc]">المتجر التقني</h3>
            <p className="text-gray-400 mb-4">
              منتجات ومواد معالجة المياه بجودة عالية
            </p>
            <Link href="/products" className="text-[#5eead4] hover:underline">
              زيارة المتجر →
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>© 2024 Quality Solutions. جميع الحقوق محفوظة.</p>
          <div className="mt-4 flex justify-center gap-6 text-sm">
            <Link href="/about" className="hover:text-gray-300">من نحن</Link>
            <Link href="/contact" className="hover:text-gray-300">اتصل بنا</Link>
            <Link href="/privacy" className="hover:text-gray-300">الخصوصية</Link>
            <Link href="/terms" className="hover:text-gray-300">الشروط</Link>
          </div>
        </footer>
      </div>
    </div>
  )
}
