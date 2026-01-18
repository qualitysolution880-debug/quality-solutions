import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Star, ShoppingBag, Package, Truck } from "lucide-react"

async function getProducts() {
  const products = await prisma.product.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { createdAt: 'desc' },
    take: 20,
    select: {
      id: true,
      name: true,
      slug: true,
      shortDescription: true,
      price: true,
      originalPrice: true,
      category: true,
      images: true,
      rating: true,
      reviewCount: true,
      stock: true
    }
  })
  return products
}

export default async function ProductsPage() {
  const products = await getProducts()

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-[#5eead4] to-[#c084fc] bg-clip-text text-transparent">
              المتجر التقني
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            منتجات ومواد معالجة المياه بجودة عالية - حلول تقنية متكاملة لجميع احتياجاتك
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex-1 min-w-[200px]">
            <select className="input-field w-full">
              <option value="">جميع الفئات</option>
              <option value="مرشحات">مرشحات</option>
              <option value="مضخات">مضخات</option>
              <option value="أجهزة قياس">أجهزة قياس</option>
              <option value="كيميائيات">كيميائيات</option>
              <option value="أغشية">أغشية</option>
            </select>
          </div>
          
          <div className="flex gap-4">
            <button className="px-6 py-3 border border-gray-700 rounded-lg hover:bg-gray-800">
              🔍 بحث متقدم
            </button>
            <button className="btn-primary flex items-center gap-2">
              <ShoppingBag size={18} />
              عرض الفئات
            </button>
          </div>
        </div>

        {/* Featured Products */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">منتجات مميزة</h2>
            <div className="flex items-center gap-2 text-gray-400">
              <Truck size={18} />
              <span className="text-sm">شحن سريع إلى جميع أنحاء المملكة</span>
            </div>
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="card group hover:scale-[1.02] transition-transform"
                >
                  {/* Product Image */}
                  <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-gray-800 to-gray-900 relative">
                    <div className="w-full h-full bg-gradient-to-br from-[#5eead4]/10 to-[#c084fc]/10" />
                    
                    {/* Stock Badge */}
                    {product.stock > 0 ? (
                      <div className="absolute top-3 left-3 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                        ✓ متوفر
                      </div>
                    ) : (
                      <div className="absolute top-3 left-3 px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">
                        ⚠️ غير متوفر
                      </div>
                    )}

                    {/* Discount Badge */}
                    {product.originalPrice && (
                      <div className="absolute top-3 right-3 px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-xs">
                        خصم {Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </div>
                    )}
                  </div>

                  {/* Category */}
                  <div className="mb-2">
                    <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                      {product.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#5eead4] transition-colors line-clamp-1">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {product.shortDescription || "منتقى عالي الجودة"}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={14}
                          className={
                            star <= Math.floor(product.rating || 0)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-600'
                          }
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">
                      ({product.reviewCount || 0})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-white">
                        {product.price.toLocaleString()} ريال
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {product.originalPrice.toLocaleString()} ريال
                        </span>
                      )}
                    </div>
                    
                    <button className="px-4 py-2 bg-[#5eead4] text-gray-900 rounded-lg text-sm font-semibold hover:bg-[#5eead4]/90 transition-colors">
                      عرض المنتج
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🛒</div>
              <h3 className="text-xl font-bold text-white mb-2">لا توجد منتجات بعد</h3>
              <p className="text-gray-400">سيتم إضافة المنتجات قريباً</p>
            </div>
          )}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#5eead4]/10 flex items-center justify-center">
              <Package className="w-6 h-6 text-[#5eead4]" />
            </div>
            <h4 className="font-bold text-white mb-2">منتجات أصلية</h4>
            <p className="text-gray-400 text-sm">جميع المنتجات أصلية وموثقة</p>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#60a5fa]/10 flex items-center justify-center">
              <Truck className="w-6 h-6 text-[#60a5fa]" />
            </div>
            <h4 className="font-bold text-white mb-2">شحن سريع</h4>
            <p className="text-gray-400 text-sm">توصيل خلال 2-5 أيام عمل</p>
          </div>
          
          <div className="card text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#c084fc]/10 flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-[#c084fc]" />
            </div>
            <h4 className="font-bold text-white mb-2">ضمان 3 سنوات</h4>
            <p className="text-gray-400 text-sm">ضمان شامل على جميع المنتجات</p>
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
