import './globals.css'
import { Bebas_Neue } from 'next/font/google'

const bebasNeue = Bebas_Neue({
  weight: ["400"],
  subsets: ["latin"],
})

export const metadata = {
  title: 'Liteflix',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={bebasNeue.className}>{children}</body>
    </html>
  )
}
