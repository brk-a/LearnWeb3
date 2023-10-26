import { useState, useEffect } from 'react'
import { FaFilter } from 'react-icons/fa'
import { AiFillEye } from 'react-icons/ai'
import Link from 'next/link'

import Style from "./table.module.css"

const Internal = ({internalByAddress, handleClick}) => {
    return (
        <div className={Style.dataTable}>
            <div className={Style.column}>
                <div className={Style.tableTitle}>
                    <p>Hash</p>
                </div>
                <div className={Style.tableInfo}>
                    {internalByAddress.map((obj, i) => (
                        <div key={i} className={Style.transHash}>
                            <AiFillEye/>
                            <p>
                                {obj.hash.slice(0, 10)}...{obj.hash.slice(-4)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={Style.column}>
                <div className={Style.tableTitle}>
                    <p>Block number</p>
                </div>
                <div className={Style.tableInfo}>
                    {internalByAddress.map((obj, i) => (
                        <div key={i} className={Style.transHash}>
                            <p className={Style.toLink}>
                                <Link href={{pathname: "/block/", query: obj.blockNumber}} legacyBehavior>
                                    <a>{obj.blockNumber}</a>
                                </Link>
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
                    {internalByAddress.map((obj, i) => (
                        <div key={i} className={Style.transHash}>
                            <p>
                                {obj.traceId}
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
                    {internalByAddress.map((obj, i) => (
                        <div key={i} className={Style.transHash}>
                            <p>
                                {obj.timeStamp}
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
                    {internalByAddress.map((obj, i) => (
                        <div key={i} className={Style.transHash}>
                            <p className={Style.toLink}>
                                <Link href={{pathname: "/account/", query: obj.from}} legacyBehavior>
                                    <a onClick={handleClick}>
                                        {obj.from.slice(0, 10)}...{obj.from.slice(-4)}
                                    </a>
                                </Link>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className={Style.column}>
                <div className={Style.tableTitle}>
                    <p>to</p>
                </div>
                <div className={Style.tableInfo}>
                    {internalByAddress.map((obj, i) => (
                        <div key={i} className={Style.transHash}>
                            <p>
                                {obj.to.slice(0, 10)}...{obj.hash.slice(-4)}
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
                    {internalByAddress.map((obj, i) => (
                        <div key={i} className={Style.transHash}>
                            <p>
                                {obj.value.slice(0, 6)}...{obj.hash.slice(-4)}
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
                    {internalByAddress.map((obj, i) => (
                        <div key={i} className={Style.transHash}>
                            <p>
                                {obj.gasUsed}
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
                    {internalByAddress.map((obj, i) => (
                        <div key={i} className={Style.transHash}>
                            <p>
                                {obj.isError}
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
                    {internalByAddress.map((obj, i) => (
                        <div key={i} className={Style.transHash}>
                            <p>
                                {obj.gas}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Internal