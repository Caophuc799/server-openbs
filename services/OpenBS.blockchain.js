import web3 from './web3'
import { addressSC } from '../constants/constant';
// Your contract address
export const address = addressSC

// Your contract ABI
// const abi = [
// 	{
// 		"constant": false,
// 		"inputs": [
// 			{
// 				"name": "_fromUser",
// 				"type": "address"
// 			},
// 			{
// 				"name": "_toUser",
// 				"type": "address"
// 			},
// 			{
// 				"name": "_action",
// 				"type": "string"
// 			},
// 			{
// 				"name": "_description",
// 				"type": "string"
// 			}
// 		],
// 		"name": "addNewAction",
// 		"outputs": [],
// 		"payable": false,
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"payable": false,
// 		"stateMutability": "nonpayable",
// 		"type": "constructor"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": false,
// 				"name": "_fromUser",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "_toUser",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "_action",
// 				"type": "string"
// 			},
// 			{
// 				"indexed": false,
// 				"name": "_description",
// 				"type": "string"
// 			}
// 		],
// 		"name": "NewAction",
// 		"type": "event"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [],
// 		"name": "actionIndex",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"constant": true,
// 		"inputs": [
// 			{
// 				"name": "_actionIndex",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "getAction",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "uint256"
// 			},
// 			{
// 				"name": "",
// 				"type": "address"
// 			},
// 			{
// 				"name": "",
// 				"type": "address"
// 			},
// 			{
// 				"name": "",
// 				"type": "string"
// 			},
// 			{
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	}
// ]
const abi = [
	{
		"constant": true,
		"inputs": [],
		"name": "actionIndex",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_actionIndex",
				"type": "uint256"
			}
		],
		"name": "getAction",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_fromUser",
				"type": "string"
			},
			{
				"name": "_toUser",
				"type": "string"
			},
			{
				"name": "_action",
				"type": "string"
			},
			{
				"name": "_description",
				"type": "string"
			}
		],
		"name": "addNewAction",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_fromUser",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_toUser",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_action",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_description",
				"type": "string"
			}
		],
		"name": "NewAction",
		"type": "event"
	}
]

export default new web3.eth.Contract(abi, address)
