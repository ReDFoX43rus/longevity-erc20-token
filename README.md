# LONGEVITY TEST TASK

Hi
Here is our test task to proceed the interview 

Task Description: Smart Contract for Crypto Reward in a healthcare App

You are tasked with developing a smart contract to implement a crypto reward system in a healthcare app. 
The contract should allow healthcare providers to reward patients with tokens for their engagement, adherence to treatment plans, or other desired behaviors. 
The contract should include the following functionalities:

1. Initialization: The contract should be deployed with the following parameters:
   - Token name: "LongevityToken"
   - Token symbol: "LONG"
   - Healthcare provider address: The address of the healthcare provider deploying the contract

2. Reward Amount Setting:
   - The healthcare provider should be able to set the reward amount, denoted in the smallest divisible unit of the token (e.g., wei, satoshis, etc.).

3. Reward Granting:
   - The healthcare provider should be able to grant rewards to patients by providing the patient's Ethereum address as a parameter.
   - When rewards are granted, the specified amount should be added to the patient's reward balance.

4. Reward Claiming:
   - Patients should be able to claim their earned rewards.
   - When rewards are claimed, the corresponding amount should be transferred from the patient's reward balance to their wallet address.

5. Security Considerations:
   - Ensure appropriate access control to restrict certain functions to only the healthcare provider.
   - Implement necessary security measures to prevent unauthorized access or manipulation of the contract.

Please provide the following deliverables:

 1. Implement the smart contract in Solidity.
 2. Include comments to explain the purpose and functionality of each function.
 3. Provide a brief documentation describing the smart contract and its usage.
 4. Explain the key functionalities and any additional considerations made during development.