// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LongevityToken is ERC20, ERC20Burnable, Ownable {

    uint rewardAmount;

    /**
     * Creates LongevityToken's ERC20 contract with 
     * name = LongevityToken
     * symbol = LONG
     * initial total supply = 0
     * 
     * Considers the deployer of the contract to be a healthcare provider
     * Considers the same decimals as etherium has (18)
     * 
     * @param _defaultRewardAmount default reward amount in wei
     */
    constructor(
        uint _defaultRewardAmount
    ) ERC20("LongevityToken", "LONG") {
        rewardAmount = _defaultRewardAmount;
    }

    /**
     * Creates `amount` tokens and assigns them to `account`, increasing
     * the total supply.
     * 
     * Can be called only by owner (a.k.a healthcare provider)
     * 
     * @param to mint destination address
     * @param amount number of tokens in wei
     */
    function mint(address to, uint256 amount) external onlyOwner {
       _mint(to, amount);
    }

    /**
     * Returns current reward amount
     */
    function getRewardAmount() external view onlyOwner returns(uint) {
        return rewardAmount;
    }

    /**
     * Updates reward amount to `_rewardAmount`
     * 
     * Can be called only by owner (a.k.a healthcare provider)
     * 
     * @param _rewardAmount a new reward amount in wei
     */
    function setRewardAmount(uint _rewardAmount) external onlyOwner {
        rewardAmount = _rewardAmount;
    }

    /**
     * Grants a reward to a patient with addr `_addr`
     * 
     * Transfers `rewardAmount` of tokens immediately to the patient's address
     * 
     * Can be called only by owner (a.k.a healthcare provider)
     * 
     * @param _addr patient's address
     */
    function grantReward(address _addr) external onlyOwner {
        transfer(_addr, rewardAmount);
    }
}
