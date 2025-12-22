import './globals.css'
import ClientLoader from '../components/ui/clientloader'



export const metadata = {
  title: 'Treedom',
  description: 'Welcome to Treedom Training Management System',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <ClientLoader>{children}</ClientLoader>
       
     
      </body>
    </html>
  )
}
