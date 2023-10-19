"use client"
import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import { MdVerified } from 'react-icons/md'
import { RiSendPlaneFill, RiCloseFill } from 'react-icons/ri'
import { ToDoListContext } from '../../context/toDoListApp'

import Style from './index.module.css'
import Sundial from '../../public/assets/sundial.png'
import Data from '../../components/Data'

const Home = () => {
  const [message, setMessage] = useState("")

  const {
    changeToggle,
    checkIfWalletIsConnected,
    connectWallet,
    getToDoList,
    toDoList,
    allAddresses,
    allToDoLists,
    currentAccount,
    error,
    myLists
  } = useContext(ToDoListContext)

  useEffect(() => {
    checkIfWalletIsConnected()
    getToDoList()
  }, [])

  return (
    <div className={Style.home}>
      <div className={Style.navBar}>
        <Image src={Sundial} alt="logo" width={200} height={200}/>
        <div className={Style.connect}>
          {!currentAccount ? (
            <button onClick={() => connectWallet()}> Connect Wallet</button>
            ) : (
            <button>
              {currentAccount.slice(0, 6)}...{currentAccount.slice(currentAccount.leng  - 4)}
            </button>)
          }
        </div>
      </div>
      <div className={Style.home_box}>
        <div className={Style.completed}>
          <h2>To do</h2>
          <div >
            {myLists.map((li, i) => (
              <div className={Style. home_completed_list}>
                <MdVerified className={Style.iconColour}/>
                <p>{li.slice(0, 15)}...</p>
              </div>
            ))}
          </div>
        </div>
        <div className={Style.home_create}>
          <div className={Style.home_create_box}>
            <h2>Create list</h2>
            <div className={Style.home_create_input}>
              <input
                type='text'
                placeholder='Write something'
                onChange={e => setMessage(e.target.value)}
              />

              {currentAccount ? (
                <RiSendPlaneFill
                  className={Style.iconBlack}
                  onChange={() => toDoList(message)}
                />
              ) : (
                <RiSendPlaneFill
                  className={Style.iconBlack}
                  onChange={() => connectWallet()}
                />
              )}
            </div>
            <Data
              allToDoLists={allToDoLists}
              allAddresses={allAddresses}
              myLists={myLists}
              changeToggle={changeToggle}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
