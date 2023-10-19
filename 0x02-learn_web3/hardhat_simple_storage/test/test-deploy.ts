import {ethers} from "hardhat"
import {expect, assert} from "chai"
import { BaseContract, ContractFactory } from "ethers"
// import {SimpleStorage, SimpleStorage__factory} from "../typechain-types" //use these in prod

describe("SImpleStorage", () => {
  let simpleStorageFactory: ContractFactory, simpleStorage: BaseContract
//   let simpleStorageFactory: SimpleStorage__factory, simpleStorage: SimpleStorage

  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    // simpleStorageFactory = (await ethers.getContractFactory("SimpleStorage")) as SimpleStorage__factory
    simpleStorage = await simpleStorageFactory.deploy()
  })

  it("should start w. a guess of zero", async () => {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = "0"
    assert.equal(currentValue.toString(), expectedValue)
    // expect(currentValue.toString()).to.equal(expectedValue) //same as `assert.equal()` above
  })

  it("should update when store() is called", async () => {
    const expectedValue = "144"
    const txResponse = await simpleStorage.store(expectedValue)
    await txResponse.wait(1)
    const currentValue = await simpleStorage.retrieve()
    assert.equal(expectedValue, currentValue.toString())
  })
})