export default function HomePage() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#5eead4] via-[#60a5fa] to-[#c084fc] bg-clip-text text-transparent">
              Quality Solutions
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            المنصة المتكاملة لعلوم المياه والتقنيات المتقدمة
          </p>
        </header>

        {/* Hero Section */}
        <div className="card mb-8">
          <h2 className="text-3xl font-bold mb-4 text-[#5eead4]">
            مرحباً بك في منصة المياه الرائدة
          </h2>
          <p className="text-gray-300 mb-6">
            هنا تجد كل ما تحتاجه من معارف علمية، أدوات تقنية، ومنتجات متخصصة في مجال معالجة المياه.
          </p>
          <div className="flex gap-4">
            <button className="btn-primary">
              استكشاف المقالات
            </button>
            <button className="px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-800">
              زيارة المتجر
            </button>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-[#60a5fa]">المقالات العلمية</h3>
            <p className="text-gray-400 mb-4">
              اكتشف مكتبتنا الشاملة من المقالات العلمية المحكمة
            </p>
            <button className="text-[#5eead4] hover:underline">
              تصفح المقالات →
            </button>
          </div>
          
          <div className="card">
            <h3 className="text-xl font-bold mb-3 text-[#c084fc]">المتجر التقني</h3>
            <p className="text-gray-400 mb-4">
              منتجات ومواد معالجة المياه بجودة عالية
            </p>
            <button className="text-[#5eead4] hover:underline">
              زيارة المتجر →
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>© 2024 Quality Solutions. جميع الحقوق محفوظة.</p>
        </footer>
      </div>
    </div>
  )
}
