## TOKEN DESCRIPTION

**Longevity (LONG)** token – [ERC20](https://ethereum.org/ru/developers/docs/standards/tokens/erc-20/) token with some extended features

**Owner** – a person who can invoke special functions.
By default it is a person who deployed a contract.
Ownership can be transferred by Owner via `transferOwnership(address newOwner)` function

**Healthcare provider** – same as Owner

**Reward amount** – number of LONG tokens what the Owner can transfer to a destination address. The default reward amount is set by contract deployment.

## Features

#### Constructor

Constructor has only 1 paramter

`uint _defaultRewardAmount` – initial reward amount

The Owner address is set to the deployer address

#### Mint | `mint(address to, uint256 amount)`

The Owner (a.k.a Healthcare provider) can mint additional LONG tokens to a destination address

It can be done by calling `mint(address to, uint256 amount)` function

#### Set reward amount | `setRewardAmount(uint _rewardAmount)`

The Owner (a.k.a Healthcare provider) can set the reward amount

It can be done by calling `setRewardAmount(uint _rewardAmount)` function

#### Get reward amount | `getRewardAmount() returns(uint)`

The Owner (a.k.a Healthcare provider) can read the current reward amount

It can be done by calloing  `getRewardAmount() returns(uint)` function

#### Grant reward | `grantReward(address _addr)`

The Owner (a.k.a Healthcare provider) can grant reward to a destincation address

It can by done by calling `grantReward(address _addr)`

The Owner MUST have sufficient tokens on his/her account.
If Owner has insufficient tokens `grantReward` reverts with an exception.

Reward amount of tokens transfers *immediately* to the destination address

