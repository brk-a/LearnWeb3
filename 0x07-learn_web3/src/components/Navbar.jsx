"use client"
import { useState, useEffect, useContext } from "react"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import { MdOutlineClose } from "react-icons/md"
import { TbChartArrowsVertical } from "react-icons/tb"
// import { FiUser } from "react-icons/fi"

import Style from "./navbar.module.css"
import etherLogo from "../assets/eth-logo.png"
import logoNoBg from "../assets/logo-no-bg.png"
import user from "../assets/bored-ape.jpeg"

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY

const Navbar = () => {
    const [userAccount, setUserAccount] = useState("")
    const [balance, setBalance] = useState()
    const [count, setCount] = useState("")
    const [openModal, setOpenModal] = useState(true)
    const [price, setPrice] = useState([])
    const [updatedPriceDate, setUpdatedPriceDate] = useState("")
    const [etherSupply, setEtherSupply] = useState([])

    const getEtherPrice = async () => {
        try {
            const response = await axios.get(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${ETHERSCAN_API_KEY}`)
            const timeStamp = Number(response.data.result.ethbtc_timestamp)
            const date = new Date(timeStamp)

            setPrice(response.data.result)
            setUpdatedPriceDate(`Update: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)

            // console.info("updatedPriceDate", updatedPriceDate)
            // console.info("price", price)
            // console.info("response", response)
        } catch (error) {
            console.info("getEtherPriceError", error)
        }
    }

    const getEtherSupply = async () => {
        try {
            const response = await axios.get(`https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=${ETHERSCAN_API_KEY}`)
            setEtherSupply(response.data.result)
            // console.info("etherSupply",etherSupply)
        } catch (error) {
            console.info("getEtherSupplyError: ", error)
        }
    }

    const checkIfAccountExists = async () => {
        try {
            if (!window.ethereum) {
                console.info("Please install Metamask")
                return
            }

            const accounts = await window.ethereum.request({
                method: "eth_accounts"
            })
            if (accounts.length) {
                setUserAccount(accounts[0])
                // console.info("userAccount", userAccount)
            }
        } catch (error) {
            console.info("checkIfAccountExistsError", error)
        }
    }

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                console.info("Please install Metamask")
                return
            }

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            })
            if (accounts.length) {
                setUserAccount(accounts[0])
                // console.info("userAccount", userAccount)
            } else {
                console.info("connectWallet: You do not have a wallet connected")
                window.location.reload()
            }

        } catch (error) {
            console.info("connectWalletError", error)
        }
    }

    const openUserInfo = () => {
        if (openModal) {
            setOpenModal(false)
        } else if (!openModal) {
            setOpenModal(true)
        }
    }

    useEffect(() => {
        checkIfAccountExists()
        getEtherPrice()
        getEtherSupply()
    }, [])

    return (
        <div>
            <div className={Style.navbar}>
                <div className={Style.navbar__container}>
                    <div className={Style.left}>
                        <Link href="/">
                            <div>
                                <h1>FN Etherscan</h1>
                                <h1 className={Style.mobile}>
                                    <Image src={logoNoBg} width={150} height={150} alt="logo" />
                                </h1>
                            </div>
                        </Link>
                    </div>
                    <div className={Style.right}>
                        {userAccount.length ? (
                            <div className={Style.connected}>
                                <button onClick={() => openUserInfo()}>
                                    {userAccount.slice(0, 6)}...{userAccount.slice(userAccount.length - 4)}
                                </button>
                                {openModal ? (
                                    <div className={Style.userModal}>
                                        <div className={Style.user__box}>
                                            <div className={Style.closeBtn}>
                                                <MdOutlineClose onClick={() => openUserInfo()} />
                                            </div>
                                            {/* <FiUser className={Style.userIcon} /> */}
                                            <Image src={user} alt="user" width={50} height={50} />
                                            <p>
                                                User: &nbsp; {userAccount.slice(0, 6)}...{userAccount.slice(userAccount.length - 4)}
                                            </p>
                                            <p>
                                                Balance: &nbsp;{balance} ETH
                                            </p>
                                            <p>
                                                Total Txns: &nbsp; count
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                        ) : (
                            <button onClick={() => connectWallet()}>
                                Connect wallet
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className={Style.price}>
                <div className={Style.price__box}>
                    <div className={Style.etherPrice}>
                        <div>
                            <Image src={etherLogo} alt="ether" width={100} height={30} />
                        </div>
                        <div className="flex flex-col gap-4">
                            <h2>Ether Price</h2>
                            <p>USD 1234.56</p>
                            <p>BTC 0.123456</p>
                            <p>Updated price</p>
                        </div>
                    </div>
                    <div className={Style.supplyEther}>
                        <div>
                            <TbChartArrowsVertical className={Style.supplyIcon} />
                        </div>
                        <div>
                            <h2>Total ether supply</h2>
                            <p>USD 1234.56</p>
                            <p>BTC 0.123456</p>
                            <p>Updated price</p>
                        </div>
                    </div>
                </div>
                <div className={Style.price__box}>
                    <div className={Style.tokenBox__logo}>
                        <Image src={logoNoBg} alt="logo-no-bg" width={200} height={200} />
                    </div>
                    <div className={Style.logoWidth}>
                        <p>ERC20 token</p>
                        <p>ERC21 token</p>
                        <p>ERC1155 token</p>
                        <p>Contract</p>
                    </div>
                </div>
                {/* </div> */}
            </div>
        </div>
    )
}

export default Navbar