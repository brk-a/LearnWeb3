import './globals.css'
import { Inter } from 'next/font/google'
import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from 'web3uikit'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FN Lotto',
  description: 'a decentralised, proper random lottery',
}

export default function RootLayout({ children }) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <NotificationProvider>
        <html lang="en-GB">
          <body className={inter.className}>{children}</body>
        </html>
      </NotificationProvider>
    </MoralisProvider>
  )
}
