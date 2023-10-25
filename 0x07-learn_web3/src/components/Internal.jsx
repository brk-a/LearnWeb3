import { useState, useEffect } from 'react'
import { FaFilter } from 'react-icons/fa'
import { AiFillEye } from 'react-icons/ai'
import Link from 'next/link'

import Style from "./table.module.css"

const Internal = (internalByAddress, handleClick) => {
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
        </div>
    )
}

export default Internal