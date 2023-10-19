import { Inter } from 'next/font/google'
import './globals.css'
import { ToDoListProvider } from '../../context/toDoListApp'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'To Do dApp',
  description: 'decentralised to-do app',
}

const RootLayout = ({ children }) => (
    <ToDoListProvider>
      <html lang="en-GB">
        <body className={inter.className}>{children}</body>
      </html>
    </ToDoListProvider>
)

export default RootLayout
