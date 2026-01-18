import type { Metadata } from 'next'
import { Inter, Cairo } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })
const cairo = Cairo({ subsets: ['arabic'] })

export const metadata: Metadata = {
  title: 'Quality Solutions - منصة علوم المياه والتقنيات المتقدمة',
  description: 'المنصة المتكاملة لعلوم المياه والتقنيات المتقدمة في منطقة MENA',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} ${inter.className} bg-gray-900 text-white`}>
        <Providers>
          <main className="min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
