import './globals.css'
import Navbar from './components/Navbar'
import MyProfilePic from './components/MyProfilePic'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zeke\'s Blog',
  description: 'Generated by Zeke Chow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <MyProfilePic />
        {children}
        <footer className="text-center py-4 text-gray-400">
          © {new Date().getFullYear()} <Link href="https://github.com/MrZhouZh">Zeke Chow.</Link>
        </footer>
      </body>
    </html>
  )
}
