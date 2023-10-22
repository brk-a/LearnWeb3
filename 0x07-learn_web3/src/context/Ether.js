"use client"
import { createContext, useState, useEffect } from "react";
import { ethers, BrowserProvider } from "ethers";
import axios from "axios";

const apiKey = process.env.INFURA_MAINNET_API_KEY
const provider = new BrowserProvider(`https://mainnet.infura.io/v3/${apiKey}`)

export const Etherescan = createContext()
export const EtherProvider = ({ children }) => {
    const tenBlocksWithDetails = []
    const [blockTransactions, setBlockTransactions] = useState(tenBlocksWithDetails)
    const [currentBlock, setCurrentBlock] = useState([])
    const [topTenBlocks, setTopTenBlocks] = useState([])
    const [transaction, setTransaction] = useState([])
    const [gasPrice, setGasPrice] = useState("")

    const data = {}

    const accountDetails = async () => {
        try {
            const getCurrentBlock = await provider.getBlockNumber()
            setCurrentBlock(getCurrentBlock)

            const getBlockTxn = await provider.getBlock(getCurrentBlock)
            setTransaction(getBlockTxn.transactions)

            const previosBlock = getCurrentBlock - 10
            const list10Blocks = []
            for (let i = getCurrentBlock; i > previosBlock; --i) {
                list10Blocks.push([i]) //why a 2d array?
            }

            const getBlockDetails = list10Blocks.flat() //no need to flatten if no 2d array
            setTopTenBlocks(getBlockDetails)

            getBlockDetails.map(async block => {
                const singleBlockDetail = await provider.getBlock(block)
                tenBlocksWithDetails.push(singleBlockDetail)
            })

            const getGasPrice = await provider.getGasPrice()
            const gasPriceUnits = ethers.utils.formatUnits(getGasPrice)
            setGasPrice(gasPriceUnits) 
        } catch (error) {
            console.info("accountDetailsError", error)
        }
    }

    useEffect(() => {
        accountDetails()
    }, [])
    return (
        <Etherescan.Provider value={{
            data,
            currentBlock,
            topTenBlocks,
            blockTransactions,
            transaction,
            gasPrice,
            provider
        }}>
            {children}
        </Etherescan.Provider>
    )
}