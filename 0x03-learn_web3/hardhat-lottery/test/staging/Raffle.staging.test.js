const { assert, expect } = require("chai")
const { deployments, getNamedAccounts, network } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")
const { ethers } = require("ethers")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("Raffle", () => {
        let raffle, raffleEntranceFee, deployer, interval

        beforeEach(async () => {
            deployer = (await getNamedAccounts()).deployer
            raffle = ethers.getContract("Raffle", deployer)
            raffleEntranceFee = await raffle.getEntranceFee()
            interval = await raffle.getInterval()
        })

        describe("fulfillRandomWords", () => {
            it("works with live chainink keepers and VRFs; we get a random winner", async () => {
                const startingTimestamp = await raffle.getLatestTimeStamp()
                const accounts = await ethers.getSigners()

                await new Promise(async (resolve, reject) => {
                    raffle.once("WinnerPicked", async () => {
                        console.info("WinnerPicked event fired")
                        try {
                            const recentWinner = await raffle.getRecentWinner()
                            const raffleState = await  raffle.getRaffleState()
                            const winnerEndingBalance = await accounts[0].getBalance()
                            const endingTimestamp = await raffle.getLatestTimeStamp()
                            
                            await expect(raffle.getPlayer(0)).to.be.reverted
                            assert.equal(recentWinner.toString(), accounts[0].address)
                            assert.equal(raffleState.toString(), "0")
                            assert.equal(
                                winnerEndingBalance.toString(),
                                winnerStartingBalance.add(raffleEntranceFee).toString()
                            )
                            assert(endingTimestamp > startingTimestamp)
                            resolve()
                        } catch (err) {
                            console.info(err)
                            reject(err)
                        }
                    })

                    await raffle.enterRaffle({value: raffleEntranceFee})
                    const winnerStartingBalance = await accounts[0].getBalance()
                })
            })
        })



        // describe("", () => {})
        // it("", async () => {})
    })