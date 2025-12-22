import './globals.css'
import ClientLoader from '../components/ui/clientloader'
import { Alexandria, Almarai } from 'next/font/google'

const alexandria = Alexandria({
  subsets: ['arabic'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-alexandria',
  display: 'swap',
})

const almarai = Almarai({
  subsets: ['arabic'],
  weight: ['300', '400', '700', '800'],
  variable: '--font-almarai',
  display: 'swap',
})

export const metadata = {
  title: 'Treedom',
  description: 'Welcome to Treedom Training Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`
          ${alexandria.variable} 
          ${almarai.variable} 
          bg-gray-900 text-white
        `}
      >
        <ClientLoader>{children}</ClientLoader>
      </body>
    </html>
  )
}
