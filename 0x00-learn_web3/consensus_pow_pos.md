# Consensus and consenus mechanisms

#### consensus
* a consensus mechanism is the means by which nodes reach agreement within a particular blockchain specifically on the validity of transactions
* in a centralised system, it is easy to arrive at a consensus because the authority that validates truth is based in one local (central) source. in a decentralised system, this process is much more difficult because there are multiple sources contributing to the validation of truth
* two ways to achieve consensus: sybil resistance and 
    * sybil resistance -> achieved through the use of some kind of tangible, finite resource. by requiring participants to incur some kind of cost, you prevent them from creating enough _Sybils_ to take over the network
    * chain selection -> achieved through the use of PoW and _longest-chain-rule_ to determine which chain is the _true_ chain
* [Nakamoto consensus][def8]

#### proof-of-Work (PoW)
* a piece of data which is difficult (costly & time-consuming) to produce yet easy for others to verify
* requires powerful computers or specialised hardware to confirm a block of transactions by solving complex mathematical puzzles in exchange for newly mined cryptocurrency, data etc plus transaction fees; however, only the first machine to correctly solve the puzzle receives the reward
* has been reliable at maintaining consensus through economic incentives, however, the energy consumption required to confirm transactions is increasing at an unsustainable rate
* blockchain developers, as a result, are beginning to use different consensus mechanisms such as proof of stake
* vulnerable to the [51% attack][def]

#### proof-of-Stake (PoS)
* relies on users to provide an economic stake in the network
* said stake is, effectively, a deposit made by users who wish to validate transactions and become eligible to collect transaction fees 
* in order to protect their stake, users must only validate the transactions confirmed by the  majority
* prevents cartel-based conduct and other centralising behaviors
* vulnerable to the following:
    * [Nothing-at-Stake][def9] ->  the fact that the PoS miners best strategy is to “mine” on all forks  because blocks are very cheap to “mine”. in the case of one fork “failure”, the validator has nothing to lose; consensus algorithm doesn’t work as intended
    * [Long-range Attack][def10] -> in a naively implemented PoS, suppose that there is an attacker with 1% of all coins at or shortly after the genesis block. that attacker starts their own chain and mines it. although the attacker will find themselves selected for producing a block only 1% of the time, they can easily produce 100 times as many blocks and, simply, create a longer blockchain in that way

#### byzantine fault tolerance (BFT)
* BFT algorithms manage relationships between blockchain nodes; makes the network resilient to the [Byzantine Generals Problem][def7]
* nodes are not predetermined and they join the network at will

#### practical byzantine fault tolerant (PBFT)
* said systems have a predefined set of validators that are, usually, chosen by the protocol developers. these systems achieve a lower latency and higher file storing capabilities than the traditional BFT systems

#### federated byzantine agreement (FBA)
* have no predefined set of validators. nodes openly choose who they trust.
* these trusted nodes create what are called _quorum slices_. said slices are tallied to form the _quorum network_ or the agreed upon truth of the state. slices are later put together to form the quorum network

#### directed acyclic graph (DAG)
* a consensus mechanism that isn’t used by traditional blockchains
* DAGs are used by distributed systems such as IOTA and Byteball; transactions are validated by _paying-it-forward_
* in order to send a transaction, users must validate two transactions
* this can allow faster transaction speed when the network is under increased load
* contrary to the traditional blockchain architecture where blocks are mined and filled in a linear fashion, transactions take place and can be connected in different ways
* downside of using a DAG is the low threshold for malicious activity; takes only 33% to overtake a DAG’s network of vs 51% for PoW

#### distributed hash table (DHT)
* is a distributed system with a lookup service that uses key-value pairs
* said pairs are stored in the DHT and any participating node can retrieve the data associated with the key
* maintenance and mapping of the keys are distributed amongst the nodes
* example: Holochain. Holochain is an agent-centric model, thatis, a git-like mechanism where every node has its own version of the data (truth)
* everything can be verified historically (most blockchains are data centric: everybody downloads a copy of the ledger, e.g. bitcoin)
* based on version control, every node owns a local store of the data that it can reference to a previous commit in its private space
* outside nodes don’t know what is going on within external nodes’ private space
* to establish an external communication line and data redundancy, Holochain uses its DHT
* Holochain has distributed validation rules (called DNA) that are determined, not by the protocol, but by application developers
* how does this work without consensus?
    * eaa...sy! an immune system. Holochain's _immune system_ is a gossip-like system that exists between applications built on top of Holochain
    * applications determine, independently, which nodes they trust and distrust based on their own consensus rules and broadcast this out to other applications in the network
    * it is up to each individual application to determine which consensus rules they want to abide by
    * determining consensus rules at the application layer is risky; said rules need to be well defined and if not properly executed can open up other applications to vulnerabilities

#### proof of location (PoL)
* a new protocol  that enables location verification. instead of node operators receiving payouts for verifying transactions like in PoW, PoL payouts are location based;  that is, participants are required to visit each site in a predefined order
* PoL helps prevent fake location reports (that can be easily spoofed with fake GPS apps) by using location and time stamps

#### proof of activity (PoA)
* is a hybrid between PoW and PoS
* certain blockchains that operate under the PoW consensus mechanism have deflationary currency supplies.
* question:  what will happen when these protocols reach their currency distribution limits and miners are no longer receiving the block rewards? 
    * the concern is a potential _tragedy of the commons_; individuals begin acting in self interest
* PoA requires miners to use PoW to generate the header of a block. once the header is generated, the system switches to PoS until the block is completely formed
* fees are split between those who contributed to the formation of the block
* PoA attempts to combine the best of both worlds, however, detractors point out excessive energy consumption (PoW) and the potential double signing transactions (PoS)

#### more info
* more info on vulns
    * [goldmint][def2]
    * [goldmint buy/sell gold][def3]
* more info on consensus
    * [cloudflare][def4]
    * [ethereum][def5]
    * [certik][def6]


[def]: https://ethereum.org/en/glossary/
[def2]: https://blog.goldmint.io/goldmint-blockchain-why-custom-85e339756253
[def3]: https://app.goldmint.io/#/buy-sell-gold
[def4]: https://blog.cloudflare.com/next-gen-web3-network/
[def5]: https://ethereum.org/en/developers/docs/consensus-mechanisms/
[def6]: https://www.certik.com/resources/blog/ProofofWorkvsProofofStake
[def7]: https://www.cs.cornell.edu/courses/cs6410/2018fa/slides/18-distributed-systems-byzantine-agreement.pdf
[def8]: https://blockonomi.com/nakamoto-consensus/
[def9]: https://fourweekmba.com/nothing-at-stake-problem/
[def10]: https://messari.io/report/long-range-attack