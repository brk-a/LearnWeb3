const { ethers} = require("hardhat")
const {expect, assert} = require("chai")

describe("SImpleStorage", () => {
  let simpleStorageFactory, simpleStorage

  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
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