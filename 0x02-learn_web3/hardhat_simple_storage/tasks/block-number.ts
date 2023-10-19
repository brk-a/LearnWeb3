import {task} from "hardhat/config"

export default task("block-number", "Prints the current block number")
    .setAction(
        async (taskArgs, hre) => {
            const blockNumber = await hre.ethers.provider.getBlockNumber()
            console.info(`current block number ${blockNumber}`)
        }
    )

