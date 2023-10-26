import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { ethers } from 'ethers'
import { useRouter } from 'next/navigation'

import StyleTransaction from "./block.module.css"
import { Etherescan } from '@/context/Ether'

const transaction = () => {
    const { provider } = useContext(Etherescan)
    const router = useRouter()
    const { query } = router
    const txnDetails = []
    const [txnData, setTxnData] = useState(txnDetails)
    const [ethGasLimit, setEthGasLimit] = useState("")
    const [gasPrice, setGasPrice] = useState("")
    const [value, setValue] = useState("")

    const hash = Object.keys(query)[0]

    const getDataOfTxn = async () => {
        try {
            const transactionDetails = await provider.getTransaction(hash)
            setTxnData(transactionDetails)
            txnDetails.push(transactionDetails)

            const gasLimitPrice = ethers.utils.formatUnits(transactionDetails.gasLimit)
            setEthGasLimit(gasLimitPrice)

            const gasPriceCon = ethers.utils.formatUnits(transactionDetails.gasPrice)
            setGasPrice(gasPriceCon)

            const etherValue = ethers.utils.formatUnits(transactionDetails.value)
            setValue(etherValue)
        } catch (error) {
            console.info("getDataOfTxnError", error)
        }
    }

    useEffect(() => {
        getDataOfTxn()
    }, [])

    return (
        <div class={StyleTransaction.block}>
            <div className={StyleTransaction.box}>
                <div className={StyleTransaction.box__header}>
                    <h3>Transaction hash</h3>
                    <p>{hash}</p>
                </div>
                <div className={StyleTransaction.blockTable}>
                    <div className={StyleTransaction.dataRow}>
                        <div>Number</div>
                        <Link href={{ pathname: "/block/", query: txnData.blockNumber }}>
                            <p className={StyleTransaction.colour}>
                                {txnData.blockNumber}
                            </p>
                        </Link>
                    </div>
                    <div className={StyleTransaction.dataRow}>
                        <p>From</p>
                        <Link href={{ pathname: "/account/", query: txnData.from }}>
                            <p className={StyleTransaction.colour}>
                                {txnData.from}
                            </p>
                        </Link>
                    </div>
                    <div className={StyleTransaction.dataRow}>
                        <p>To</p>
                        <Link href={{ pathname: "/account/", query: txnData.to }}>
                            <p className={StyleTransaction.colour}>
                                {txnData.to}
                            </p>
                        </Link>
                    </div>
                    <div className={StyleTransaction.dataRow}>
                        <div>Hash</div>
                        <p>
                            {txnData.hash || "No data"}
                        </p>
                    </div>
                    <div className={StyleTransaction.dataRow}>
                        <div>Nonce</div>
                        <p>
                            {txnData.nonce || "No data"}
                        </p>
                    </div>
                    <div className={StyleTransaction.dataRow}>
                        <div>Transaction index</div>
                        <p>
                            {txnData.transactionIndex || "No data"}
                        </p>
                    </div>
                    <div className={StyleTransaction.dataRow}>
                        <div>R</div>
                        <p>
                            {txnData.r || "No data"}
                        </p>
                    </div>
                    <div className={StyleTransaction.dataRow}>
                        <div>S</div>
                        <p>
                            {txnData.s || "No data"}
                        </p>
                    </div>
                    <div className={StyleTransaction.dataRow}>
                        <div>Gas limit</div>
                        <p>
                            {ethGasLimit}
                        </p>
                    </div>
                    <div className={StyleTransaction.dataRow}>
                        <div>Gas price</div>
                        <p>
                            {gasPrice}
                        </p>
                    </div>
                    <div className={StyleTransaction.dataRow}>
                        <div>Type</div>
                        <p>
                            {txnData.type || "No data"}
                        </p>
                    </div>
                    <div className={StyleTransaction.dataRow}>
                        <div>V</div>
                        <p>
                            {txnData.v || "No data"}
                        </p>
                    </div>
                    <div className={StyleTransaction.dataRow}>
                        <div>Value</div>
                        <p>
                            {value}
                        </p>
                    </div>
                    <div className={StyleTransaction.dataRow}>
                        <div>Chain id</div>
                        <p>
                            {txnData.chainId || "No data"}
                        </p>
                    </div>
                    <div className={StyleTransaction.dataRow}>
                        <div>Confirmation</div>
                        <p>
                            {txnData.confirmation || "No data"}
                        </p>
                    </div>
                    <div className={StyleTransaction.dataRow}>
                        <div>Creates</div>
                        <p>
                            {txnData.creates || "No data"}
                        </p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default transaction