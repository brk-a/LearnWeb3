const {ethers, network} = require("hardhat")

const mockKeepers = async () => {
    const raffle = await ethers.getContract("Raffle")
    const checkData = ethers.utils.leccak256(ethers.utils.toUtf8Bytes(""))
    const {upkeepNeeded} = raffle.callStatic.checkUpkeep(checkData)

    if(upkeepNeeded){
        const tx = await raffle.performUpkeep(checkData)
        const txReceipt = await tx.wait(1)
        const requestId = txReceipt.events[1].args.requestId
        console.info(`Performance upkeep with requestId ${requestId}`)

        if(network.config.chainId==31337){
            await mockVrf(requestId, raffle)
        }
    } else {
        console.info("No upkeep required")
    }
}

const mockVrf = async (requestId, raffle) => {
    console.info("Let's pretend to be on a local network...")
    const vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
    await vrfCoordinatorV2Mock.fulfillRandomWords(requestId, raffle.address)
    console.info("Responded...")
    const recentWinner = await raffle.getRecentWinner()
    console.info(`The winner is ${recentWinner}`)
}

mockKeepers()
    .then(() => process.exit(0))
    .catch((error) => {
        console.info(error)
        process.exit(1)
    })