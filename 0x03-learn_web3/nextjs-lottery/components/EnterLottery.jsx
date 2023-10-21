import { useWeb3Contract, useMoralis } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"

const EnterLottery = () => {
    const [entranceFee, setEntranceFee] = useState("0")
    const [numPlayers, setNumPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")
    const dispatch = useNotification()

    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const contractAddress = chainIdHex in contractAddresses
        ? contractAddresses[chainId][0]
        : null

    const { runContractFunction: enterRaffle, isFetching, isLoading } = useWeb3Contract({
        abi,
        contractAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi,
        contractAddress,
        functionName: "getEntranceFee",
        params: {},
        // msgValue: "", //not required; this is partly why it is used here
    })

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi,
        contractAddress,
        functionName: "getNumberOfPlayers",
        params: {},
        // msgValue: entranceFee,
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi,
        contractAddress,
        functionName: "getRecentWinner",
        // msgValue: entranceFee,
    })

    const updateUI = async () => {
        const entranceFeeFromCall = (await getEntranceFee()).toString()
        const numPlayersFromCall = (await getNumberOfPlayers()).toString()
        const recentWinnerFromCall = (await getRecentWinner()).toString()

        setEntranceFee(entranceFeeFromCall)
        setNumPlayers(numPlayersFromCall)
        setRecentWinner(recentWinnerFromCall)
    }

    const handleEnterRaffle = async () => {
        await enterRaffle({
            onSuccess: { handleSuccess },
            onError: err => console.info(err)
        })
    }

    const handleSuccess = async (tx) => {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction complete",
            title: "Tx Notification",
            position: "topR",
            icon: "bell",
        })
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    return (
        <div className="p-5">
            {raffleAddress ? (
                <>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={handleEnterRaffle}
                        disabled={isLoading || isFetching}
                    >
                        {isFetching || isLoading ? (
                            <div className="animated-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            <div className="text-white font-semibold">
                                Enter raffle
                            </div>
                        )}
                    </button>
                    <div>
                        Entrance fee is {ethers.utils.formatUnits(entranceFee, "ether")} ETH
                    </div>
                    <div>Players: {numPlayers}</div>
                    <div>Recent winner: {recentWinner}</div>
                </>
            ) : (
                <>
                    <h1>Raffle address not detected</h1>
                </>
            )}
        </div>
    )
}

export default EnterLottery