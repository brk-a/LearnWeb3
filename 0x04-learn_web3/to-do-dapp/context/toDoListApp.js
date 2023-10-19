"use client"

import React, { createContext, useEffect, useState } from 'react'
import Web3Modal from "web3modal"
import { ethers, BrowserProvider } from 'ethers'
import { toDoListAbi, toDoListAddress } from './constants'
// const ethers = require("ethers")


const fetchContract = (signerOrProvider) => new ethers.Contract(
    toDoListAddress,
    toDoListAbi,
    signerOrProvider
)

const connectToContract = async () => {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    // const provider = await new ethers.providers.Web3Provider(connection)
    const provider =  new BrowserProvider(connection)
    const signer = await provider.getSigner()
    const contract = fetchContract(signer)

    return contract
}

export const ToDoListContext = createContext()
export const ToDoListProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('')
    const [error, setError] = useState('')
    const [allToDoLists, setAllToDoLists] = useState([])
    const [myLists, setMyLists] = useState([])
    const [allAddresses, setAllAddresses] = useState([])

    const checkIfWalletIsConnected = async () => {
        if (!window, ethereum) return setError("Please install metamask")

        const account = await window.ethereum.request({ method: "eth_accounts" })
        if (account.length) {
            setCurrentAccount(account[0])
            console.info(`Connected to account ${currentAccount}`)
        } else {
            setError("Connect an account on Metamask and reload")
        }
    }

    const connectWallet = async () => {
        if (!window.ethereum) return setError("Please install metamask")

        const account = await window.ethereum.request({ method: "eth_requestAccount" })
        setCurrentAccount(account[0])
    }

    const toDoList = async (message) => {
        try {
            const contract = await connectToContract()
            const createList = await contract.createList(message)
            createList.wait()

            console.info(createList)
        } catch (error) {
            setError("create list: something went wrong")
            console.info(error)
        }
    }

    const getToDoList = async () => {
        try {
            const contract = await connectToContract()
            const getAllAddresses = await contract.getAddress()
            setAllAddresses(getAllAddresses)
            
            allAddresses.map(async addr => {
                const getSingleAddressData = await contract.getCreatorData(addr)
                allToDoLists.push(getToDoList)
                console.info(getSingleAddressData)
            })

            const allMessages = await contract.getMessage()
            setMyLists(allMessages)
        } catch (error) {
            setError("get list: something went wrong")
            console.info(error)
        }
    }

    const changeToggle = async (address) => {
        try {
            const contract = await connectToContract()
            const toggleState = await contract.toggle(address)
            toggleState.wait()
            // console.info(toggleState)
        } catch (error) {
            setError("change toggle: something went wrong")
            console.info(error)
        }
    }

    return (
        <ToDoListContext.Provider value={{
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
        }}>
            {children}
        </ToDoListContext.Provider>
    )
}