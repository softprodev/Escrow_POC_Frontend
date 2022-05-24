import React, { KeyboardEvent, ChangeEvent, useEffect, useState, FormEventHandler } from 'react'

import styled from 'styled-components'
import { useHistory, useLocation, Link } from 'react-router-dom'

import AccountModal from "../../../components/AccountModal";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import ConnectButton from "../../../components/ConnectButton";




const StyledHeaderTitle = styled.h1`
    font-size: 65px;
    margin-right: 10px;
    margin-left: 10px;
	text-align: center;
`;

const StyledBuySideDiv = styled.div`
    background-color: #E7E9EB;
    padding: 35px 35px;
	border-right: 1px solid grey;
`;
const StyledSellSideDiv = styled.div`
    background-color: #E7E9EB;
    padding: 35px 35px;
`;
const StyledSubFormDiv = styled.div`
    display: flex;
`;
const StyledSubFormInnerDiv = styled.div`
	margin: 10px;
	width : 30%;
`;
const StyledSubFormInnerContentDiv = styled.div`
	margin: 10px;
	width : 70%;
`;
const StyledSubFormLabel = styled.div`
	// line-height: 4rem;
`;





const StyledVerticalLine = styled.div`
	border-left: thick solid grey;
	height:100%;
	left: 50%;
	position: absolute;
`;


const StyledTittle = styled.h3`
    margin: 50px;
`;


const StyledHeaderDiv0 = styled.div`
    display: block;
`;
const StyledHeaderDiv1 = styled.div`
    display: flex;
    margin-bottom: 10px;
`;
const StyledHeaderTitle1 = styled.h1`
    font-size: 65px;
    margin-right: 10px;
    margin-left: 10px;
`;
const StyledHeaderTitle2 = styled.h1`
    padding-top: 20px;
    padding-bottom: 20px;
`;
const StyledHeaderVerticalLine = styled.div`
border-left: 1px solid black;
`;
const StyledHeaderDiv2 = styled.div`
    display: block;
    margin-left: 10px;
    font-size: 27px;
    padding: 10px 0;
`;
const StyledProducerDiv0 = styled.div`
    text-align: center;
    display: block;
    margin-left: 10px;
    font-size: 20px;
    padding: 10px 10px;
`;
const StyledProducerDiv1 = styled.div`
    padding: 20px 0;
`;
const StyledProducerText0 = styled.h1`
    padding-bottom : 5px;
    font-size : 20px;
`;
const StyledProducerText1 = styled.h1`
    font-size : 18px;
    padding-bottom: 30px;
`;
const StyledSmallTitle = styled.h4`
    font-size : 22px;
    padding-bottom: 30px;
	text-align : center;
	color: red;

`;

const StyledFundDiv0 = styled.div`
    background-color: #E7E9EB;
    padding: 15px 15px;
`;
const StyledContainerDiv = styled.div`
    max-width: none;
`;
const StyledNextStepButton = styled.button`
	margin: 5px;    
    float: right;
    &:hover {
        border: 1px solid #0099cc;
        background-color: #00aacc;
        color: #ffffff;
    }
    &:disabled {
        border: 1px solid #999999;
        background-color: #cccccc;
        color: #666666;
    }
`;
const StyledStepButton = styled.button`  
	margin: 5px;
	width: -webkit-fill-available;  
    // float: right;
    &:hover {
        border: 1px solid #0099cc;
        background-color: #00aacc;
        color: #ffffff;
    }
    &:disabled {
        border: 1px solid #999999;
        background-color: #cccccc;
        color: #666666;
    }
`;
const StyledBackContainer = styled.div`
	padding-top : 30px;
	padding-bottom: 30px;
`;
const Styledtd = styled.td`
    text-align: center; 
    vertical-align: middle;
`;
const Styledth = styled.th`
    text-align: center; 
    vertical-align: middle;
`;

const StyledButtonDiv0 = styled.div`
	top: 50%;
	padding: 10px;
`;
const StyledImg = styled.img`
	margin-left: auto;
	margin-right: auto;
	display: block;
`;


