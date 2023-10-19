# Blockchain, Smart contracts

#### blockchain
* a blockchain is a distributed ledger (a chain of blocks)
* it has growing lists of records that are securely linked together via cryptographic hashes
* each block contains a cryptographic hash of the previous block, a timestamp, and transaction data
* since each block contains information about the previous block, they effectively form a chain; each additional block links to the ones before it
* blocks are data structures within the blockchain database
* a block records some or all of the most recent transactions not yet validated by the network. once the data are validated, the block is closed. a new block is created for new transactions to be entered into and validated
    * a block is, thus, a permanent store of records that, once written, cannot be altered or removed
* distributed ledger technology (DLT) is the technological infrastructure and protocols that allow simultaneous access, validation and record updating across a networked database
* DLT is the technology blockchains are created from; the infrastructure allows users to view any changes, who made them, reduces the need to audit data, ensures data is reliable and only provides access to those that need it
* distributed ledgers are maintained by a network of nodes, each of which has a copy of the ledger, validates the information, and helps reach a consensus about its accuracy
    * many nodes run the blockchain
* blockchain node refers to a device-stakeholder pair that participates in the running of the protocol software of a decentralised network
    * a node is, simply, a device running the software of a specific blockchain
* in lieu of a central entity, nodes work together to form the governing infrastructure of a blockchain. their primary function is to maintain consensus of a public ledger accomplished by transaction validation and monitoring live activity to ensure a system’s security
* private vs public blockchain
    * private (permissioned) blockchain is controlled by a single organisation; it permits only verified members to join its network. said members may receive varying levels of access to the blockchain e.g. a company's internal accounting or messaging system
    * public (permissionless) blockchain is decentralised, has no organisation or individual in control of it and its users can remain anonymous e.g. cryptocurrency or NFTS

#### smart contract platform
    ```text
        information coming soon
    
    ```

#### smart contract
* a smart contract is, simply that: a contract that is smart; that is, an agreement between two parties (contract) that is on a digital platform and does not require a third party (smart) 
* a smart contract is a set of instructions executed in a decentralised manner. there is no need of a central, "neutral" third party (say, a bank, central bank, broker, agent etc)
* the purpose of a smart contract is to remove centralised forces and [counterparty risk][def]
    * idea is to make paper (brand-based) guarantees  obsolete and use cryptographic (maths-based) ones instead
    * paper guarantees
        * counterparty risk is high
        * contracts are opaque by default and design
        * interest (RoI) yields are low and going lower
    * cryptographic guarantees
        * counterparty risk is low
        * contracts are transparent by default and design
        * interest (RoI) yields are consistently high 
* other terms used to refer to smart contracts
    * Dapp (decentralised app)
    * decentralised platform
* smart contacts are immutable, decentralised and transparent
    * immutable -> cannot be altered
    * decentralised -> executes automatically (no intermediaries or market-makers needed)
    * transparent -> everyone on the chain sees the terms of the agreement
* 

#### blockchain oracle
* a blockchain oracle is any device that interacts with the off-chain (aka real) world to provide external data or computation to smart contracts
* allows smart contracts to execute based upon inputs and outputs from the real world
* it is a specialised entity or system that acts as an intermediary between blockchain networks and external data sources or systems
* an oracle facilitates integration of on-chain smart contracts with off-chain data and real-world events

#### decentralised oracle network(s) (DONs)
* DONs are infrastructure or frameworks designed to provide decentralised and trustless oracle services within blockchain ecosystems
* DONs offer a distributed approach to retrieving, verifying and delivering external data to smart contracts on the blockchain

#### hybrid smart contract
* aggregation of a decentralised smart contract network and decentralised blockchain oracle network
* 

#### chainlink
* a decentralised oracle network

#### web 1, 2 and 3
* web 1-> permissionless, open-sourced web with static content
* web 2 -> permissioned web with dynamic content. centralised entities run your agreements on their servers
* web 3 -> permissionless web with dynamic content. there are decentralised, censorship-resistant networks run your agreement and code. generally accopmanied by the idea of user-owned ecosystems; you own part of the protocols you interact with rather than being the product

[def]: https://www.investopedia.com/terms/c/counterpartyrisk.asp