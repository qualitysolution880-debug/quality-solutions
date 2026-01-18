"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة")
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      setError("حدث خطأ أثناء تسجيل الدخول")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-[#5eead4] to-[#60a5fa] bg-clip-text text-transparent">
              Quality Solutions
            </span>
          </h1>
          <p className="text-gray-400">سجل الدخول إلى حسابك</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field w-full"
                placeholder="أدخل بريدك الإلكتروني"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                كلمة المرور
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field w-full"
                placeholder="أدخل كلمة المرور"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3 flex items-center justify-center gap-2"
            >
              {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </button>

            <div className="text-center text-sm text-gray-500 pt-4 border-t border-gray-800">
              <p>بيانات تجريبية للاختبار:</p>
              <div className="mt-2 space-y-1">
                <p className="text-gray-400">المدير: admin@qualitysolutions.com / Admin@2024</p>
                <p className="text-gray-400">المستخدم: user@qualitysolutions.com / User@2024</p>
              </div>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-[#5eead4] hover:underline text-sm"
            >
              العودة إلى الصفحة الرئيسية
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
