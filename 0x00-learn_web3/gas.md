# Concept of gas

* gas is a unit of computational measurement


#### gas price
* a term used on the ethereum platform
* is the price you are willing to pay [the miner] for a transaction
* converse interpretation: the price offered to a miner to verify your transaction
* unit of measurement: gwei; one gwei equals 0.000000001 or 1e-9 ETH 
* gas price is determined by an auction-type mechanism; the validators look for the highest fees attached to a transaction then process these transactions in descending order
* prices fluctuate considerably over time; they are, naturally, higher during high-activity periods and lower during periods when the network is underutilised
* most ETH wallets provide general references for gas prices with processing time comparisons for different gweis
* gas prices are directly proportional to complexity of a transaction

#### transaction fee
* payment for using the blockchain to transact
* paid when an amount of cryptocurrency is transferred from one wallet to another
* fees are flexible in nature; they vary based on how busy the blockchain is
* a user who wants to expedite a transaction can pay a higher transaction fee to do so
    * miners (people who are paid to verify transactions) will, typically, prioritise the transaction
* most transaction fees are fixed on cryptocurrency exchanges
* all transactions on the blockchain have paid gas price

    ```text
        transaction fee price = (block base fee per gas + max priority fee per gas) * gas units used
    ```

#### mining
* the process of arriving at a _solution_ to the blockchain's _problem_
* problem could be anything e.g. what five-digit nonce do I need to create a hash of length 64 chars that starts with five zeroes given the block number and data?
* node (miner) will, most likely, _brute-force_; that is, tries all possible solutions sequentially until it arrrives at the correct one
* mining requires significant computing power hence the gas price

#### eth conversion

* commonly used denominations

    |one|equals how many ether|notes|
    |:---|:---:|:---:|
    |wei|1e18|symbol WEI.  the smallest denomination of ether|
    |gwei|1e9|symbol GWEI. also referred to as nanoether or Shannon|
    |ether|1|symbol ETH. base currency|

* more info
    * [alchemy][def]
    * [investopedia][def2]
    * [eth converter][def3]

[def]: https://www.alchemy.com/gwei-calculator
[def2]: https://www.investopedia.com/terms/g/gwei-ethereum.asp
[def3]: https://eth-converter.com/extended-converter.html