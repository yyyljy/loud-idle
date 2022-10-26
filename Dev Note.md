# DEV NOTE

## How to ...

### Q1. How to verify logged in user has our NFT

#### IDEA

1. Etherscan API
   - 5 request per seconds for free tier
   - [Get Address ERC721 Token Holding](https://docs.etherscan.io/api-endpoints/tokens#get-address-erc721-token-holding)
     - only for pro tier
   - [Get Address ERC721 Token Inventory By Contract Address](https://docs.etherscan.io/api-endpoints/tokens#get-address-erc721-token-inventory-by-contract-address)
     - only for pro tier

2.  Etherscan Crawling
   1. `wallet address` == `our NFT contract address`  > `holder wallet address`
      - 1 : N
   2. `wallet address` > `holding NFTs contract addresses` == `our NFTs contract addresses`
      - N : N



### Study

1. Transaction

