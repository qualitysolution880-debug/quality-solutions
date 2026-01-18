import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Star, ShoppingCart, Package, Truck, Shield, Check } from "lucide-react"
import Link from "next/link"

async function getProduct(slug: string) {
  const product = await prisma.product.findUnique({
    where: { slug }
  })

  if (!product) {
    return null
  }

  return product
}

export default async function ProductPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  // تحويل المواصفات من JSON إلى كائن
  const specifications = typeof product.specifications === 'string' 
    ? JSON.parse(product.specifications)
    : product.specifications

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-400">
          <Link href="/" className="hover:text-white">الرئيسية</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-white">المنتجات</Link>
          <span className="mx-2">/</span>
          <span className="text-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-gray-800 to-gray-900">
              <div className="w-full h-full bg-gradient-to-br from-[#5eead4]/20 to-[#c084fc]/20" />
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 cursor-pointer hover:opacity-80"
                >
                  <div className="w-full h-full bg-gradient-to-br from-[#5eead4]/10 to-[#c084fc]/10" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Category & SKU */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                {product.category}
              </span>
              <span className="text-sm text-gray-400">رقم المنتج: {product.sku}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className={
                      star <= Math.floor(product.rating || 0)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-600'
                    }
                  />
                ))}
              </div>
              <span className="text-gray-400">
                {product.rating?.toFixed(1)} ({product.reviewCount || 0} تقييم)
              </span>
            </div>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-3xl font-bold text-white">
                  {product.price.toLocaleString()} ريال
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      {product.originalPrice.toLocaleString()} ريال
                    </span>
                    <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">
                      وفر {Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-gray-400 text-sm">شامل ضريبة القيمة المضافة</p>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-white mb-3">الوصف</h3>
              <p className="text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3">المميزات</h3>
                <ul className="space-y-2">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-3 text-gray-300">
                      <Check size={18} className="text-[#10b981]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stock Status */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className={`font-semibold ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {product.stock > 0 ? 'متوفر في المخزون' : 'غير متوفر حالياً'}
                </span>
              </div>
              
              {product.stock > 0 && (
                <div className="text-gray-400">
                  <p>الكمية المتبقية: <span className="text-white">{product.stock} وحدة</span></p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="btn-primary flex-1 py-4 flex items-center justify-center gap-3 text-lg">
                <ShoppingCart size={24} />
                إضافة إلى السلة
              </button>
              <button className="px-8 py-4 border border-[#5eead4] text-[#5eead4] rounded-lg hover:bg-[#5eead4]/10 transition-colors">
                شراء الآن
              </button>
            </div>

            {/* Service Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                <Truck className="text-[#60a5fa]" />
                <div>
                  <div className="font-medium text-sm">شحن سريع</div>
                  <div className="text-xs text-gray-400">2-5 أيام عمل</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                <Shield className="text-[#10b981]" />
                <div>
                  <div className="font-medium text-sm">ضمان 3 سنوات</div>
                  <div className="text-xs text-gray-400">ضمان شامل</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        {specifications && Object.keys(specifications).length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">المواصفات الفنية</h3>
            <div className="card">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-gray-800">
                    <span className="text-gray-400">{key}</span>
                    <span className="text-white font-medium">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Back to Products */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            ← العودة إلى قائمة المنتجات
          </Link>
        </div>
      </div>
    </div>
  )
}
