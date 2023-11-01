const { ethers, getNamedAccounts } = require("hardhat")
const { getWeth, AMOUNT } = require("./getWeth")


const main = async () => {
    await getWeth()
    const {deployer} = await getNamedAccounts()
    const lendingPool = await getLendingPool()
    console.info(`lendingPool address is ${lendingPool}`)

    const wethTokenAddress = "0xE90E3C55c5cE9FC3D7a96733F421852158Af7808"
    await approveErc20(
        wethTokenAddress,
        lendingPool.address,
        AMOUNT,
        deployer
    )

    console.info("depositing...")
    await lendingPool.deposit(
        wethTokenAddress,
        AMOUNT,
        deployer,
        0
    )
    console.info("deposited")
}

const getLendingPool = async (account) => {
    const lendingPoolAddressProvider = await ethers.getContractAt(
        "ILendingPoolAddressesProvider",
        "0x24a42fD28C976A61Df5D00D0599C34c4f90748c8",
        account
    )
    const lendingPoolAddress = await lendingPoolAddressProvider.getLendingPool()
    const lendingPool = await ethers.getContractAt(
        "ILendingPool",
        lendingPoolAddress,
        account
    )

    return lendingPool
}

const approveErc20 = async (erc20Address, spenderAddress, amountToSpend, account) => {
    const erc20Token = await ethers.getContractAt(
        "IERC20",
        erc20Address,
        account
    )
    const tx = await erc20Token.approve(spenderAddress, amountToSpend)
    await tx.wait(1)
    console.info("approveErc20: Approved")
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.info(error)
        process.exit(1)
    })