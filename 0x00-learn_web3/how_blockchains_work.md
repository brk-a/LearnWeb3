 # how blockchains work

 source material: [Anders Brownworth][def]

 #### hash
 * hash is a unique string of fixed length whose purpose is to identify data
 * definition 2:  an identifying value that is used to verify the data integrity of messages transmitted over a computer network
 * created when data is placed into a _hash function_
 * hash function is any function that can be used to map data of arbitrary size to fixed-size values
 * said values, returned by a hash function, are called hash values, hash codes, digests, or, simply, _hashes_
 * the values are used to index a fixed-size table called a _hash table_
 * use of a hash function to index a hash table is called _hashing_ or scatter storage addressing
 * ETH, as of Thursday, 21 Sep, 2023, 0222h EAT, uses [Keccak256][def2]

 #### block
 * a block is a data structure in the blockchain database where records of transactions are stored permanently
 * _for-dummies_:  the constituent element of a blockchain; it is an individual unit in which data is stored
 * three sections: block, nonce, data
    * block number -> "serial number" of block (think autoincrement id in relational DBs)
    * nonce -> abbreviation for _number used only once_ or _number once_ (clearly made up by Americans). a \[pseudo\] random number used to generate a hash value. nonce is generated in those blockchains that support a [_proof-of-work_][def3] consensus system (more info [here][def4])
    * data -> actual data to send, hash of previous block, difficulty target, _created at_ timestamp, list of transactions recorded, number of transactions, size etc
* all sections are aggregated and sent through a hash function
* genesis block -> first block in a blockchain

#### blockchain
* a chain of blocks arranged in sequential order
* for-dummies_: name comes from the fact that a blockchain stores data in _blocks_  that are linked or _chained_. new data are filed in blocks; said blocks are, subsequently, linked in chronological order so that a blockchain becomes longer and longer as more information is added
* each subsequent block in the chain points to the one before it (think linked ists)

#### decentralised
* each peer (member/co-owner/node of the blockchain) has an up-to-date copy of the blockchain
* look at the hash of the latest block of all nodes to verify the correctness and accuracy of data
    * say we have three peers: A, B and C
    * say they are all synced
    * now, say, A changes the data of a block and goes through the mining process
    * hash of latest block of A is not the same as that of B and C
    * B and C can ask A to remove additional data or can kick A out of the blockchain
* majority rules; this has the unintended consequence called the [51% attack][def5]

#### tokens
* tradable virtual goods defined in smart contracts on a blockchain
* [examples](https://coinmarketcap.com/view/web3/)
* 

#### public and private key(s)
* private key cryptography, aka symmetric cryptography, employs a _private key_ for encryption and decryption
* private key  is a lengthy, almost-non-guessable sequence of bits created randomly or pseudo-randomly
* complexity and length of a private key define how easy it is for an attacker to carry out a brute force attack
* key is shared between the sender and receiver of the encrypted sensitive information
* public-key cryptography, aka symmetric cryptography, is a type of encryption that employs a pair of keys
    * public key (which may be known to others)
    * private key (which is not be known to anyone except the owner)
    * private key should be kept secret
    * public key can be freely circulated without jeopardising security
* anyone can encrypt a message using the intended receiver's public key, however, only the receiver's private key can decode the message
* 

||private key|public key|
|:---|:---:|:---:|
|algo|used for both encrypting and decrypting the sensitive data. shared between the sender and receiver of encrypted data|used only for the purpose of encrypting the data|
|performance|private key mechanism is faster than the public key one|public key mechanism is slower than the private key one|
|secrecy|kept secret; not to be shown to anyone apart from the sender and the receiver|free to use and the private key is kept secret |
|type|mechanism is called _symmetric_ because a single key is shared between two parties|mechanism is called _asymmetric_ because there are two keys for different purposes|
|sharing|shared between two parties|anyone can use the public key; the private key is to be shared between two parties only|
|targets|performance testing checks the reliability, scalability and speed of the system|load testing checks the sustainability of the system|

[def]: https://andersbrownworth.com/blockchain/
[def2]: https://keccak.team/keccak.html
[def3]: https://coinmarketcap.com/community/articles/41719/
[def4]: https://www.nasdaq.com/articles/proof-of-stake-vs.-proof-of-work%3A-understanding-the-differences
[def5]: https://ethereum.org/en/glossary/