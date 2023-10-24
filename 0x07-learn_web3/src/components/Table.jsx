import { useState, useEffect, useContext } from 'react'
import { FaFilter } from "react-icons/fa"
import { AiFillEye } from "react-icons/ai"
import Link from 'next/link'

import Style from "./table.module.css"
import Transaction from './Transaction'
import ERC20Token from './ERC20Token'
import ERC21Token from './ERC21Token'
import ERC1155Token from './ERC1155Token'
import Internal from './Internal'
import MinedBlock from './MinedBlock'
import BlockRange from './BlockRange'

const Table = ({
    accountHistory,
    totalTxns,
    internalByAddress,
    ERC20,
    ERC21,
    ERC1155,
    accountData,
    blockMinedByAddress,
    blockRangeTxn
}) => {
    const [historyAccount, setHistoryAccount] = useState(true)
    const [addressInternalTxn, setAddressInternalTxn] = useState(false)
    const [openERC20, setOpenERC20] = useState(false)
    const [openERC21, setOpenERC21] = useState(false)
    const [openERC1155, setOpenERC1155] = useState(false)
    const [addressByMinedBlock, setAddressByMinedBlock] = useState(false)
    const [txnRangeBlock, setTxnRangeBlock] = useState(false)

    const tabs = e => {
        const buttonText = e.target.innerText

        if(buttonText==="Transactions"){
            setHistoryAccount(true)
            setAddressByMinedBlock(false)
            setAddressInternalTxn(false)
            setOpenERC1155(false)
            setOpenERC20(false)
            setOpenERC21(false)
            setTxnRangeBlock(false)
        } else if(buttonText==="Internal"){
            setHistoryAccount(false)
            setAddressByMinedBlock(false)
            setAddressInternalTxn(true)
            setOpenERC1155(false)
            setOpenERC20(false)
            setOpenERC21(false)
            setTxnRangeBlock(false)
        } else if(buttonText==="Mined"){
            setHistoryAccount(false)
            setAddressByMinedBlock(true)
            setAddressInternalTxn(false)
            setOpenERC1155(false)
            setOpenERC20(false)
            setOpenERC21(false)
            setTxnRangeBlock(false)
        } else if(buttonText==="ERC20"){
            setHistoryAccount(false)
            setAddressByMinedBlock(false)
            setAddressInternalTxn(false)
            setOpenERC1155(false)
            setOpenERC20(true)
            setOpenERC21(false)
            setTxnRangeBlock(false)
        } else if(buttonText==="ERC21"){
            setHistoryAccount(false)
            setAddressByMinedBlock(false)
            setAddressInternalTxn(false)
            setOpenERC1155(false)
            setOpenERC20(false)
            setOpenERC21(true)
            setTxnRangeBlock(false)
        } else if(buttonText==="ERC1155"){
            setHistoryAccount(false)
            setAddressByMinedBlock(false)
            setAddressInternalTxn(false)
            setOpenERC1155(true)
            setOpenERC20(false)
            setOpenERC21(false)
            setTxnRangeBlock(false)
        } else if(buttonText==="Trans"){
            setHistoryAccount(false)
            setAddressByMinedBlock(false)
            setAddressInternalTxn(false)
            setOpenERC1155(false)
            setOpenERC20(false)
            setOpenERC21(false)
            setTxnRangeBlock(true)
        }
    }
  return (
    <div className={Style.table}>
        <div className={Style.table__head}>
            <button
                className={Style.btn}
                onClick={e => tabs(e)}
            >
                Transactions
            </button>
            <button
                className={Style.btn}
                onClick={e => tabs(e)}
            >
                Internal
            </button>
            <button
                className={Style.btn}
                onClick={e => tabs(e)}
            >
                Mined
            </button>
            <button
                className={Style.btn}
                onClick={e => tabs(e)}
            >
                ERC20
            </button>
            <button
                className={Style.btn}
                onClick={e => tabs(e)}
            >
                ERC21
            </button>
            <button
                className={Style.btn}
                onClick={e => tabs(e)}
            >
                ERC1155
            </button>
            <button
                className={Style.btn}
                onClick={e => tabs(e)}
            >
                Trans
            </button>
        </div>
        <div className={Style.numberOfTrans}>
            <FaFilter/>
            <p>
                Latest 10  of <span>{totalTxns}</span>
            </p>
        </div>
        {historyAccount ? (
            <Transaction handleClick={accountData} accountHistory={accountHistory}/>
        ) : (
            <></>
        )}
        {addressInternalTxn ? (
            <Internal internalByAddress={internalByAddress} handleClick={accountData}/>
        ) : (
            <></>
        )}
        {openERC20 ? (
            <ERC20Token handleClick={accountData} ERC20={ERC20}/>
        ) : (
            <></>
        )}
        {openERC21 ? (
            <ERC21Token handleClick={accountData} ERC21={ERC21}/>
        ) : (
            <></>
        )}
        {openERC1155 ? (
            <ERC1155Token handleClick={accountData} ERC1155={ERC1155}/>
        ) : (
            <></>
        )}
        {addressByMinedBlock ? (
            <></>
        ) : (
            <MinedBlock  handleClick={accountData} blockMinedByAddress={blockMinedByAddress}/>
        )}
        {txnRangeBlock ? (
            <BlockRange  handleClick={accountData} blockRangeTxn={blockRangeTxn}/>
        ) : (
            <></>
        )}
    </div>
  )
}

export default Table