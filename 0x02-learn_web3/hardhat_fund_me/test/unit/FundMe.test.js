const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts, network } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async () => {
        let fundMe
        let deployer
        let mockV3Aggregator
        const sendValue = ethers.utils.parseEther("1") //1 eth

        beforeEach(async () => {
            deployer = (await getNamedAccounts()).deployer
            await deployments.fixture(["all"])
            fundMe = await ethers.getContract("FundMe", deployer)
            mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer)
        })

        describe("constructor", async () => {
            it("sets aggregator address correctly", async () => {
                const response = await fundMe.getPriceFeed()
                assert.equal(response, mockV3Aggregator.address)
            })
        })

        describe('fund', async () => {
            it("fails if not enough ETH", async () => {
                await expect(fundMe.fundMe()).to.be.revertedWith("Min spend amount is USD 50.00")
            })

            it("updates the amount funded data structure", async () => {
                await fundMe.fund({ value: sendValue })
                const response = await fundMe.getAddressToAmountFunded(deployer)
                assert.equal(response.toString(), sendValue.toString())
            })

            it("adds funder to array of getFunder", async () => {
                await fundMe.fund({ value: sendValue })
                const funder = await fund.getFunder(0)
                assert.equal(funder, deployer)
            })
        })

        describe("withdraw", async () => {
            beforeEach(async () => {
                await fundMe.fund({ value: sendValue })
            })

            it("withdraws ETH from a single funder", async () => {
                const startingFundMeBal = await fundMe.provider.getBalance(fundMe.address)
                const startingDeployerBal = await fundMe.provider.getBalance(deployer)

                const txnResponse = await fundMe.withdraw()
                const txnReceipt = await txnResponse.wait(1)

                const { gasUsed, effectiveGasPrice } = txnReceipt
                const gasCost = gasUsed.mul(effectiveGasPrice)

                const endingFundMeBal = fundMe.provider.getBalance(fundMe.address)
                const endingDeployerBal = fundMe.provider.getBalance(deployer)

                assert.equal(endingFundMeBal, 0)
                assert.equal(startingFundMeBal.add(startingDeployerBal).toString(), endingDeployerBal.add(gasCost).toString())
            })

            it("allows a withdraw with multiple getFunder", async () => {
                const accounts = await ethers.getSigners()
                for (let i = 1; i < accounts.length; ++i) {
                    const fundmeConnectedContract = fundMe.connect(accounts[i])
                    await fundmeConnectedContract.fund({ value: sendValue })
                }

                const startingFundMeBal = await fundMe.provider.getBalance(fundMe.address)
                const startingDeployerBal = await fundMe.provider.getBalance(deployer)

                const txnResponse = await fundMe.withdraw()
                const txnReceipt = await txnResponse.wait(1)

                const { gasUsed, effectiveGasPrice } = txnReceipt
                const gasCost = gasUsed.mul(effectiveGasPrice)

                const endingFundMeBal = fundMe.provider.getBalance(fundMe.address)
                const endingDeployerBal = fundMe.provider.getBalance(deployer)

                assert.equal(endingFundMeBal, 0)
                assert.equal(startingFundMeBal.add(startingDeployerBal).toString(), endingDeployerBal.add(gasCost).toString())
                await expect(fundMe.getFunder(0)).to.be.reverted
                for (let i = 0; i < accounts.length; ++i) {
                    assert.equal(await fundMe.getAddressToAmountFunded(accounts[i]).address, 0)
                }
            })

            it("only allows the owner to withdraw", async () => {
                const accounts = await ethers.getSigners()
                const attacker = accounts(1)
                const attackerConnectedContract = fundMe.connect(attacker)

                await expect(attackerConnectedContract.withdraw()).to.be.revertedWith("FundMe__NotOwner")
            })

            it("allows a withdraw with multiple getFunder using cheaperWithdraw", async () => {
                const accounts = await ethers.getSigners()
                for (let i = 1; i < accounts.length; ++i) {
                    const fundmeConnectedContract = fundMe.connect(accounts[i])
                    await fundmeConnectedContract.fund({ value: sendValue })
                }

                const startingFundMeBal = await fundMe.provider.getBalance(fundMe.address)
                const startingDeployerBal = await fundMe.provider.getBalance(deployer)

                const txnResponse = await fundMe.cheaperWithdraw()
                const txnReceipt = await txnResponse.wait(1)

                const { gasUsed, effectiveGasPrice } = txnReceipt
                const gasCost = gasUsed.mul(effectiveGasPrice)

                const endingFundMeBal = fundMe.provider.getBalance(fundMe.address)
                const endingDeployerBal = fundMe.provider.getBalance(deployer)

                assert.equal(endingFundMeBal, 0)
                assert.equal(startingFundMeBal.add(startingDeployerBal).toString(), endingDeployerBal.add(gasCost).toString())
                await expect(fundMe.getFunder(0)).to.be.reverted
                for (let i = 0; i < accounts.length; ++i) {
                    assert.equal(await fundMe.getAddressToAmountFunded(accounts[i]).address, 0)
                }
            })

            // it("", async () => { })

        })

    })