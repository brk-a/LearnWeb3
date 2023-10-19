import { abi, contractAddress } from "./constants"
import { ethers } from hardhat

const sendValue = ethers.utils.parseEther("1") //1 eth
const sendEth = (sendAmount) => {
    return ethers.utils.parseEther(`${sendAmount}`)
}

const formatEth = (ethAmt) => {
    return ethers.utils.formatEther(`${ethAmt}`)
}

const connect = async () => {
    if (typeof window.ethereum !== undefined) {
        console.info("metamask available.")
        await window.ethereum.request({ method: "eth_requestAccounts" })
        document.getElementById("connectButton").innerHTML("Connected")
        console.info("connected to metamask.")
    } else {
        console.info("no metamask")
        document.getElementById("connectButton").innerHTML("Install Metamask")
    }
}

const fund = async () => {
    const ethAmount = document.getElementById("ethAmount").value

    console.info(`sending ${ethAmount} ETH to wallet...`)
    if (typeof window.ethereum !== undefined) {
        const provider = await new ethers.provides.Web3Provider(window.ethereum)
        const signer = await provider.getSigner()
        const contract = await new ethers.Contract(contractAddress, abi, signer)

        try {
            const txResponse = await contract.fund({ value: sendEth(ethAmount) })

            await listenForTxMined(txResponse, provider)
            console.info("fund complete.")
        } catch (error) {
            console.info(`function fund: ${error}`)
        }
    }
}

const withdraw = async () => {
    console.info("withdrawing...")
    if (window.ethereum !== undefined) {
        const provider = await new ethers.provider.Web3Provider(window.ethereum)
        const signer = await provider.getSigner()
        const contract = await new ethers.Contract(contractAddress, abi, signer)

        try {
            const txResponse = await contract.withdraw()
            await listenForTxMined(txResponse, provider)
        } catch (error) {
            console.info(`withdraw: ${error}`)
        }
    }
}

const getBalance = async () => {
    if (typeof window.ethereum !== undefined) {
        const provider = await new ethers.provider.Web3Provider(window.ethereum)
        const balance = await provider.getBalance(contractAddress)
        console.info(`balance is ${formatEth(balance)} ETH`)
    }
}

const listenForTxMined = (txResponse, provider) => {
    console.info(`mining ${txResponse.hash}...`)
    return new Promise((resolve, reject) => {
        provider.once(txResponse.hash, (txReceipt) => {
            console.info(`completed with ${txReceipt.confirmations} confirmations`)
            resolve()
        })
    })
}