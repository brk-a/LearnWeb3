import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaFilter } from 'react-icons/fa'
import { AiFillEye } from 'react-icons/ai'

import Style from "./table.module.css"

const MinedBlock = ({ handleClick, blockMinedByAddress }) => {
    return (
        <div>
            {blockMinedByAddress === 0 ? (
                <div className={Style.sorry}>
                    No data is available
                </div>
            ) : (
                <div className={Style.dataTable}>
                    <div className={Style.column}>
                        <div className={Style.tableTitle}>
                            <p>Block number</p>
                        </div>
                        <div className={Style.tableInfo}>
                            {blockMinedByAddress.map((obj, i) => (
                                <div key={i} className={Style.transHash}>
                                    <AiFillEye />
                                    <p className={Style.toLink}>
                                        <Link href={{pathname: "/block/", query:obj.blockNumber}} legacyBehavior>
                                            <a>{obj.blockNumber}</a>
                                        </Link>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={Style.column}>
                        <div className={Style.tableTitle}>
                            <p>Block reward</p>
                        </div>
                        <div className={Style.tableInfo}>
                            {blockMinedByAddress.map((obj, i) => (
                                <div key={i} className={Style.transHash}>
                                    <p>
                                        {obj.blockReward.slice(0, 10)}...{obj.blockReward.slice(-4)}
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
                            {blockMinedByAddress.map((obj, i) => (
                                <div key={i} className={Style.transHash}>
                                    <p>
                                        {obj.timeStamp}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MinedBlock