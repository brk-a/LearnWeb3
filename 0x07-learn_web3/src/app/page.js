"use client"

import { useState, useEffect, useContext } from "react"
import { useRouter } from 'next/navigation'
import Image from "next/image"
import Link from "next/link"
import { ethers } from "ethers"
import { SiMinutemailer } from "react-icons/si"

import Style from "./page.module.css"
import etherLogo from "../assets/eth-logo.png"
import { Etherescan } from "@/context/Ether"

const Home = () => {
    const router = useRouter()
    const {
        data,
        currentBlock,
        topTenBlocks,
        blockTransactions,
        transaction,
        gasPrice,
        provider
    } = useContext(Etherescan)
    const [userAccount, setUserAccount] = useState("")

    const accountAddress = (e) => {
        e.preventDefault()
        router.push(`/account?${userAccount}`)
        setUserAccount("")
    }
    return (
        <>
            <div className={Style.header}>
                <form className={Style.accountAddress} >
                    <input
                        type="text"
                        placeholder="Enter address"
                        id="accountAddress"
                        value={userAccount}
                        onChange={(e) => setUserAccount((e.target.value).trim())}
                    />
                    <Link href={{pathname: "/account", query: userAccount}} legacyBehavior>
                        <a>
                        <SiMinutemailer onClick={accountAddress}/>
                        </a>
                    </Link>
                </form>
            </div>
            <div className={Style.container}>
                <div className={Style.container__box}>
                    <h3>Latest blocks</h3>
                    <div className={Style.container__block}>
                        {blockTransactions.map((txn, i) => (
                            <div key={i} className={Style.oneBlock}>
                                <div className={Style.block}>
                                    <div className={Style.info}>
                                        <p className={Style.bk}>BK</p>
                                        <Link href={{pathname: "/block", query: txn.number}}>
                                            txn.number
                                        </Link>
                                    </div>
                                    <p>{txn.timestamp}</p>
                                </div>
                                <div>
                                    <div className={Style.miner}>
                                        <p>
                                            <span>
                                                Miner: &nbsp; &nbsp;
                                                <Link className={Style.link} href={{pathname: "/account", query: txn.miner}} legacyBehavior>
                                                    <a>
                                                        {txn.miner.slice(0, 6)}...{txn.miner.slice(-4)}
                                                    </a>
                                                </Link>
                                            </span>
                                        </p>
                                        <span>
                                            <Link className={Style.link} href={{pathname: "/account", query: txn.number}} legacyBehavior>
                                                <a>
                                                    {txn.transactions.length}
                                                </a>
                                            </Link>
                                            &nbsp; txns per 30s
                                        </span>
                                    </div>
                                    <div className={Style.reward}>
                                        <p>
                                            {ethers.utils.formatUnits(txn.baseFeePerGas, "ether")}<span>ETH</span>
                                            <Image src={etherLogo} alt="eth-logo" width={10} height={10} className={Style.eth}/>

                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>  
                <div className={Style.container__box}>
                    <h3>Latest transactions</h3>
                    <div className={Style.container__block}>
                        {transaction.map((tx, i) => (
                            <div key={i} className={Style.oneBlock}>
                                <div className={Style.info}>
                                    <div>
                                        <p className={Style.bx}>TX</p>
                                    </div>
                                    <Link href={{pathname: "/transaction", query: tx }} legacyBehavior>
                                        <a>Hash: &nbsp; {tx.slice(0, 6)}...{tx.slice(-4)}</a>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
