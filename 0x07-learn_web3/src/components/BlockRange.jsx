import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaFilter } from 'react-icons/fa'
import { AiFillEye } from 'react-icons/ai'

import Style from "./table.module.css"

const BlockRange = ({ handleClick, blockRangeTxn }) => {
    return (
        <div>
            {
                blockRangeTxn.length === 0 ? (
                    <div className={Style.sorry}>
                        <h1>No data is available</h1>
                    </div>
                ) : (
                    <div className={Style.dataTable}>
                        <div className={Style.column}>
                            <div className={Style.tableTitle}>
                                <p>Hash</p>
                            </div>
                            <div className={Style.tableInfo}>
                                {blockRangeTxn.map((hist, i) => (
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
                                <p>Block</p>
                            </div>
                            <div className={Style.tableInfo}>
                                {blockRangeTxn.map((hist, i) => (
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
                                {blockRangeTxn.map((hist, i) => (
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
                                {blockRangeTxn.map((hist, i) => (
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
                                {blockRangeTxn.map((hist, i) => (
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
                                {blockRangeTxn.map((hist, i) => (
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
                                <p>Gas used</p>
                            </div>
                            <div className={Style.tableInfo}>
                                {blockRangeTxn.map((hist, i) => (
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
                                <p>Gas</p>
                            </div>
                            <div className={Style.tableInfo}>
                                {blockRangeTxn.map((hist, i) => (
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
                                <p>Input</p>
                            </div>
                            <div className={Style.tableInfo}>
                                {blockRangeTxn.map((hist, i) => (
                                    <div key={i} className={Style.transHash}>
                                        <p className={Style.toLink}>
                                            {hist.input || "No data"}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={Style.column}>
                            <div className={Style.tableTitle}>
                                <p>Type</p>
                            </div>
                            <div className={Style.tableInfo}>
                                {blockRangeTxn.map((hist, i) => (
                                    <div key={i} className={Style.transHash}>
                                        <p className={Style.toLink}>
                                            {hist.type}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={Style.column}>
                            <div className={Style.tableTitle}>
                                <p>Trace Id</p>
                            </div>
                            <div className={Style.tableInfo}>
                                {blockRangeTxn.map((hist, i) => (
                                    <div key={i} className={Style.transHash}>
                                        <p className={Style.toLink}>
                                            {hist.traceId}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={Style.column}>
                            <div className={Style.tableTitle}>
                                <p>Is error</p>
                            </div>
                            <div className={Style.tableInfo}>
                                {blockRangeTxn.map((hist, i) => (
                                    <div key={i} className={Style.transHash}>
                                        <p className={Style.toLink}>
                                            {hist.isError}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={Style.column}>
                            <div className={Style.tableTitle}>
                                <p>Contract address</p>
                            </div>
                            <div className={Style.tableInfo}>
                                {blockRangeTxn.map((hist, i) => (
                                    <div key={i} className={Style.transHash}>
                                        <p className={Style.toLink}>
                                            {hist.cotractAddress || "No address"}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default BlockRange