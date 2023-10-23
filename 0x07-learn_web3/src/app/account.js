import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ethers } from 'ethers'

import Table from '@/components/Table'
import { Etherescan } from '@/context/Ether'
import Style from "./account.module.css"
import etherLogo from "../assets/eth-logo.png"
import logo from "../assets/logo-no-bg"

const apiKey = process.env.ETHERSCAN_API_KEY

const account = () => {
    const { provider } = useContext(Etherescan)
    const router = useRouter()
    const { query } = router
    const acc = Object.keys(query)[0]

    const [account, setAccount] = useState("")
    const [balance, setBalance] = useState("")
    const [totalTxns, setTotalTxns] = useState("")
    const [name, setName] = useState("")
    const [open, setOpen] = useState(true)
    const [loading, setLoading] = useState(true)
    const [accountHistory, setAccountHistory] = useState([])
    const [internalByAddress, setInternalByAddress] = useState([])
    const [ERC20, setERC20] = useState([])
    const [ERC21, setERC21] = useState([])
    const [ERC1155, setERC1155] = useState([])
    const [blockMinedByAddress, setBlockMinedByAddress] = useState("")
    const [blockRangeTxn, setBlockRangeTxn] = useState([])

    const accountData = async () => {
        try {
            setAccount(acc)

            if (open) {
                setOpen(false)
            }

            const ESN = await provider.lookupAddress(acc)
            if (ESN === null) {
                setName(ESN)
                setLoading(false)
                console.info("accountData: name is set to null")
            } else {
                setName(ESN)
                setLoading(false)
                console.info(`accountData: name is set to ${name}`)
            }

            const accountBalance = await provider.getBalance(acc)
            const accountBalanceETH = ethers.utils.formatEther(accountBalance)
            setBalance(accountBalanceETH)

            // ** calls to APIs
            /**txn list (hist) */
            const txnHistoryResponse = await fetch(`https://api.etherscan.io/api?module=account&action=txlist&address=${acc}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apiKey}`)
            const txnHistoryData = txnHistoryResponse.json()
            if(txnHistoryData.ok){
                setAccountHistory(txnHistoryData.result)
            } else {
                console.info("accountData: txnHistoryData is not ok")
            }

            /**txn hist internal by hash */
            const txnHistInternalResponse = await axios.get(`https://api.etherscan.io/api?module=account&action=txlistinternal&address=${acc}&startblock=0&endblock=2702578&page=1&offset=10&sort=asc&apikey=${apiKey}`)
            setInternalByAddress(txnHistInternalResponse.data.result)

            /**ERC20 */
            const erc20Response = await axios.get(`https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2&address=${acc}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${apiKey}`)
            setERC20(erc20Response.data.result)

            /**mined block by address */
            const blockMinedByAddressResponse = await axios.get(`https://api.etherscan.io/api?module=account&action=getminedblocks&address=${acc}&blocktype=blocks&page=1&offset=10&apikey=${apiKey}`)
            setBlockMinedByAddress(blockMinedByAddressResponse.data.result)

            /**block range */
            const blockRangeResponse = await axios.get(`https://api.etherscan.io/api?module=account&action=txlistinternal&startblock=13481773&endblock=13491773&page=1&offset=10&sort=asc&apikey=${apiKey}`)
            setBlockRangeTxn(blockRangeResponse.data.result) 

            /**ERC21 */
            const erc21Response = await axios.get(`https://api.etherscan.io/api?module=account&action=tokennfttx&contractaddress=0x06012c8cf97bead5deae237070f9587f8e7a266d&address=${acc}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${apiKey}`)
            setERC21(erc21Response.data.result)

            /**ERC1155 */
            const erc1155Response = await axios.get(`https://api.etherscan.io/api?module=account&action=token1155tx&contractaddress=0x76be3b62873462d2142405439777e971754e8e77&address=${acc}&page=1&offset=100&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`)
            setERC1155(erc1155Response.data.result)

        } catch (error) {
            console.info("accountDataError", error)
        }
    }

    //
    return (
        <div className={Style.accountDIV}>
            {open ? (
                <div className={Style.btnContainer}>
                    <h1>
                        {open ? (
                            <>Karibu FN Etherscan</>
                        ) : (
                            <>Please wait as we load your data...</>
                        )}
                    </h1>
                    <button
                        className={Style.openBtn}
                        onClick={() => accountData()}
                    >
                        Get account data
                    </button>
                </div>
            ) : (
                <div>
                    {loading ? (
                        <div className={Style.loading}>
                            <Image src={logo} alt='logo' width={100} height={100} />
                        </div>
                    ) : (
                        <></>
                    )}
                    {!loading ? (
                        <div className={Style.container}>
                            <div className={Style.box}>
                                <div className={Style.account}>
                                    <Image src={etherLogo} alt='eth-logo' width={24} height={36}/>
                                    <p>
                                        Address &nbsp; <span>{acc}</span>
                                    </p>
                                </div>
                                <div className={Style.owner}>
                                    <p onClick={accountData}>
                                        Owner
                                    </p>
                                    {name || "No name"}
                                </div>
                            </div>
                            <div className={Style.overviewBox}>
                                <div className={Style.overview}>
                                    <div className={Style.overviewTitle}>
                                        <p>Overview</p>
                                        <p className={Style.miner}>
                                            {name || "No name"} &nbsp; {<>{account.slice(0,6)}...{account.slice(-4)}</> || ""}
                                        </p>
                                    </div>
                                    <div className={Style.accountBalance}>
                                        <p className={Style.colour}>Balance</p>
                                        <p>{balance} ETH</p>
                                    </div>
                                    <div className={Style.accountValue}>
                                        <p className={Style.colour}>Value</p>
                                        <p>USD {balance}</p>
                                    </div>
                                </div>
                                <div className={Style.branding}>
                                    <h2>
                                        Karibu <br/>
                                        FN Etherscan
                                    </h2>
                                    <p>
                                        Hi.<br/>Welcome to FN Etherscan, a finance tracker built just for you!<br/>
                                        Here is the status of {name || <>{account.slice(0,6)}...{account.slice(-4)}</>} &nbsp;...<br/>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    {!loading ? (
                        <Table
                            accountHistory={accountHistory}
                            totalTxns={totalTxns}
                            internalByAddress={internalByAddress}
                            ERC20={ERC20}
                            ERC21={ERC21}
                            ERC1155={ERC1155}
                            accountData={accountData}
                            blockMinedByAddress={blockMinedByAddress}
                            blockRangeTxn={blockRangeTxn}
                        />
                     ):(
                        <></>
                     )}
                </div>
            )}
        </div>
    )
}

export default account