interface Props {
	escrowBlockchain: any;
	account: any;
	actionEnabled: boolean;
	walletconnection: () => void;
	assetsArray: any;
	escrowArray: any;
	setTxStatus: (transactionStatus: string) => void;	
	txStatus: string;
}
const Step3page: React.FC<Props> = ({ escrowBlockchain, account, actionEnabled, walletconnection,
	assetsArray,escrowArray,
	txStatus, setTxStatus}) => {

    const [nextStepEnabled, SetNextStepEnabled] = useState(true);


	// Lead Investor Information
    const [leadInvestorName, SetLeadInvestorName] = useState('');
    const [leadInvestorPercentage, SetLeadInvestorPercentage] = useState('100');
    const [leadInvestorAmount, SetLeadInvestorAmount] = useState('0');
    const [leadInvestorAddress, SetLeadInvestorAddress] = useState('');
    const [escrowID, SetEscrowID] = useState('0');


    const [subInvestorPercentage, SetSubInvestorPercentage] = useState('0');
    const [subInvestorAmount, SetSubInvestorAmount] = useState('0');

	const [subInvestorCount, SetSubInvestorCount] = useState('0');



	// Seller Information
	const [sellerName, SetSellerName] = useState('');
	const [sellerAddress, SetSellerAddress] = useState('');
	const [costofasset, SetCostofasset] = useState('0');
	const [assetID, SetAssetID] = useState('0');

	const [fundedAmount, SetFundedAmount] = useState('0');
	const [fundReleased, SetFundReleased] = useState(false);


	const [subinvestorname1, Setsubinvestorname1] = useState('');
	const [subinvestorname2, Setsubinvestorname2] = useState('');
	const [subinvestorname3, Setsubinvestorname3] = useState('');
	const [subinvestorname4, Setsubinvestorname4] = useState('');
	const [subinvestorname5, Setsubinvestorname5] = useState('');


	const [subInvestor1Address, SetSubInvestor1Address] = useState('');
	const [subInvestor2Address, SetSubInvestor2Address] = useState('');
	const [subInvestor3Address, SetSubInvestor3Address] = useState('');
	const [subInvestor4Address, SetSubInvestor4Address] = useState('');
	const [subInvestor5Address, SetSubInvestor5Address] = useState('');


	const [countofsubinvestor0, Setcountofsubinvestor0] = useState(true);
	const [countofsubinvestor1, Setcountofsubinvestor1] = useState(false);
	const [countofsubinvestor2, Setcountofsubinvestor2] = useState(false);
	const [countofsubinvestor3, Setcountofsubinvestor3] = useState(false);
	const [countofsubinvestor4, Setcountofsubinvestor4] = useState(false);
	const [countofsubinvestor5, Setcountofsubinvestor5] = useState(false);


	// approve status
	const [isLeadInvestorApproved, SetIsLeadInvestorApproved] = useState(false);
	const [isSubInvestor1Approved, SetIsSubInvestor1Approved] = useState(false);
	const [isSubInvestor2Approved, SetIsSubInvestor2Approved] = useState(false);
	const [isSubInvestor3Approved, SetIsSubInvestor3Approved] = useState(false);
	const [isSubInvestor4Approved, SetIsSubInvestor4Approved] = useState(false);
	const [isSubInvestor5Approved, SetIsSubInvestor5Approved] = useState(false);
	const [isSellerApproved, SetIsSellerApproved] = useState(false);





	const { isOpen, onOpen, onClose } = useDisclosure();

	const history = useHistory();

	const [actionStatus, setActionStatus] = useState('');
	

	const onSellerConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		console.log("Seller Address : ", sellerAddress);
		console.log("connected Address : ",account );
		// check if seller address is connected
		if (String(sellerAddress) === String(account)) {
			// call for approval function.
			escrowBlockchain.smartContract.methods.approveFromSellerByEscrowID(String(escrowID))
				.send({ from: account },function (err:any, res:any) {
					if (err) {
					console.log("An error occured", err)
					return
					}
					console.log("Hash of the transaction: " + res)
					setActionStatus("Approval from seller.... txHash:"+res);
					setTxStatus("Approval from seller - txHash: "+res);
					// add feature to fetch data from transaction hash
					
				})
				.once("error", (err: any) => {
					console.log(err);
					console.log("Sorry, something went wrong please try again later.");
					alert("Sorry, something went wrong please try again later.");
					walletconnection();
					setActionStatus("");
					setTxStatus("Your transactions willl appear here...");
				})
				.then((receipt: any) => {
					console.log("Response : ", receipt);
					console.log("Transaction finished.");
					alert("Transaction finished.");
					walletconnection();
					setActionStatus("");
					setTxStatus("Your transactions willl appear here...");
					SetIsSellerApproved(true);
			});
		} else {
			alert("Seller Address doesn't match with connected address. Please connect a correct address.");
		}
	}

	const onLeadInvestorConfirm = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		console.log("Lead Investor Address : ", leadInvestorAddress);
		console.log("connected Address : ",account );
		// check if lead Investor address is connected
		if (String(leadInvestorAddress) === String(account)) {
			// call for approval function.
			escrowBlockchain.smartContract.methods.approveFromLeadInvestorByEscrowID(String(escrowID))
				.send({ from: account },function (err:any, res:any) {
					if (err) {
					console.log("An error occured", err)
					return
					}
					console.log("Hash of the transaction: " + res)
					setActionStatus("Approval from the lead investor.... txHash:"+res);
					setTxStatus("Approval from the lead investor - txHash: "+res);
					// add feature to fetch data from transaction hash
					
				})
				.once("error", (err: any) => {
					console.log(err);
					console.log("Sorry, something went wrong please try again later.");
					alert("Sorry, something went wrong please try again later.");
					walletconnection();
					setActionStatus("");
					setTxStatus("Your transactions willl appear here...");
					SetIsLeadInvestorApproved(true);
				})
				.then((receipt: any) => {
					console.log("Response : ", receipt);
					console.log("Transaction finished.");
					alert("Transaction finished.");
					walletconnection();
					setActionStatus("");
					setTxStatus("Your transactions willl appear here...");
			});
		} else {
			alert("Lead Investor Address doesn't match with connected address. Please connect a correct address.");
		}
	}


	const onSubInvestor1Confirm = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		console.log("Sub Investor 1 Address : ", subInvestor1Address);
		console.log("connected Address : ",account );
		// check if sub Investor 1 address is connected
		if (String(subInvestor1Address) === String(account)) {
			// call for approval function.
			escrowBlockchain.smartContract.methods.approveFromSubInvestorByEscrowAndSubinvestorID(String(escrowID),"0")
				.send({ from: account },function (err:any, res:any) {
					if (err) {
					console.log("An error occured", err)
					return
					}
					console.log("Hash of the transaction: " + res)
					setActionStatus("Approval from the sub investor 1.... txHash:"+res);
					setTxStatus("Approval from the sub investor 1 - txHash: "+res);
					// add feature to fetch data from transaction hash
					
				})
				.once("error", (err: any) => {
					console.log(err);
					console.log("Sorry, something went wrong please try again later.");
					alert("Sorry, something went wrong please try again later.");
					walletconnection();
					setActionStatus("");
					setTxStatus("Your transactions willl appear here...");
				})
				.then((receipt: any) => {
					console.log("Response : ", receipt);
					console.log("Transaction finished.");
					alert("Transaction finished.");
					walletconnection();
					setActionStatus("");
					setTxStatus("Your transactions willl appear here...");
					SetIsSubInvestor1Approved(true);

			});
		} else {
			alert("Sub Investor 1 Address doesn't match with connected address. Please connect a correct address.");
		}
	}

	const onSubInvestor2Confirm = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		console.log("Sub Investor 2 Address : ", subInvestor2Address);
		console.log("connected Address : ",account );
		// check if sub Investor 2 address is connected
		if (String(subInvestor2Address) === String(account)) {
			// call for approval function.
			escrowBlockchain.smartContract.methods.approveFromSubInvestorByEscrowAndSubinvestorID(String(escrowID),"1")
				.send({ from: account },function (err:any, res:any) {
					if (err) {
					console.log("An error occured", err)
					return
					}
					console.log("Hash of the transaction: " + res)
					setActionStatus("Approval from the sub investor 2.... txHash:"+res);
					setTxStatus("Approval from the sub investor 2 - txHash: "+res);
					// add feature to fetch data from transaction hash
					
				})
				.once("error", (err: any) => {
					console.log(err);
					console.log("Sorry, something went wrong please try again later.");
					alert("Sorry, something went wrong please try again later.");
					walletconnection();
					setActionStatus("");
					setTxStatus("Your transactions willl appear here...");
				})
				.then((receipt: any) => {
					console.log("Response : ", receipt);
					console.log("Transaction finished.");
					alert("Transaction finished.");
					walletconnection();
					setActionStatus("");
					setTxStatus("Your transactions willl appear here...");
					SetIsSubInvestor2Approved(true);

			});
		} else {
			alert("Sub Investor 2 Address doesn't match with connected address. Please connect a correct address.");
		}
	}


	const onSubInvestor3Confirm = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		console.log("Sub Investor 3 Address : ", subInvestor3Address);
		console.log("connected Address : ",account );
		// check if sub Investor 3 address is connected
		if (String(subInvestor3Address) === String(account)) {
			// call for approval function.
			escrowBlockchain.smartContract.methods.approveFromSubInvestorByEscrowAndSubinvestorID(String(escrowID),"2")
				.send({ from: account },function (err:any, res:any) {
					if (err) {
					console.log("An error occured", err)
					return
					}
					console.log("Hash of the transaction: " + res)
					setActionStatus("Approval from the sub investor 3.... txHash:"+res);
					setTxStatus("Approval from the sub investor 3 - txHash: "+res);
					// add feature to fetch data from transaction hash
					
				})
				.once("error", (err: any) => {
					console.log(err);
					console.log("Sorry, something went wrong please try again later.");
					alert("Sorry, something went wrong please try again later.");
					walletconnection();
					setActionStatus("");
					setTxStatus("Your transactions willl appear here...");
				})
				.then((receipt: any) => {
					console.log("Response : ", receipt);
					console.log("Transaction finished.");
					alert("Transaction finished.");
					walletconnection();
					setActionStatus("");
					setTxStatus("Your transactions willl appear here...");
					SetIsSubInvestor3Approved(true);

			});
		} else {
			alert("Sub Investor 3 Address doesn't match with connected address. Please connect a correct address.");
		}
	}



	const onSubInvestor4Confirm = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		console.log("Sub Investor 4 Address : ", subInvestor4Address);
		console.log("connected Address : ",account );
		// check if sub Investor 4 address is connected
		if (String(subInvestor4Address) === String(account)) {
			// call for approval function.
			escrowBlockchain.smartContract.methods.approveFromSubInvestorByEscrowAndSubinvestorID(String(escrowID),"3")
				.send({ from: account },function (err:any, res:any) {
					if (err) {
					console.log("An error occured", err)
					return
					}
					console.log("Hash of the transaction: " + res)
					setActionStatus("Approval from the sub investor 4.... txHash:"+res);
					setTxStatus("Approval from the sub investor 4 - txHash: "+res);
					// add feature to fetch data from transaction hash
					
				})
				.once("error", (err: any) => {
					console.log(err);
					console.log("Sorry, something went wrong please try again later.");
					alert("Sorry, something went wrong please try again later.");
					walletconnection();
					setActionStatus("");
					setTxStatus("Your transactions willl appear here...");
				})
				.then((receipt: any) => {
					console.log("Response : ", receipt);
					console.log("Transaction finished.");
					alert("Transaction finished.");
					walletconnection();
					setActionStatus("");
					setTxStatus("Your transactions willl appear here...");
					SetIsSubInvestor4Approved(true);

			});
		} else {
			alert("Sub Investor 4 Address doesn't match with connected address. Please connect a correct address.");
		}
	}


	const onSubInvestor5Confirm = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		console.log("Sub Investor 5 Address : ", subInvestor5Address);
		console.log("connected Address : ",account );
		// check if sub Investor 5 address is connected
		if (String(subInvestor5Address) === String(account)) {
			// call for approval function.
			escrowBlockchain.smartContract.methods.approveFromSubInvestorByEscrowAndSubinvestorID(String(escrowID),"4")
				.send({ from: account },function (err:any, res:any) {
					if (err) {
					console.log("An error occured", err)
					return
					}
					console.log("Hash of the transaction: " + res)
					setActionStatus("Approval from the sub investor 4.... txHash:"+res);
					setTxStatus("Approval from the sub investor 4 - txHash: "+res);
					// add feature to fetch data from transaction hash
					
				})
				.once("error", (err: any) => {
					console.log(err);
					console.log("Sorry, something went wrong please try again later.");
					alert("Sorry, something went wrong please try again later.");
					walletconnection();
					setActionStatus("");
					setTxStatus("Your transactions willl appear here...");
				})
				.then((receipt: any) => {
					console.log("Response : ", receipt);
					console.log("Transaction finished.");
					alert("Transaction finished.");
					walletconnection();
					setActionStatus("");
					setTxStatus("Your transactions willl appear here...");
					SetIsSubInvestor5Approved(true);
			});
		} else {
			alert("Sub Investor 5 Address doesn't match with connected address. Please connect a correct address.");
		}
	}




	const onBackHomeHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		history.push("/step2");
	}
	const onNextStepHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		history.push("/");
	}
	const onEmptyHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	}


	useEffect(() => {
		
		if(assetsArray){
			console.log("Asset Array Length : ", assetsArray.length);
			let lastAssetValue = assetsArray[assetsArray.length-1];
			console.log("Asset Information : ", lastAssetValue);
			SetAssetID(lastAssetValue['assetID']);

			SetSellerName(lastAssetValue['sellerName']);
			SetSellerAddress(lastAssetValue['sellerAddress']);

			// let costofAssetWei = lastAssetValue['assetCost'];
			// let costofAssetEth = parseInt(costofAssetWei)/
			SetCostofasset(String(parseFloat(lastAssetValue['assetCost'])/1000000000000000000));
			console.log("cost of asset : ", String(parseFloat(lastAssetValue['assetCost'])/1000000000000000000));

			let assetStatusCode = lastAssetValue['assetStatusCode'];

			// asset status code - 0 : created, 1 : approved by seller, 2 : released, 3 : cancelled

			if(parseInt(assetStatusCode) == 1){
				//
				SetIsSellerApproved(true);
				SetFundReleased(false);
			}else if(parseInt(assetStatusCode) == 2){
				SetIsSellerApproved(true);
				SetFundReleased(true);
			}else {
				SetIsSellerApproved(false);
				SetFundReleased(false);
			}


		}else{
			SetAssetID("0");
		}
		
	}, [assetsArray])

	useEffect(() => {
		
		if(escrowArray){
			console.log("Escrow Array Length : ", escrowArray);
			console.log("Escrow Array Length : ", escrowArray.length);
			let lastEscrowValue = escrowArray[escrowArray.length-1];
			console.log("Escrow Information : ", lastEscrowValue);
			console.log("Escrow Information - Escrow ID : ", lastEscrowValue['escrowID']);

			SetEscrowID(lastEscrowValue['escrowID']);
			SetLeadInvestorName(lastEscrowValue['leadInvestorName']);
			SetLeadInvestorAddress(lastEscrowValue['leadInvestorAddress']);
			SetLeadInvestorPercentage(lastEscrowValue['leadInvestorPercentage']);


			SetSubInvestorCount(lastEscrowValue['countOfSubInvestors']);

			SetIsLeadInvestorApproved(lastEscrowValue['leadInvestorApproveStatus']);

			if(fundReleased){
				SetFundedAmount('0');
			} else{
				SetFundedAmount(String(parseFloat(lastEscrowValue['fundedAmount'])/1000000000000000000));
			}

		}else{
			SetEscrowID("0");
			SetFundedAmount('0');

		}
		
	}, [escrowArray, fundReleased])

	useEffect(() => {
		switch(parseInt(subInvestorCount)) {
			case 0:
				{
					Setcountofsubinvestor0(true);
					Setcountofsubinvestor1(false);
					Setcountofsubinvestor2(false);
					Setcountofsubinvestor3(false);
					Setcountofsubinvestor4(false);
					Setcountofsubinvestor5(false);
					break;
				}
			case 1: 
				{
					Setcountofsubinvestor0(false);
					Setcountofsubinvestor1(true);
					Setcountofsubinvestor2(false);
					Setcountofsubinvestor3(false);
					Setcountofsubinvestor4(false);
					Setcountofsubinvestor5(false);

					if(escrowArray){
						let lastEscrowValue = escrowArray[escrowArray.length-1];
						// set sub investor address and amount, name, percentage
	
						let subInvestorAddressArray = lastEscrowValue['subInvestorAddressArray']
						console.log("Sub 1 Address  :",subInvestorAddressArray[0]);
						SetSubInvestor1Address(subInvestorAddressArray[0]);
	
						let subInvestorNameArray = lastEscrowValue['subInvestorNameArray']
						console.log("Sub 1 name  :",subInvestorNameArray[0]);
						Setsubinvestorname1(subInvestorNameArray[0]);
	
						let subInvestorAmountArray = lastEscrowValue['subInvestorAmountArray']
						console.log("Sub 1 Amount  :",String(parseFloat(subInvestorAmountArray[0])/1000000000000000000));
						SetSubInvestorAmount(String(parseFloat(subInvestorAmountArray[0])/1000000000000000000));
	
						let subInvestorPercentageArray = lastEscrowValue['subInvestorPercentageArray']
						console.log("Sub 1 Percentage  :",subInvestorPercentageArray[0]);
						SetSubInvestorPercentage(subInvestorPercentageArray[0]);
	
						let subInvestorApproveStatusArray = lastEscrowValue['subInvestorApproveStatusArray']
						console.log("Sub 1 Approve Status  :",subInvestorApproveStatusArray[0]);
						SetIsSubInvestor1Approved(subInvestorApproveStatusArray[0]);
					} else {

					}
					
					break;
				}			
			case 2: 
				{
					Setcountofsubinvestor0(false);
					Setcountofsubinvestor1(false);
					Setcountofsubinvestor2(true);
					Setcountofsubinvestor3(false);
					Setcountofsubinvestor4(false);
					Setcountofsubinvestor5(false);

					if(escrowArray){
						let lastEscrowValue = escrowArray[escrowArray.length-1];
						// set sub investor address and amount, name, percentage
	
						let subInvestorAddressArray = lastEscrowValue['subInvestorAddressArray']
						console.log("Sub 1 Address  :",subInvestorAddressArray[0]);
						SetSubInvestor1Address(subInvestorAddressArray[0]);
						SetSubInvestor2Address(subInvestorAddressArray[1]);
	
						let subInvestorNameArray = lastEscrowValue['subInvestorNameArray']
						console.log("Sub 1 name  :",subInvestorNameArray[0]);
						Setsubinvestorname1(subInvestorNameArray[0]);
						Setsubinvestorname2(subInvestorNameArray[1]);
	
						let subInvestorAmountArray = lastEscrowValue['subInvestorAmountArray']
						console.log("Sub 1 Amount  :",String(parseFloat(subInvestorAmountArray[0])/1000000000000000000));
						SetSubInvestorAmount(String(parseFloat(subInvestorAmountArray[0])/1000000000000000000));
	
						let subInvestorPercentageArray = lastEscrowValue['subInvestorPercentageArray']
						console.log("Sub 1 Percentage  :",subInvestorPercentageArray[0]);
						SetSubInvestorPercentage(subInvestorPercentageArray[0]);
	
						let subInvestorApproveStatusArray = lastEscrowValue['subInvestorApproveStatusArray']
						console.log("Sub 1 Approve Status  :",subInvestorApproveStatusArray[0]);
						SetIsSubInvestor1Approved(subInvestorApproveStatusArray[0]);
						SetIsSubInvestor2Approved(subInvestorApproveStatusArray[1]);
					}else {

					}
					


					break;
				}			
			case 3: 
				{
					Setcountofsubinvestor0(false);
					Setcountofsubinvestor1(false);
					Setcountofsubinvestor2(false);
					Setcountofsubinvestor3(true);
					Setcountofsubinvestor4(false);
					Setcountofsubinvestor5(false);

					if(escrowArray){  
						let lastEscrowValue = escrowArray[escrowArray.length-1];
						// set sub investor address and amount, name, percentage
	
						let subInvestorAddressArray = lastEscrowValue['subInvestorAddressArray']
						console.log("Sub 1 Address  :",subInvestorAddressArray[0]);
						SetSubInvestor1Address(subInvestorAddressArray[0]);
						SetSubInvestor2Address(subInvestorAddressArray[1]);
						SetSubInvestor3Address(subInvestorAddressArray[2]);
	
						let subInvestorNameArray = lastEscrowValue['subInvestorNameArray']
						console.log("Sub 1 name  :",subInvestorNameArray[0]);
						Setsubinvestorname1(subInvestorNameArray[0]);
						Setsubinvestorname2(subInvestorNameArray[1]);
						Setsubinvestorname3(subInvestorNameArray[2]);
	
						let subInvestorAmountArray = lastEscrowValue['subInvestorAmountArray']
						console.log("Sub 1 Amount  :",String(parseFloat(subInvestorAmountArray[0])/1000000000000000000));
						SetSubInvestorAmount(String(parseFloat(subInvestorAmountArray[0])/1000000000000000000));
	
						let subInvestorPercentageArray = lastEscrowValue['subInvestorPercentageArray']
						console.log("Sub 1 Percentage  :",subInvestorPercentageArray[0]);
						SetSubInvestorPercentage(subInvestorPercentageArray[0]);
	
						let subInvestorApproveStatusArray = lastEscrowValue['subInvestorApproveStatusArray']
						console.log("Sub 1 Approve Status  :",subInvestorApproveStatusArray[0]);
						SetIsSubInvestor1Approved(subInvestorApproveStatusArray[0]);
						SetIsSubInvestor2Approved(subInvestorApproveStatusArray[1]);
						SetIsSubInvestor3Approved(subInvestorApproveStatusArray[2]);
					} else {

					}
					

					break;
				}			
			case 4: 
				{
					Setcountofsubinvestor0(false);
					Setcountofsubinvestor1(false);
					Setcountofsubinvestor2(false);
					Setcountofsubinvestor3(false);
					Setcountofsubinvestor4(true);
					Setcountofsubinvestor5(false);


					if(escrowArray){ 
						let lastEscrowValue = escrowArray[escrowArray.length-1];
						// set sub investor address and amount, name, percentage
	
						let subInvestorAddressArray = lastEscrowValue['subInvestorAddressArray']
						console.log("Sub 1 Address  :",subInvestorAddressArray[0]);
						SetSubInvestor1Address(subInvestorAddressArray[0]);
						SetSubInvestor2Address(subInvestorAddressArray[1]);
						SetSubInvestor3Address(subInvestorAddressArray[2]);
						SetSubInvestor4Address(subInvestorAddressArray[3]);
	
						let subInvestorNameArray = lastEscrowValue['subInvestorNameArray']
						console.log("Sub 1 name  :",subInvestorNameArray[0]);
						Setsubinvestorname1(subInvestorNameArray[0]);
						Setsubinvestorname2(subInvestorNameArray[1]);
						Setsubinvestorname3(subInvestorNameArray[2]);
						Setsubinvestorname4(subInvestorNameArray[3]);
	
						let subInvestorAmountArray = lastEscrowValue['subInvestorAmountArray']
						console.log("Sub 1 Amount  :",String(parseFloat(subInvestorAmountArray[0])/1000000000000000000));
						SetSubInvestorAmount(String(parseFloat(subInvestorAmountArray[0])/1000000000000000000));
	
						let subInvestorPercentageArray = lastEscrowValue['subInvestorPercentageArray']
						console.log("Sub 1 Percentage  :",subInvestorPercentageArray[0]);
						SetSubInvestorPercentage(subInvestorPercentageArray[0]);
	
						let subInvestorApproveStatusArray = lastEscrowValue['subInvestorApproveStatusArray']
						console.log("Sub 1 Approve Status  :",subInvestorApproveStatusArray[0]);
						SetIsSubInvestor1Approved(subInvestorApproveStatusArray[0]);
						SetIsSubInvestor2Approved(subInvestorApproveStatusArray[1]);
						SetIsSubInvestor3Approved(subInvestorApproveStatusArray[2]);
						SetIsSubInvestor4Approved(subInvestorApproveStatusArray[3]);
					} else {

					}
					
					break;
				}			
			case 5: 
				{
					Setcountofsubinvestor0(false);
					Setcountofsubinvestor1(false);
					Setcountofsubinvestor2(false);
					Setcountofsubinvestor3(false);
					Setcountofsubinvestor4(false);
					Setcountofsubinvestor5(true);


					if(escrowArray){
						let lastEscrowValue = escrowArray[escrowArray.length-1];
						// set sub investor address and amount, name, percentage
	
						let subInvestorAddressArray = lastEscrowValue['subInvestorAddressArray']
						console.log("Sub 1 Address  :",subInvestorAddressArray[0]);
						SetSubInvestor1Address(subInvestorAddressArray[0]);
						SetSubInvestor2Address(subInvestorAddressArray[1]);
						SetSubInvestor3Address(subInvestorAddressArray[2]);
						SetSubInvestor4Address(subInvestorAddressArray[3]);
						SetSubInvestor5Address(subInvestorAddressArray[4]);
	
						let subInvestorNameArray = lastEscrowValue['subInvestorNameArray']
						console.log("Sub 1 name  :",subInvestorNameArray[0]);
						Setsubinvestorname1(subInvestorNameArray[0]);
						Setsubinvestorname2(subInvestorNameArray[1]);
						Setsubinvestorname3(subInvestorNameArray[2]);
						Setsubinvestorname4(subInvestorNameArray[3]);
						Setsubinvestorname5(subInvestorNameArray[4]);
	
						let subInvestorAmountArray = lastEscrowValue['subInvestorAmountArray']
						console.log("Sub 1 Amount  :",String(parseFloat(subInvestorAmountArray[0])/1000000000000000000));
						SetSubInvestorAmount(String(parseFloat(subInvestorAmountArray[0])/1000000000000000000));
	
						let subInvestorPercentageArray = lastEscrowValue['subInvestorPercentageArray']
						console.log("Sub 1 Percentage  :",subInvestorPercentageArray[0]);
						SetSubInvestorPercentage(subInvestorPercentageArray[0]);
	
						let subInvestorApproveStatusArray = lastEscrowValue['subInvestorApproveStatusArray']
						console.log("Sub 1 Approve Status  :",subInvestorApproveStatusArray[0]);
						SetIsSubInvestor1Approved(subInvestorApproveStatusArray[0]);
						SetIsSubInvestor2Approved(subInvestorApproveStatusArray[1]);
						SetIsSubInvestor3Approved(subInvestorApproveStatusArray[2]);
						SetIsSubInvestor4Approved(subInvestorApproveStatusArray[3]);
						SetIsSubInvestor5Approved(subInvestorApproveStatusArray[4]);
					} else {

					}

					
					
					
					break;
				}	
			default:
				{
					Setcountofsubinvestor0(true);
					Setcountofsubinvestor1(false);
					Setcountofsubinvestor2(false);
					Setcountofsubinvestor3(false);
					Setcountofsubinvestor4(false);
					Setcountofsubinvestor5(false);
					break;
				}
		}


		SetLeadInvestorAmount(String(parseFloat(leadInvestorPercentage)/100*parseFloat(costofasset)));
		console.log("Lead Investor Amount : ", String(parseFloat(leadInvestorPercentage)/100*parseFloat(costofasset)));

		if (parseInt(subInvestorCount) == 0 ){
			
		} else{
			SetSubInvestorPercentage(String((100-parseFloat(leadInvestorPercentage))/100/parseInt(subInvestorCount)));
			console.log("Sub Investor Percentage : ", String((100-parseFloat(leadInvestorPercentage))/parseInt(subInvestorCount)));

			SetSubInvestorAmount(String((100-parseFloat(leadInvestorPercentage))/100*parseFloat(costofasset)/parseInt(subInvestorCount)));
			console.log("Sub Investor Amount : ", String((100-parseFloat(leadInvestorPercentage))/100*parseFloat(costofasset)/parseInt(subInvestorCount)));
		}		

	}, [subInvestorCount,isLeadInvestorApproved,isSellerApproved,isSubInvestor1Approved,isSubInvestor2Approved,isSubInvestor3Approved,isSubInvestor4Approved,isSubInvestor5Approved])
	

	return (

		<section id="section" className="section">

			<div className="section__header pt-3">
				<StyledBackContainer>
					<button type="button" onClick={onBackHomeHandler} className="btn btn-primary mb-1">Step 2</button>
					{nextStepEnabled ?
                        <>
                            <StyledNextStepButton type="button" onClick={onNextStepHandler} className="btn btn-primary mb-1">Finish</StyledNextStepButton>
                        </>
                        :
                        <>
        					<StyledNextStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Finish</StyledNextStepButton>
                        </>
                    }											
				</StyledBackContainer>
				<StyledHeaderTitle className="mb-0">Complete transaction</StyledHeaderTitle>

				<div className="container-fluid">
					<div className="row">
						<div className="col">
							<StyledHeaderDiv0>
								<StyledHeaderDiv1>									
									<label className="w-100 mb-3">
									<p className="form-label">NOTES:</p>
									<p className="form-label">1) Buy side only needs to complete due diligence check.</p>
									</label>							
									<label className="w-100 mb-3">
										<p className="form-label">LOGIC:</p>
										<p className="form-label">1) Once all due diligence complete (Yes), then funds flow from escrow wallet to seller wallet.</p>
									</label>	
								</StyledHeaderDiv1>
								<StyledHeaderTitle2 className="mb-0">Connected Address : {account}</StyledHeaderTitle2>
								<StyledHeaderTitle2 className="mb-0">Escrow Amount : {fundedAmount}</StyledHeaderTitle2>
								<p className="text-center text-muted">{actionStatus}</p>
							</StyledHeaderDiv0>
						</div>
						<div className="col col-lg-2 d-flex justify-content-end">
							<div className="text-right">
								<ConnectButton handleOpenModal={onOpen} walletconnection={walletconnection} />
							</div>
						</div>
					</div>
				</div>
			</div>
			<hr />
			<StyledContainerDiv className="container pt-5 pb-5">
				<div className="row">
					
					<StyledBuySideDiv className="col">
						<StyledSmallTitle className="mb-4">Buy Side</StyledSmallTitle>

						<form action="">							
							<div>
								<StyledSubFormDiv>
									<StyledSubFormInnerContentDiv>
										<StyledSubFormLabel className="w-100 mb-3">
											<span className="form-label">Lead Investor </span> <br/>
											<span className="form-label">Name : {leadInvestorName}</span> <br/>
											<span className="form-label">Address : {leadInvestorAddress}</span> <br/>
											<span className="form-label">Amount to Escrow (ETH) : {leadInvestorAmount}</span>
										</StyledSubFormLabel>										
									</StyledSubFormInnerContentDiv>
									<StyledSubFormInnerDiv>
										<div className="text-right">
											{/* <ConnectButton handleOpenModal={onOpen} walletconnection={walletconnection} /> */}
											<p/><span className="form-label">Due Deligence complete?</span>
											{isLeadInvestorApproved ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={onLeadInvestorConfirm} className="btn btn-primary mb-1">Confirm</StyledStepButton>
														</>
											}
										</div>
									</StyledSubFormInnerDiv>
									
								</StyledSubFormDiv>

								{countofsubinvestor0 ?
									<>
									</>
									:
									<>
									</>
								}
								<hr/>
								{countofsubinvestor1 ?
									<>
										<StyledSubFormDiv>
											<StyledSubFormInnerContentDiv>
												<StyledSubFormLabel className="w-100 mb-3">
													<span className="form-label">Sub Investor 1 </span> <br/>
													<span className="form-label">Address : {subInvestor1Address}</span> <br/>
													<span className="form-label">Name : {subinvestorname1}</span> <br/>
													<span className="form-label">Amount to Escrow (ETH) : {subInvestorAmount}</span>
												</StyledSubFormLabel>
											</StyledSubFormInnerContentDiv>
											<StyledSubFormInnerDiv>
												<div className="text-right">
													{/* <ConnectButton handleOpenModal={onOpen} walletconnection={walletconnection} /> */}
													<p/><span className="form-label">Due Deligence complete?</span>

													{isSubInvestor1Approved ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={onSubInvestor1Confirm} className="btn btn-primary mb-1">Confirm</StyledStepButton>
														</>
													}	
												</div>
											</StyledSubFormInnerDiv>									
										</StyledSubFormDiv>																			
									</>
									:
									<>
									</>
								}
								{countofsubinvestor2 ?
									<>
										<StyledSubFormDiv>
											<StyledSubFormInnerContentDiv>
												<StyledSubFormLabel className="w-100 mb-3">
													<span className="form-label">Sub Investor 1 </span> <br/>
													<span className="form-label">Address : {subInvestor1Address}</span> <br/>
													<span className="form-label">Name : {subinvestorname1}</span> <br/>
													<span className="form-label">Amount to Escrow (ETH) : {subInvestorAmount}</span>
												</StyledSubFormLabel>
											</StyledSubFormInnerContentDiv>
											<StyledSubFormInnerDiv>
												<div className="text-right">
													{/* <ConnectButton handleOpenModal={onOpen} walletconnection={walletconnection} /> */}
													<p/><span className="form-label">Due Deligence complete?</span>
													{isSubInvestor1Approved ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={onSubInvestor1Confirm} className="btn btn-primary mb-1">Confirm</StyledStepButton>
														</>
													}	
												</div>
											</StyledSubFormInnerDiv>								
										</StyledSubFormDiv>
										<hr/>
										<StyledSubFormDiv>
											<StyledSubFormInnerContentDiv>
												<StyledSubFormLabel className="w-100 mb-3">
													<span className="form-label">Sub Investor 2 </span> <br/>
													<span className="form-label">Address : {subInvestor2Address}</span> <br/>
													<span className="form-label">Name : {subinvestorname2}</span> <br/>
													<span className="form-label">Amount to Escrow (ETH) : {subInvestorAmount}</span>
												</StyledSubFormLabel>
											</StyledSubFormInnerContentDiv>
											<StyledSubFormInnerDiv>
												<div className="text-right">
													{/* <ConnectButton handleOpenModal={onOpen} walletconnection={walletconnection} /> */}
													<p/><span className="form-label">Due Deligence complete?</span>
													{isSubInvestor2Approved ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={onSubInvestor2Confirm} className="btn btn-primary mb-1">Confirm</StyledStepButton>
														</>
													}	
												</div>
											</StyledSubFormInnerDiv>									
										</StyledSubFormDiv>										
									</>
									:
									<>
									</>
								}
								{countofsubinvestor3 ?
									<>
										<StyledSubFormDiv>
											<StyledSubFormInnerContentDiv>
												<StyledSubFormLabel className="w-100 mb-3">
													<span className="form-label">Sub Investor 1 </span> <br/>
													<span className="form-label">Address : {subInvestor1Address}</span> <br/>
													<span className="form-label">Name : {subinvestorname1}</span> <br/>
													<span className="form-label">Amount to Escrow (ETH) : {subInvestorAmount}</span>
												</StyledSubFormLabel>
											</StyledSubFormInnerContentDiv>
											<StyledSubFormInnerDiv>
												<div className="text-right">
													{/* <ConnectButton handleOpenModal={onOpen} walletconnection={walletconnection} /> */}
													<p/><span className="form-label">Due Deligence complete?</span>
													{isSubInvestor1Approved ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={onSubInvestor1Confirm} className="btn btn-primary mb-1">Confirm</StyledStepButton>
														</>
													}
												</div>
											</StyledSubFormInnerDiv>									
										</StyledSubFormDiv>
										<hr/>
										<StyledSubFormDiv>
											<StyledSubFormInnerContentDiv>
												<StyledSubFormLabel className="w-100 mb-3">
													<span className="form-label">Sub Investor 2 </span> <br/>
													<span className="form-label">Address : {subInvestor2Address}</span> <br/>
													<span className="form-label">Name : {subinvestorname2}</span> <br/>
													<span className="form-label">Amount to Escrow (ETH) : {subInvestorAmount}</span>
												</StyledSubFormLabel>
											</StyledSubFormInnerContentDiv>
											<StyledSubFormInnerDiv>
												<div className="text-right">
													{/* <ConnectButton handleOpenModal={onOpen} walletconnection={walletconnection} /> */}
													<p/><span className="form-label">Due Deligence complete?</span>
													{isSubInvestor2Approved ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={onSubInvestor2Confirm} className="btn btn-primary mb-1">Confirm</StyledStepButton>
														</>
													}
												</div>
											</StyledSubFormInnerDiv>									
										</StyledSubFormDiv>
										<hr/>
										<StyledSubFormDiv>
											<StyledSubFormInnerContentDiv>
												<StyledSubFormLabel className="w-100 mb-3">
													<span className="form-label">Sub Investor 3 </span> <br/>
													<span className="form-label">Address : {subInvestor3Address}</span> <br/>
													<span className="form-label">Name : {subinvestorname3}</span> <br/>
													<span className="form-label">Amount to Escrow (ETH) : {subInvestorAmount}</span>
												</StyledSubFormLabel>
											</StyledSubFormInnerContentDiv>
											<StyledSubFormInnerDiv>
												<div className="text-right">
													{/* <ConnectButton handleOpenModal={onOpen} walletconnection={walletconnection} /> */}
													<p/><span className="form-label">Due Deligence complete?</span>
													{isSubInvestor3Approved ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={onSubInvestor3Confirm} className="btn btn-primary mb-1">Confirm</StyledStepButton>
														</>
													}
												</div>
											</StyledSubFormInnerDiv>									
										</StyledSubFormDiv>
									</>
									:
									<>
									</>
								}
								{countofsubinvestor4 ?
									<>
										<StyledSubFormDiv>
											<StyledSubFormInnerContentDiv>
												<StyledSubFormLabel className="w-100 mb-3">
													<span className="form-label">Sub Investor 1 </span> <br/>
													<span className="form-label">Address : {subInvestor1Address}</span> <br/>
													<span className="form-label">Name : {subinvestorname1}</span> <br/>
													<span className="form-label">Amount to Escrow (ETH) : {subInvestorAmount}</span>
												</StyledSubFormLabel>
											</StyledSubFormInnerContentDiv>
											<StyledSubFormInnerDiv>
												<div className="text-right">
													{/* <ConnectButton handleOpenModal={onOpen} walletconnection={walletconnection} /> */}
													<p/><span className="form-label">Due Deligence complete?</span>
													{isSubInvestor1Approved ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={onSubInvestor1Confirm} className="btn btn-primary mb-1">Confirm</StyledStepButton>
														</>
													}
												</div>
											</StyledSubFormInnerDiv>									
										</StyledSubFormDiv>
										<hr/>
										<StyledSubFormDiv>
											<StyledSubFormInnerContentDiv>
												<StyledSubFormLabel className="w-100 mb-3">
													<span className="form-label">Sub Investor 2 </span> <br/>
													<span className="form-label">Address : {subInvestor2Address}</span> <br/>
													<span className="form-label">Name : {subinvestorname2}</span> <br/>
													<span className="form-label">Amount to Escrow (ETH) : {subInvestorAmount}</span>
												</StyledSubFormLabel>
											</StyledSubFormInnerContentDiv>
											<StyledSubFormInnerDiv>
												<div className="text-right">
													{/* <ConnectButton handleOpenModal={onOpen} walletconnection={walletconnection} /> */}
													<p/><span className="form-label">Due Deligence complete?</span>
													{isSubInvestor2Approved ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={onSubInvestor2Confirm} className="btn btn-primary mb-1">Confirm</StyledStepButton>
														</>
													}
												</div>
											</StyledSubFormInnerDiv>									
										</StyledSubFormDiv>
										<hr/>
										<StyledSubFormDiv>
											<StyledSubFormInnerContentDiv>
												<StyledSubFormLabel className="w-100 mb-3">
													<span className="form-label">Sub Investor 3 </span> <br/>
													<span className="form-label">Address : {subInvestor3Address}</span> <br/>
													<span className="form-label">Name : {subinvestorname3}</span> <br/>
													<span className="form-label">Amount to Escrow (ETH) : {subInvestorAmount}</span>
												</StyledSubFormLabel>
											</StyledSubFormInnerContentDiv>
											<StyledSubFormInnerDiv>
												<div className="text-right">
													{/* <ConnectButton handleOpenModal={onOpen} walletconnection={walletconnection} /> */}
													<p/><span className="form-label">Due Deligence complete?</span>
													{isSubInvestor3Approved ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={onSubInvestor3Confirm} className="btn btn-primary mb-1">Confirm</StyledStepButton>
														</>
													}
												</div>
											</StyledSubFormInnerDiv>									
										</StyledSubFormDiv>
										<hr />
										<StyledSubFormDiv>
											<StyledSubFormInnerContentDiv>
												<StyledSubFormLabel className="w-100 mb-3">
													<span className="form-label">Sub Investor 4 </span> <br/>
													<span className="form-label">Address : {subInvestor4Address}</span> <br/>
													<span className="form-label">Name : {subinvestorname4}</span> <br/>
													<span className="form-label">Amount to Escrow (ETH) : {subInvestorAmount}</span>
												</StyledSubFormLabel>
											</StyledSubFormInnerContentDiv>
											<StyledSubFormInnerDiv>
												<div className="text-right">
													{/* <ConnectButton handleOpenModal={onOpen} walletconnection={walletconnection} /> */}
													<p/><span className="form-label">Due Deligence complete?</span>
													{isSubInvestor4Approved ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={onSubInvestor4Confirm} className="btn btn-primary mb-1">Confirm</StyledStepButton>
														</>
													}
												</div>
											</StyledSubFormInnerDiv>									
										</StyledSubFormDiv>
										
									</>
									:
									<>
									</>
								}
								{countofsubinvestor5 ?
									<>
										<StyledSubFormDiv>
											<StyledSubFormInnerContentDiv>
												<StyledSubFormLabel className="w-100 mb-3">
													<span className="form-label">Sub Investor 1 </span> <br/>
													<span className="form-label">Address : {subInvestor1Address}</span> <br/>
													<span className="form-label">Name : {subinvestorname1}</span> <br/>
													<span className="form-label">Amount to Escrow (ETH) : {subInvestorAmount}</span>
												</StyledSubFormLabel>
											</StyledSubFormInnerContentDiv>
											<StyledSubFormInnerDiv>
												<div className="text-right">
													{/* <ConnectButton handleOpenModal={onOpen} walletconnection={walletconnection} /> */}
													<p/><span className="form-label">Due Deligence complete?</span>
													{isSubInvestor1Approved ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={onSubInvestor1Confirm} className="btn btn-primary mb-1">Confirm</StyledStepButton>
														</>
													}
												</div>
											</StyledSubFormInnerDiv>									
										</StyledSubFormDiv>
										<hr/>
										<StyledSubFormDiv>
											<StyledSubFormInnerContentDiv>
												<StyledSubFormLabel className="w-100 mb-3">
													<span className="form-label">Sub Investor 2 </span> <br/>
													<span className="form-label">Address : {subInvestor2Address}</span> <br/>
													<span className="form-label">Name : {subinvestorname2}</span> <br/>
													<span className="form-label">Amount to Escrow (ETH) : {subInvestorAmount}</span>
												</StyledSubFormLabel>
											</StyledSubFormInnerContentDiv>
											<StyledSubFormInnerDiv>
												<div className="text-right">
													{/* <ConnectButton handleOpenModal={onOpen} walletconnection={walletconnection} /> */}
													<p/><span className="form-label">Due Deligence complete?</span>
													{isSubInvestor2Approved ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={onSubInvestor2Confirm} className="btn btn-primary mb-1">Confirm</StyledStepButton>
														</>
													}
												</div>
											</StyledSubFormInnerDiv>									
										</StyledSubFormDiv>
										<hr/>
										<StyledSubFormDiv>
											<StyledSubFormInnerContentDiv>
												<StyledSubFormLabel className="w-100 mb-3">
													<span className="form-label">Sub Investor 3 </span> <br/>
													<span className="form-label">Address : {subInvestor3Address}</span> <br/>
													<span className="form-label">Name : {subinvestorname3}</span> <br/>
													<span className="form-label">Amount to Escrow (ETH) : {subInvestorAmount}</span>
												</StyledSubFormLabel>
											</StyledSubFormInnerContentDiv>
											<StyledSubFormInnerDiv>
												<div className="text-right">
													{/* <ConnectButton handleOpenModal={onOpen} walletconnection={walletconnection} /> */}
													<p/><span className="form-label">Due Deligence complete?</span>
													{isSubInvestor3Approved ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={onSubInvestor3Confirm} className="btn btn-primary mb-1">Confirm</StyledStepButton>
														</>
													}
												</div>
											</StyledSubFormInnerDiv>									
										</StyledSubFormDiv>
										<hr />
										<StyledSubFormDiv>
											<StyledSubFormInnerContentDiv>
												<StyledSubFormLabel className="w-100 mb-3">
													<span className="form-label">Sub Investor 4 </span> <br/>
													<span className="form-label">Address : {subInvestor4Address}</span> <br/>
													<span className="form-label">Name : {subinvestorname4}</span> <br/>
													<span className="form-label">Amount to Escrow (ETH) : {subInvestorAmount}</span>
												</StyledSubFormLabel>
											</StyledSubFormInnerContentDiv>
											<StyledSubFormInnerDiv>
												<div className="text-right">
													{/* <ConnectButton handleOpenModal={onOpen} walletconnection={walletconnection} /> */}
													<p/><span className="form-label">Due Deligence complete?</span>
													{isSubInvestor4Approved ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={onSubInvestor4Confirm} className="btn btn-primary mb-1">Confirm</StyledStepButton>
														</>
													}
												</div>
											</StyledSubFormInnerDiv>									
										</StyledSubFormDiv>
										<hr />
										<StyledSubFormDiv>
											<StyledSubFormInnerContentDiv>
												<StyledSubFormLabel className="w-100 mb-3">
													<span className="form-label">Sub Investor 5 </span> <br/>
													<span className="form-label">Address : {subInvestor5Address}</span> <br/>
													<span className="form-label">Name : {subinvestorname5}</span> <br/>
													<span className="form-label">Amount to Escrow (ETH) : {subInvestorAmount}</span>
												</StyledSubFormLabel>
											</StyledSubFormInnerContentDiv>
											<StyledSubFormInnerDiv>
												<div className="text-right">
													{/* <ConnectButton handleOpenModal={onOpen} walletconnection={walletconnection} /> */}
													<p/><span className="form-label">Due Deligence complete?</span>
													{isSubInvestor5Approved ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={onSubInvestor5Confirm} className="btn btn-primary mb-1">Confirm ✅</StyledStepButton>
														</>
													}	
												</div>
											</StyledSubFormInnerDiv>									
										</StyledSubFormDiv>
									</>
									:
									<>
									</>
								}
								
							</div>
							<hr />
						</form>
					</StyledBuySideDiv>
					<StyledSellSideDiv className="col">
						<StyledSmallTitle className="mb-4">Sell Side</StyledSmallTitle>

						<form action="">							
							<div>
							<StyledSubFormDiv>
									<StyledSubFormInnerContentDiv>
										<StyledSubFormLabel className="w-100 mb-3">
											<span className="form-label">Seller name : {sellerName} </span> <br/>
											<span className="form-label">Address : {sellerAddress}</span><br/>
											<span className="form-label">Cost of asset (ETH) : {costofasset}</span>
										</StyledSubFormLabel>										
									</StyledSubFormInnerContentDiv>
									<StyledSubFormInnerDiv>
										<div className="text-right">
											{/* <ConnectButton handleOpenModal={onOpen} walletconnection={walletconnection} /> */}
											<p/><span className="form-label">Due Deligence complete?</span>
											{isSellerApproved ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={onSellerConfirm} className="btn btn-primary mb-1">Confirm</StyledStepButton>
														</>
											}
										</div>
									</StyledSubFormInnerDiv>
									
								</StyledSubFormDiv>							
								
							</div>
							<hr />
							
						</form>
					</StyledSellSideDiv>
				</div>
			</StyledContainerDiv>
			
			<hr />
			
			<AccountModal isOpen={isOpen} onClose={onClose} txStatus={txStatus}/>
		</section>

	)
}


export default Step3page
