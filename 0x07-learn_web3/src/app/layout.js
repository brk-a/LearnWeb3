import { Inter } from 'next/font/google'
import './globals.css'
import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { EtherProvider } from '@/context/Ether'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'FN Etherscan',
    description: 'etherscan clone by fnjakai',
}

export default function RootLayout({ children }) {
    return (
        <EtherProvider>
            <html lang="en-GB">
                <body className={inter.className}>
                    <Navbar />
                    {children}
                    <Footer />
                </body>
            </html>
        </EtherProvider>
    )
}
