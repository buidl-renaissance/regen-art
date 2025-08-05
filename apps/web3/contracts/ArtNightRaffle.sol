// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import "@chainlink/contracts/src/v0.8/vrf/dev/interfaces/IVRFCoordinatorV2Plus.sol";
import "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";
import "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";

/**
 * @title ArtNightRaffle
 * @dev A raffle contract that uses Chainlink VRF v2.5 to randomly select winners
 */
contract ArtNightRaffle is VRFConsumerBaseV2Plus {
    // VRF Coordinator interface
    IVRFCoordinatorV2Plus private immutable i_vrfCoordinator;
    
    // VRF Configuration
    uint256 private immutable i_subscriptionId;
    bytes32 private immutable i_gasLane;
    uint32 private immutable i_callbackGasLimit;
    uint16 private immutable i_requestConfirmations;
    uint32 private immutable i_numWords;
    
    // Raffle state
    struct Raffle {
        uint256[] tickets;
        uint256 winner;
        bool winnerSelected;
        bool active;
        uint256 raffleId;
    }
    
    mapping(uint256 => Raffle) private s_raffles;
    uint256 private s_nextRaffleId;
    mapping(uint256 => uint256) private s_requestIdToRaffleId; // Maps VRF request ID to raffle ID
    
    // Events
    event RaffleCreated(uint256 raffleId, uint256[] tickets);
    event WinnerSelected(uint256 raffleId, uint256 winner);
    event RaffleReset(uint256 raffleId);
    event RandomValueReceived(uint256 requestId, uint256 randomValue, uint256 randomIndex, uint256 winningTicket);
    
    // Errors
    error ArtNightRaffle__RaffleNotActive();
    error ArtNightRaffle__WinnerAlreadySelected();
    error ArtNightRaffle__NoTicketsProvided();
    error ArtNightRaffle__InvalidTicketNumber();
    error ArtNightRaffle__RaffleNotFound();
    
    constructor(
        address vrfCoordinatorV2,
        uint256 subscriptionId,
        bytes32 gasLane,
        uint32 callbackGasLimit,
        uint16 requestConfirmations,
        uint32 numWords
    ) VRFConsumerBaseV2Plus(vrfCoordinatorV2) {
        i_vrfCoordinator = IVRFCoordinatorV2Plus(vrfCoordinatorV2);
        i_subscriptionId = subscriptionId;
        i_gasLane = gasLane;
        i_callbackGasLimit = callbackGasLimit;
        i_requestConfirmations = requestConfirmations;
        i_numWords = numWords;
    }
    
    /**
     * @dev Creates a new raffle with the provided ticket numbers
     * @param tickets Array of ticket numbers for the raffle
     */
    function createRaffle(uint256[] memory tickets) external onlyOwner returns (uint256 raffleId) {
        if (tickets.length == 0) {
            revert ArtNightRaffle__NoTicketsProvided();
        }
        
        raffleId = s_nextRaffleId++;
        
        // Create new raffle
        Raffle storage raffle = s_raffles[raffleId];
        raffle.raffleId = raffleId;
        raffle.active = true;
        raffle.winnerSelected = false;
        raffle.winner = 0;
        
        // Add tickets to the raffle
        for (uint256 i = 0; i < tickets.length; i++) {
            raffle.tickets.push(tickets[i]);
        }
        
        emit RaffleCreated(raffleId, tickets);
    }
    
    /**
     * @dev Requests a random number from Chainlink VRF to select a winner
     * @param raffleId The ID of the raffle to select a winner for
     */
    function selectWinner(uint256 raffleId) external onlyOwner {
        Raffle storage raffle = s_raffles[raffleId];
        if (!raffle.active) {
            revert ArtNightRaffle__RaffleNotActive();
        }
        if (raffle.winnerSelected) {
            revert ArtNightRaffle__WinnerAlreadySelected();
        }
        
        VRFV2PlusClient.RandomWordsRequest memory req = VRFV2PlusClient.RandomWordsRequest({
            keyHash: i_gasLane,
            subId: i_subscriptionId,
            requestConfirmations: i_requestConfirmations,
            callbackGasLimit: i_callbackGasLimit,
            numWords: i_numWords,
            extraArgs: ""
        });
        
        uint256 requestId = i_vrfCoordinator.requestRandomWords(req);
        s_requestIdToRaffleId[requestId] = raffleId;
    }
    
    /**
     * @dev Callback function used by VRF Coordinator to return the random number
     * @param requestId The request ID for fulfillment
     * @param randomWords Array of random words returned by VRF
     */
    function fulfillRandomWords(
        uint256 requestId,
        uint256[] calldata randomWords
    ) internal override {
        uint256 raffleId = s_requestIdToRaffleId[requestId];
        Raffle storage raffle = s_raffles[raffleId];
        
        uint256 randomValue = randomWords[0];
        uint256 randomIndex = randomValue % raffle.tickets.length;
        uint256 winningTicket = raffle.tickets[randomIndex];
        
        raffle.winner = winningTicket;
        raffle.winnerSelected = true;
        raffle.active = false;
        
        emit RandomValueReceived(requestId, randomValue, randomIndex, winningTicket);
        emit WinnerSelected(raffleId, winningTicket);
    }
    
    /**
     * @dev Resets the raffle state
     * @param raffleId The ID of the raffle to reset
     */
    function resetRaffle(uint256 raffleId) external onlyOwner {
        Raffle storage raffle = s_raffles[raffleId];
        delete raffle.tickets;
        raffle.winner = 0;
        raffle.winnerSelected = false;
        raffle.active = false;
        
        emit RaffleReset(raffleId);
    }
    
    // Getter functions
    
    /**
     * @dev Returns the raffle tickets for a specific raffle
     * @param raffleId The ID of the raffle
     */
    function getRaffleTickets(uint256 raffleId) external view returns (uint256[] memory) {
        Raffle storage raffle = s_raffles[raffleId];
        return raffle.tickets;
    }
    
    /**
     * @dev Returns the selected winner for a specific raffle
     * @param raffleId The ID of the raffle
     */
    function getWinner(uint256 raffleId) external view returns (uint256) {
        Raffle storage raffle = s_raffles[raffleId];
        return raffle.winner;
    }
    
    /**
     * @dev Returns whether a winner has been selected for a specific raffle
     * @param raffleId The ID of the raffle
     */
    function isWinnerSelected(uint256 raffleId) external view returns (bool) {
        Raffle storage raffle = s_raffles[raffleId];
        return raffle.winnerSelected;
    }
    
    /**
     * @dev Returns whether the raffle is active
     * @param raffleId The ID of the raffle
     */
    function isRaffleActive(uint256 raffleId) external view returns (bool) {
        Raffle storage raffle = s_raffles[raffleId];
        return raffle.active;
    }
    
    /**
     * @dev Returns the number of tickets in the raffle
     * @param raffleId The ID of the raffle
     */
    function getTicketCount(uint256 raffleId) external view returns (uint256) {
        Raffle storage raffle = s_raffles[raffleId];
        return raffle.tickets.length;
    }
    
    /**
     * @dev Returns the VRF configuration
     */
    function getVRFConfig() external view returns (
        address vrfCoordinator,
        uint256 subscriptionId,
        bytes32 gasLane,
        uint32 callbackGasLimit,
        uint16 requestConfirmations,
        uint32 numWords
    ) {
        return (
            address(i_vrfCoordinator),
            i_subscriptionId,
            i_gasLane,
            i_callbackGasLimit,
            i_requestConfirmations,
            i_numWords
        );
    }
} 