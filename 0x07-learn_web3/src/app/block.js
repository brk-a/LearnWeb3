import { useState, useEffect, useContext } from "react"
import { useRouter } from "next/navigation"
import { ethers } from "ethers"
import Link from "next/link"
import { FaFilter } from "react-icons/fa"
import { AiOutlineEye } from "react-icons/ai"

import Style from "../components/table.module.css"
import StyleTransaction from "./block.module.css"
import { Etherescan } from "@/context/Ether"

const block = () => {
    const { provider } = useContext(Etherescan)
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [blockData, setBlockData] = useState([])
    const [transaction, setTransaction] = useState([])
    const [ethGasLimit, setEthGasLimit] = useState("")
    const [ethDifficulty, setEthDifficulty] = useState("")
    const [ethGasUsed, setEthGasUsed] = useState("")
    const [blockNum, setBlockNum] = useState(true)
    const [txnTab, setTxnTab] = useState(false)

    const { query } = router
    const blockNumber = Number(Object.keys(query)[0])
    const dataBlock = []

    const openTab = () => {
        if (blockNum) {
            setBlockNum(false)
            setTransaction(true)
        } else if (txnTab) {
            setBlockNum(true)
        }
    }

    const getBlockDetails = async () => {
        try {
            const getBlock = await provider.getBlock(blockNumber)
            dataBlock.push(getBlock)
            setBlockData(getBlock)

            const gasLimit = ethers.utils.formatEther(getBlock.gasLimit)
            setEthGasLimit(gasLimit)

            const gasUsed = ethers.utils.formatEther(getBlock.gasUsed)
            setEthGasUsed(gasUsed)

            const difficulty = ethers.utils.formatEther(getBlock._difficulty)
            setEthDifficulty(difficulty)

            setTransaction(getBlock.transactions)
        } catch (error) {
            console.info("getBlockDetailsError", error)
        }
    }

    useEffect(() => {
        getBlockDetails()
    }, [])
    return (
        <div className={StyleTransaction.block}>
            <div className={Style.box}>
                <div className={StyleTransaction.box__header}>
                    <h3>Block Number</h3>
                    <p>{blockNumber}</p>
                </div>
                <div className={StyleTransaction.blockTable}>
                    <div className={StyleTransaction.blockBtn}>
                        <button onClick={openTab}>
                            Block details
                        </button>
                        <button onClick={openTab}>
                            Block Transactions
                        </button>
                    </div>
                    {blockNum ? (
                        <div>
                            <div className={StyleTransaction.dataRow}>
                                <p>Number</p>
                                <p>{blockData.number}</p>
                            </div>
                            <div className={StyleTransaction.dataRow}>
                                <p>Time stamp</p>
                                <p>{blockData.timestamp}</p>
                            </div>
                            <div className={StyleTransaction.dataRow}>
                                <p>Miner</p>
                                <Link href={{ pathname: "/account/", query: blockData.miner }}>
                                    <p className={StyleTransaction.colour}>
                                        {blockData.miner.slice(0, 10)}...{blockData.miner.slice(-4)}
                                    </p>
                                </Link>
                            </div>
                            <div className={StyleTransaction.dataRow}>
                                <p>Hash</p>
                                <p>{blockData.hash}</p>
                            </div>
                            <div className={StyleTransaction.dataRow}>
                                <p>Parent hash</p>
                                <p>{blockData.parentHash || "No data"}</p>
                            </div>
                            <div className={StyleTransaction.dataRow}>
                                <p>Nonce</p>
                                <p>{blockData.nonce}</p>
                            </div>
                            <div className={StyleTransaction.dataRow}>
                                <p>Extra data</p>
                                <p>{blockData.extraData}</p>
                            </div>
                            <div className={StyleTransaction.dataRow}>
                                <p>Difficulty</p>
                                <p>{blockData.difficulty || "No data"}</p>
                            </div>
                            <div className={StyleTransaction.dataRow}>
                                <p>Gas limit</p>
                                <p>{ethGasLimit} ETH</p>
                            </div>
                            <div className={StyleTransaction.dataRow}>
                                <p>Gas used</p>
                                <p>{ethGasUsed} ETH</p>
                            </div>
                            <div className={StyleTransaction.dataRow}>
                                <p>Difficulty</p>
                                <p>{ethDifficulty} ETH</p>
                            </div>
                        </div>
                    ) : (
                        <div className={StyleTransaction.dataTable}>
                            <div className={Style.column}>
                                <div className={Style.tableTitle}>
                                    <p>All txns in the block ({transaction.length})</p>
                                </div>
                                <div className={Style.tableInfo}>
                                    {transaction.map((hist, i) => (
                                        <div key={i} className={Style.transHash}>
                                            <span>{i+1}</span>
                                            <p className={Style.toLink}>
                                                <Link href={{ pathname: "/transaction/", query: blockData.hash }} legacyBehavior>
                                                    <p className={StyleTransaction.colour}>
                                                        {hist}
                                                    </p>
                                                </Link>
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
            </div>
            </div>
            </div>
            )
}

            export default block