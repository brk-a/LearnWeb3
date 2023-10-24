import { useState, useEffect, useContext } from 'react'
import { AiFillEye } from "react-icons/ai"
import Link from 'next/link'

import Style from "./table.module.css"

const Transaction = ({ accountHistory, handleClick }) => {
    return (
        <div className={Style.dataTable}>
            <div className={Style.column}>
                <div className={Style.tableTitle}>
                    <p>Transaction hash</p>
                </div>
                <div className={Style.tableInfo}>
                    {accountHistory.map((hist, i) => (
                        <div key={i} className={Style.transHash}>
                            <AiFillEye />
                            <p>
                                {hist.hash.slice(0, 16)}...{hist.hash.slice(-4)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={Style.column}>
                <div className={Style.tableTitle}>
                    <p>Method</p>
                </div>
                <div className={Style.tableInfo}>
                    {accountHistory.map((hist, i) => (
                        <div key={i} className={Style.transHash}>
                            <p> Transfer</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={Style.column}>
                <div className={Style.tableTitle}>
                    <p>Block</p>
                </div>
                <div className={Style.tableInfo}>
                    {accountHistory.map((hist, i) => (
                        <div key={i} className={Style.transHash}>
                            <p className={Style.toLink}>
                                <Link href={{ pathname: "/block/", query: hist.blockNumber }} legacyBehavior>
                                    <a onClick={handleClick}>
                                        {hist.blockNumber}
                                    </a>
                                </Link>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={Style.column}>
                <div className={Style.tableTitle}>
                    <p>Time stamp</p>
                </div>
                <div className={Style.tableInfo}>
                    {accountHistory.map((hist, i) => (
                        <div key={i} className={Style.transHash}>
                            <p className={Style.toLink}>
                                {hist.timeStamp}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={Style.column}>
                <div className={Style.tableTitle}>
                    <p>From</p>
                </div>
                <div className={Style.tableInfo}>
                    {accountHistory.map((hist, i) => (
                        <div key={i} className={Style.transHash}>
                            <p className={Style.toLink}>
                                {hist.from.slice(0, 10)}...{hist.from.slice(-4)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={Style.column}>
                <div className={Style.tableTitle}>
                    <p>To</p>
                </div>
                <div className={Style.tableInfo}>
                    {accountHistory.map((hist, i) => (
                        <div key={i} className={Style.transHash}>
                            <p className={Style.toLink}>
                                <Link href={{ pathname: "/block/", query: hist.to }} legacyBehavior>
                                    <a onClick={handleClick}>
                                        {hist.to.slice(0, 10)}...{hist.to.slice(-4)}
                                    </a>
                                </Link>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={Style.column}>
                <div className={Style.tableTitle}>
                    <p>Value</p>
                </div>
                <div className={Style.tableInfo}>
                    {accountHistory.map((hist, i) => (
                        <div key={i} className={Style.transHash}>
                            <p className={Style.toLink}>
                                {hist.value.slice(0, 6)}...
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={Style.column}>
                <div className={Style.tableTitle}>
                    <p>Gas price</p>
                </div>
                <div className={Style.tableInfo}>
                    {accountHistory.map((hist, i) => (
                        <div key={i} className={Style.transHash}>
                            <p className={Style.toLink}>
                                {hist.gasPrice}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={Style.column}>
                <div className={Style.tableTitle}>
                    <p>Block hash</p>
                </div>
                <div className={Style.tableInfo}>
                    {accountHistory.map((hist, i) => (
                        <div key={i} className={Style.transHash}>
                            <p className={Style.toLink}>
                                {hist.blockHash.slice(0, 10)}...{hist.blockHash.slice(-4)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={Style.column}>
                <div className={Style.tableTitle}>
                    <p>Confirmation</p>
                </div>
                <div className={Style.tableInfo}>
                    {accountHistory.map((hist, i) => (
                        <div key={i} className={Style.transHash}>
                            <p className={Style.toLink}>
                                {hist.confirmations || hist.confirmation}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={Style.column}>
                <div className={Style.tableTitle}>
                    <p>Cumulative gas</p>
                </div>
                <div className={Style.tableInfo}>
                    {accountHistory.map((hist, i) => (
                        <div key={i} className={Style.transHash}>
                            <p className={Style.toLink}>
                                {hist.cumulativeGasUsed}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={Style.column}>
                <div className={Style.tableTitle}>
                    <p>Gas</p>
                </div>
                <div className={Style.tableInfo}>
                    {accountHistory.map((hist, i) => (
                        <div key={i} className={Style.transHash}>
                            <p className={Style.toLink}>
                                {hist.gas}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={Style.column}>
                <div className={Style.tableTitle}>
                    <p>Gas used</p>
                </div>
                <div className={Style.tableInfo}>
                    {accountHistory.map((hist, i) => (
                        <div key={i} className={Style.transHash}>
                            <p className={Style.toLink}>
                                {hist.gasUsed}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={Style.column}>
                <div className={Style.tableTitle}>
                    <p>Nonce</p>
                </div>
                <div className={Style.tableInfo}>
                    {accountHistory.map((hist, i) => (
                        <div key={i} className={Style.transHash}>
                            <p className={Style.toLink}>
                                {hist.nonce}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={Style.column}>
                <div className={Style.tableTitle}>
                    <p>Index</p>
                </div>
                <div className={Style.tableInfo}>
                    {accountHistory.map((hist, i) => (
                        <div key={i} className={Style.transHash}>
                            <p className={Style.toLink}>
                                {hist.transactionIndex}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={Style.column}>
                <div className={Style.tableTitle}>
                    <p>Status</p>
                </div>
                <div className={Style.tableInfo}>
                    {accountHistory.map((hist, i) => (
                        <div key={i} className={Style.transHash}>
                            <p className={Style.toLink}>
                                {hist.txreceipt_status}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Transaction