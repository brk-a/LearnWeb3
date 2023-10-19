const {assert, expect} = require("chai")
const { deployments, getNamedAccounts, network } = require("hardhat")
const {developmentChains, networkConfig} = require("../../helper-hardhat-config")
const { ethers } = require("ethers")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Raffle", () => {
        let raffle, vrfCoordinatorV2Mock, raffleEntranceFee, deployer, interval
        const chainId = network.config.chainId

        beforeEach(async () => {
            deployer = (await getNamedAccounts()).deployer
            await deployments.fixture(["all"])
            raffle = ethers.getContract("Raffle", deployer)
            vrfCoordinatorV2Mock = ethers.getContract("VRFCoordinatorV2Mock", deployer)
            raffleEntranceFee = await raffle.getEntranceFee()
            interval = await raffle.getInterval()
        })

        describe("constructor", () => {
            it("initialies the raffle correctly", async () => {
                const raffleState = await raffle.getRaffleState()

                assert.equal("0", raffleState.toString())
                assert.equal(networkConfig[chainId]["interval"], interval.toString())
            })
        })

        describe("enterRaffle", () => {
            it("reverts when you do not pay enough", async () => {
                await expect(raffle.enterRaffle()).to.be.revertedWith("Raffle__NotEnoughEthEntered")
            })

            it("records players when they enter", async () => {
                await raffle.enterRaffle({value: raffleEntranceFee})
                const playerFromContract = await raffle.getPlayer(0)
                assert.equal(deployer, playerFromContract)
            })

            it("emits event on enter", async () => {
                await expect(raffle.enterRaffle({value: raffleEntranceFee})).to.emit(raffle, "RaffleEnter")
            })

            it("fails to allow entry when raffle is calculating", async () => {
                await raffle.enterRaffle({value: raffleEntranceFee})
                await network.provider.send("evm_increaseTime", [interval.toNumber()+1])
                await network.provider.send("evm_mine", [])

                raffle.performUpkeep([])
                await expect(raffle.enterRaffle({value: raffleEntranceFee})).to.be.revertedWith("Raffle__NotOpen")
            })
        })

        describe("checkUpkeep", () => {
            it("returns false when ETH is not sent by anyone in raffle", async () => {
                await network.provider.send("evm_increaseTime", [interval.toNumber()+1])
                await network.provider.send("evm_mine", [])
                const {upkeepNeeded} = await raffle.callStatic.checkUpkeep([])

                assert(!upkeepNeeded)
            })

            it("returns false if raffle is closed/calculating", async () => {
                await raffle.enterRaffle({value: raffleEntranceFee})
                await network.provider.send("evm_increaseTime", [interval.toNumber()+1])
                await network.provider.send("evm_mine", [])
                await raffle.performUpkeep("0x") //"0x" is a blank bytes object. alt: []
                const raffleState = await raffle.getRaffleState()
                const {upkeepNeeded} = await raffle.callStatic.checkUpkeep()

                assert.equal("1", raffleState.toString())
                assert(!upkeepNeeded) //alt: assert.equal(false, upkeepNeeded)
            })

            it("returns false if enough time has not passed", async () => {
                await raffle.enterRaffle({value: raffleEntranceFee})
                await network.provider.send("evm_increaseTime", [interval.toNumber()-1])
                await network.provider.send({method: "evm_mine", params: []})
                const {upkeepNeeded} = await raffle.callStatic.checkUpkeep("0x")

                assert(!upkeepNeeded)
            })

            it("retuens true if enough time has passed, has players, has eth and is open", async () => {
                await raffle.enterRaffle({value: raffleEntranceFee})
                await network.provider.send("evm_increaseTime", [interval.toNumber()+1])
                await network.provider.send({method: "evm_mine", params: []})
                const {upkeepNeeded} = await raffle.callStatic.checkUpkeep("0x")

                assert(upkeepNeeded)
            })
            
        })

        describe("performUpkeep", () => {
            it("runs IFF checkUpkeep === true", async () => {
                await raffle.enterRaffle({value: raffleEntranceFee})
                await network.provider.send("evm_increaseTime", [interval.toNumber()+1])
                await network.provider.send("evm_mine", [])
                const txResponse = await raffle.performUpkeep("0x")

                assert(txResponse)
            })

            it("reverts when checkUpkeep is false", async () => {
                await expect(raffle.performUpkeep("0x")).to.be.revertedWith("Raffle__UpkeepNotNeeded")
            })

            it("updates the state of the raffle, emits an event and calls vrf co-ord", async () => {
                await raffle.enterRaffle({value: raffleEntranceFee})
                await network.provider.send("evm_increaseTime", [interval.toNumber()+1])
                await network.provider.send("evm_mine", [])
                const txResponse = await raffle.performUpkeep("0x")
                const txReceipt = await txResponse.wait(1)
                const requestId = txReceipt.events[1].args.requestId
                //alt: const requestId = txReceipt.events[0].args.requestId
                const raffleState = await raffle.getRaffleState()

                assert(requestId.toNumber()>0)
                assert(raffleState.toString()=="1")
            })
        })

        describe("fulfillRandomWords", () => {
            beforeEach(async () => {
                await raffle.enterRaffle({value: raffleEntranceFee})
                await network.provider.send("evm_increaseTime", [interval.toNumber()+1])
                await network.provider.send({method: "evm_mine", params: []})
            })

            it("will only be called after performUpkeep", async () => {
                await expect(vrfCoordinatorV2Mock.fulfillRandomWords(0, raffle.address)).to.be.revertedWith("nonexistent request")
                await expect(vrfCoordinatorV2Mock.fulfillRandomWords(1, raffle.address)).to.be.revertedWith("nonexistent request")
            })

            it("picks a winner, resets the lottery and sends money", async () => {
                const moreEntrants = 3
                const startingAccountIndex = 1 //because deployer = 0
                const accounts = ethers.getSigners()
                for(i=startingAccountIndex; i<startingAccountIndex+moreEntrants; ++i){
                    const accountConnectedRaffle = raffle.connect(accounts[i])
                    await accountConnectedRaffle.enterRaffle({value: raffleEntranceFee})
                }

                const startingTimestamp = await raffle.getLatestTimeStamp()
                const recentWinner = await raffle.getRecentWinner()
                const indexOfWinner = await raffle.getIndexOfPlayer(recentWinner)
                const winnerStartingBalance = typeof(indexOfWinner) == 'number' ? accounts[indexOfWinner] : undefined

                await new Promise(async (resolve, reject) => {
                    raffle.once("WinnerPicked", async () => {
                        console.info("found event")
                        try {
                            console.info(`recent winner: ${recentWinner}`)
                            console.info("participants ... ")
                            for(i=0; i<startingAccountIndex+moreEntrants; ++i){
                                console.info(accounts[i].address)
                            }
                            const raffleState = await raffle.getRaffleState()
                            const endingTimestamp = await raffle.getLatestTimeStamp()
                            const numberOfPlayers = raffle.getNumberOfPlayers()

                            assert.equal("0", numberOfPlayers.toString())
                            assert.equal("0", raffleState.toString())
                            assert(endingTimestamp > startingTimestamp)
                            assert.equal(
                                winnerEndingBalance,
                                winnerStartingBalance.add(
                                    raffleEntranceFee
                                        .mul(moreEntrants)
                                        .add(raffleEntranceFee)
                                        .toString()
                                )
                            )
                        } catch (err) {
                            reject(err)
                        }
                        resolve()
                    })

                    const txResponse = await raffle.performUpkeep("0x")
                    const txReceipt = await txResponse.wait(1)
                    const winnerEndingBalance = await  accounts[indexOfWinner].getBalance()
                    await vrfCoordinatorV2Mock.fulfillRandomWords(txReceipt.events[1].args.requestId, raffle.address)

                })
            })
        })


        // describe("", () => {})
        // it("", async () => {})
    })