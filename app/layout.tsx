import type { Metadata } from 'next'
import { Inter, Cairo } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const cairo = Cairo({ subsets: ['arabic'] })

export const metadata: Metadata = {
  title: 'Quality Solutions - منصة علوم المياه',
  description: 'المنصة المتكاملة لعلوم المياه والتقنيات المتقدمة',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} bg-gray-900 text-white`}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
