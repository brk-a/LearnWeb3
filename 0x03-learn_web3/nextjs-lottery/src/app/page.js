"use client"

import EnterLottery from '../../components/EnterLottery'
import Header from '../../components/ManualHeader'

const Home = () => {
  return (
    <div className='flex flex-col items-start justify-center min-w-full min-h-full bg-blue-950 p-2'>
      <Header/>
      <EnterLottery/>
    </div>
  )
}

export default Home
