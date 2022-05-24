import React, { KeyboardEvent, ChangeEvent, useEffect, useState, FormEventHandler } from 'react'

import styled from 'styled-components'
import { useHistory, useLocation, Link } from 'react-router-dom'

import AccountModal from "../../../components/AccountModal";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import ConnectButton from "../../../components/ConnectButton";
import LeadInvestorWalletConBtn from "../../../components/LeadInvestorWalletConBtn";
import SubInvestor1WalletConBtn from '../../../components/SubInvestor1WalletConBtn';
import SubInvestor2WalletConBtn from '../../../components/SubInvestor2WalletConBtn';
import SubInvestor3WalletConBtn from '../../../components/SubInvestor3WalletConBtn';
import SubInvestor4WalletConBtn from '../../../components/SubInvestor4WalletConBtn';
import SubInvestor5WalletConBtn from '../../../components/SubInvestor5WalletConBtn';
import SellerWalletConBtn from '../../../components/SellerWalletConBtn';




const POCButton = styled.button`
    padding : 5px 5px;
	margin: 5px;
`;
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

	leadInvestorName: string;
	SetLeadInvestorName: (leadInvestorName: string) => void;	

	leadInvestorPercentage: string;
	SetLeadInvestorPercentage: (leadInvestorPercentage: string) => void;	

	subInvestorCount: string;
	SetCountOFSubInvestors: (countOfSubInvestors: string) => void;	

	sellerName: string;
	SetSellerName: (sellerName: string) => void;	

	costofasset: string;
	SetCostOfAsset: (costOfAsset: string) => void;	
}
const Step2page: React.FC<Props> = ({ escrowBlockchain, account, actionEnabled, walletconnection,
	assetsArray,escrowArray,
	txStatus, setTxStatus, 
	leadInvestorName, SetLeadInvestorName,
	leadInvestorPercentage, SetLeadInvestorPercentage,
	subInvestorCount, SetCountOFSubInvestors,
	sellerName, SetSellerName,
	costofasset, SetCostOfAsset
}) => {

    const [nextStepEnabled, SetNextStepEnabled] = useState(false);
    // const [leadInvestorName, SetLeadInvestorName] = useState('Lead Investor');
    // const [leadInvestorPercentage, SetLeadInvestorPercentage] = useState('80');
    const [leadInvestorAmount, SetLeadInvestorAmount] = useState('0');


    const [subInvestorPercentage, SetSubInvestorPercentage] = useState('0');
    const [subInvestorAmount, SetSubInvestorAmount] = useState('0');
	// const [subInvestorCount, SetSubInvestorCount] = useState('3');

	// const [sellerName, SetSellerName] = useState('test seller');
	// const [costofasset, SetCostofasset] = useState('3');


	const [subinvestorname1, Setsubinvestorname1] = useState('');
	const [subinvestorname2, Setsubinvestorname2] = useState('');
	const [subinvestorname3, Setsubinvestorname3] = useState('');
	const [subinvestorname4, Setsubinvestorname4] = useState('');
	const [subinvestorname5, Setsubinvestorname5] = useState('');


	const [countofsubinvestor0, Setcountofsubinvestor0] = useState(true);
	const [countofsubinvestor1, Setcountofsubinvestor1] = useState(false);
	const [countofsubinvestor2, Setcountofsubinvestor2] = useState(false);
	const [countofsubinvestor3, Setcountofsubinvestor3] = useState(false);
	const [countofsubinvestor4, Setcountofsubinvestor4] = useState(false);
	const [countofsubinvestor5, Setcountofsubinvestor5] = useState(false);

	const [walletType, SetWalletType] = useState(0);

	const [leadInvestorAddress, SetLeadInvestorAddress] = useState('');
	const [SubInvestor1Address, SetSubInvestor1Address] = useState('');
	const [SubInvestor2Address, SetSubInvestor2Address] = useState('');
	const [SubInvestor3Address, SetSubInvestor3Address] = useState('');
	const [SubInvestor4Address, SetSubInvestor4Address] = useState('');
	const [SubInvestor5Address, SetSubInvestor5Address] = useState('');
	const [SellerAddress, SetSellerAddress] = useState('');


	const [fundedAmount, SetFundedAmount] = useState('0');

	const [assetID, SetAssetID] = useState(0);
	const [escrowID, SetEscrowID] = useState(0);



	const [isCreateAsset, SetIsCreateAsset] = useState(false);
	const [isCreateEscrow, SetIsCreateEscrow] = useState(false);
	const [isDepositLead, SetIsDepositLead] = useState(false);
	const [isAddedSub1, SetIsAddedSub1] = useState(false);
	const [isDepositedSub1, SetIsDepositedSub1] = useState(false);
	const [isAddedSub2, SetIsAddedSub2] = useState(false);
	const [isDepositedSub2, SetIsDepositedSub2] = useState(false);
	const [isAddedSub3, SetIsAddedSub3] = useState(false);
	const [isDepositedSub3, SetIsDepositedSub3] = useState(false);
	const [isAddedSub4, SetIsAddedSub4] = useState(false);
	const [isDepositedSub4, SetIsDepositedSub4] = useState(false);
	const [isAddedSub5, SetIsAddedSub5] = useState(false);
	const [isDepositedSub5, SetIsDepositedSub5] = useState(false);

	const { isOpen, onOpen, onClose } = useDisclosure();

	const history = useHistory();

	const onSubInvestor1Address = (e: ChangeEvent<HTMLInputElement>): void => {
		Setsubinvestorname1(e.target.value);
	}
	const onSubInvestor2Address = (e: ChangeEvent<HTMLInputElement>): void => {
		Setsubinvestorname2(e.target.value);
	}
	const onSubInvestor3Address = (e: ChangeEvent<HTMLInputElement>): void => {
		Setsubinvestorname3(e.target.value);
	}
	const onSubInvestor4Address = (e: ChangeEvent<HTMLInputElement>): void => {
		Setsubinvestorname4(e.target.value);
	}
	const onSubInvestor5Address = (e: ChangeEvent<HTMLInputElement>): void => {
		Setsubinvestorname5(e.target.value);
	}

	
	const createNewAsset = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		
		// cost as wei
		let costOfAssetAsWei = Number(costofasset)*1000000000000000000;

		console.log("costOfAssetAsWei : ", costOfAssetAsWei);
		console.log("sellerName : ", sellerName);

		escrowBlockchain.smartContract.methods.createNewAsset(sellerName, String(costOfAssetAsWei))
			.send({ from: account },function (err:any, res:any) {
				if (err) {
				console.log("An error occured", err)
				return
				}
				console.log("Hash of the transaction: " + res)
				setActionStatus("Creating Assets.... txHash:"+res);
				setTxStatus("Creating Assets - txHash: "+res);
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
				SetIsCreateAsset(true);
				checkNextStepEnabled();
		});

	}
	const addSubInvestor1AddressToEscrow = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		console.log("escrowID",escrowID);
		console.log("subinvestorname1",subinvestorname1);
		console.log("subInvestorAmount",subInvestorAmount);
		console.log("subInvestorPercentage",subInvestorPercentage);


		let subInvestorFundPriceWei = Number(subInvestorAmount)*1000000000000000000;
		console.log("subInvestorFundPriceWei",subInvestorFundPriceWei);

		let tempSubInvestorPercentage  = String(parseFloat(subInvestorPercentage)*100);
		console.log("subInvestorPercentage",tempSubInvestorPercentage);

		if(subinvestorname1){
			escrowBlockchain.smartContract.methods.addSubInvestorsByEscrowAndSubInvestorID(String(escrowID),"0",subinvestorname1,String(subInvestorFundPriceWei),tempSubInvestorPercentage)
				.send({ from: account },function (err:any, res:any) {
					if (err) {
					console.log("An error occured", err)
					return
					}
					console.log("Hash of the transaction: " + res)
					setActionStatus("Attaching Sub Investor 1.... txHash:"+res);
					setTxStatus("Attaching Sub Investor 1 - txHash: "+res);
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
					SetIsAddedSub1(true);
					checkNextStepEnabled();

			});
		}else{
			alert("Please input Sub investor 1 Name.");
		}

	}
	const addSubInvestor2AddressToEscrow = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		let subInvestorFundPriceWei = Number(subInvestorAmount)*1000000000000000000;
		console.log("subInvestorFundPriceWei",subInvestorFundPriceWei);

		let tempSubInvestorPercentage  = String(parseFloat(subInvestorPercentage)*100);
		console.log("subInvestorPercentage",tempSubInvestorPercentage);


		if(subinvestorname2){
			escrowBlockchain.smartContract.methods.addSubInvestorsByEscrowAndSubInvestorID(String(escrowID),"1",subinvestorname2,String(subInvestorFundPriceWei),tempSubInvestorPercentage)
			.send({ from: account },function (err:any, res:any) {
				if (err) {
				  console.log("An error occured", err)
				  return
				}
				console.log("Hash of the transaction: " + res)
				setActionStatus("Attaching Sub Investor 2.... txHash:"+res);
				setTxStatus("Attaching Sub Investor 2 - txHash: "+res);
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
				SetIsAddedSub2(true);
				checkNextStepEnabled();

		});
		}else{
			alert("Please input Sub investor 2 Name.");
		}

	}
	const addSubInvestor3AddressToEscrow = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		let subInvestorFundPriceWei = Number(subInvestorAmount)*1000000000000000000;
		console.log("subInvestorFundPriceWei",subInvestorFundPriceWei);

		let tempSubInvestorPercentage  = String(parseFloat(subInvestorPercentage)*100);
		console.log("subInvestorPercentage",tempSubInvestorPercentage);


		if(subinvestorname3){
			escrowBlockchain.smartContract.methods.addSubInvestorsByEscrowAndSubInvestorID(String(escrowID),"2",subinvestorname3,String(subInvestorFundPriceWei),tempSubInvestorPercentage)
			.send({ from: account },function (err:any, res:any) {
				if (err) {
				  console.log("An error occured", err)
				  return
				}
				console.log("Hash of the transaction: " + res)
				setActionStatus("Attaching Sub Investor 3.... txHash:"+res);
				setTxStatus("Attaching Sub Investor 3 - txHash: "+res);
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
				SetIsAddedSub3(true);
				checkNextStepEnabled();


		});
		}else{
			alert("Please input Sub investor 3 Name.");
		}

	}	
	const addSubInvestor4AddressToEscrow = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		let subInvestorFundPriceWei = Number(subInvestorAmount)*1000000000000000000;
		console.log("subInvestorFundPriceWei",subInvestorFundPriceWei);

		let tempSubInvestorPercentage  = String(parseFloat(subInvestorPercentage)*100);
		console.log("subInvestorPercentage",tempSubInvestorPercentage);


		if(subinvestorname4){
			escrowBlockchain.smartContract.methods.addSubInvestorsByEscrowAndSubInvestorID(String(escrowID),"3",subinvestorname4,String(subInvestorFundPriceWei),tempSubInvestorPercentage)
			.send({ from: account },function (err:any, res:any) {
				if (err) {
				  console.log("An error occured", err)
				  return
				}
				console.log("Hash of the transaction: " + res)
				setActionStatus("Attaching Sub Investor 4.... txHash:"+res);
				setTxStatus("Attaching Sub Investor 4 - txHash: "+res);
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
				SetIsAddedSub4(true);
				checkNextStepEnabled();


		});
		}else{
			alert("Please input Sub investor 4 Name.");
		}

	}	
	const addSubInvestor5AddressToEscrow = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();


		let subInvestorFundPriceWei = Number(subInvestorAmount)*1000000000000000000;
		console.log("subInvestorFundPriceWei",subInvestorFundPriceWei);

		let tempSubInvestorPercentage  = String(parseFloat(subInvestorPercentage)*100);
		console.log("subInvestorPercentage",tempSubInvestorPercentage);

		if(subinvestorname5){
			escrowBlockchain.smartContract.methods.addSubInvestorsByEscrowAndSubInvestorID(String(escrowID),"4",subinvestorname5,String(subInvestorFundPriceWei),tempSubInvestorPercentage)
			.send({ from: account },function (err:any, res:any) {
				if (err) {
				  console.log("An error occured", err)
				  return
				}
				console.log("Hash of the transaction: " + res)
				setActionStatus("Attaching Sub Investor 5.... txHash:"+res);
				setTxStatus("Attaching Sub Investor 5 - txHash: "+res);
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
				SetIsAddedSub5(true);
				checkNextStepEnabled();


		});
		}else{
			alert("Please input Sub investor 5 Name.");
		}

	}

	


	const createEscrowAndDepositLeadInvestor = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		// depositFromLeadInvestor();

		let _assetID = String(assetID);


		console.log("leadInvestorName",leadInvestorName);
		console.log("leadInvestorAddress",leadInvestorAddress);
		console.log("leadInvestorPercentage",leadInvestorPercentage);
		console.log("subInvestorCount",subInvestorCount);
		console.log("assetID",_assetID);

		if (isCreateAsset){
			if (leadInvestorAddress) {
				// Create an Escrow
				escrowBlockchain.smartContract.methods.createNewEscrow(String(leadInvestorName),String(leadInvestorAddress),String(leadInvestorPercentage),String(subInvestorCount),String(_assetID))
				.send({ from: account },function (err:any, res:any) {
					if (err) {
					  console.log("An error occured", err)
					  return
					}
					console.log("Hash of the transaction: " + res)
					setActionStatus("Creating Escrow.... txHash:"+res);
					setTxStatus("Creating Escrow - txHash: "+res);
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
					// depositFromLeadInvestor();
					SetIsCreateEscrow(true);
					checkNextStepEnabled();
	
				});
	
				
			} else {
				alert("Please connect wallet.");
				walletconnection();
			}
		} else {
			alert("Please create an asset first.");
		}
	};

	const depositfromSubInvestor1  = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();


		if(isAddedSub1){
			console.log("Escrow Id : ", escrowID);
			let subInvestorFundPriceWei = Number(subInvestorAmount)*1000000000000000000;
			console.log("subInvestorFundPriceWei as wei : ",subInvestorFundPriceWei);
			// Deposit asset
			setActionStatus("Depositing from the sub investor 1....");
	
			const resultString = escrowBlockchain.smartContract.methods.addFundFromSubInvestorByEscrowAndSubinvestorID(String(escrowID),"0")
			.send({value: subInvestorFundPriceWei,
				from: account},function (err:any, res:any) {
					if (err) {
					console.log("An error occured", err)
					return
					}
					console.log("Hash of the transaction: " + res)
					setActionStatus("Depositing from the sub investor 1.... txHash:"+res);
					setTxStatus("Depositing from the sub investor 1 - txHash: "+res);
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
				console.log("Transaction Finished.");      
				alert("Transaction Finished.");
				walletconnection();
				setActionStatus("");
				setTxStatus("Your transactions willl appear here...");
				SetIsDepositedSub1(true);
				checkNextStepEnabled();
	
			});
	
			console.log("Result String : ", resultString);
		} else{
			alert("Please approve sub investor 1 address.");

		}

		

	}
	const depositfromSubInvestor2  = (event: React.MouseEvent<HTMLButtonElement>) => {

		event.preventDefault();

		if (isAddedSub2){
			console.log("Escrow Id : ", escrowID);
			let subInvestorFundPriceWei = Number(subInvestorAmount)*1000000000000000000;
			console.log("subInvestorFundPriceWei as wei : ",subInvestorFundPriceWei);
			// Deposit asset
			setActionStatus("Depositing from the sub investor 2....");
			const resultString = escrowBlockchain.smartContract.methods.addFundFromSubInvestorByEscrowAndSubinvestorID(String(escrowID),"1")
			.send({value: subInvestorFundPriceWei,
				  from: account},function (err:any, res:any) {
					if (err) {
					  console.log("An error occured", err)
					  return
					}
					console.log("Hash of the transaction: " + res)
					setActionStatus("Depositing from the sub investor 2.... txHash:"+res);
					setTxStatus("Depositing from the sub investor 2 - txHash: "+res);
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
			  console.log("Transaction Finished.");      
			  alert("Transaction Finished.");
			  walletconnection();
			  setActionStatus("");
			  setTxStatus("Your transactions willl appear here...");
			  SetIsDepositedSub2(true);
			  checkNextStepEnabled();
	
	
			});
	
			console.log("Result String : ", resultString);
		} else{
			alert("Please approve sub investor 1 address.");

		}


		

	}
	const depositfromSubInvestor3  = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		if (isAddedSub3){
			console.log("Escrow Id : ", escrowID);
			let subInvestorFundPriceWei = Number(subInvestorAmount)*1000000000000000000;
			console.log("subInvestorFundPriceWei as wei : ",subInvestorFundPriceWei);
			// Deposit asset
			setActionStatus("Depositing from the sub investor 3....");
			const resultString = escrowBlockchain.smartContract.methods.addFundFromSubInvestorByEscrowAndSubinvestorID(String(escrowID),"2")
			.send({value: subInvestorFundPriceWei,
				  from: account},function (err:any, res:any) {
					if (err) {
					  console.log("An error occured", err)
					  return
					}
					console.log("Hash of the transaction: " + res)
					setActionStatus("Depositing from the sub investor 3.... txHash:"+res);
					setTxStatus("Depositing from the sub investor 3.... - txHash: "+res);
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
			  console.log("Transaction Finished.");      
			  alert("Transaction Finished.");
			  walletconnection();
			  setActionStatus("");
			  setTxStatus("Your transactions willl appear here...");
			  SetIsDepositedSub3(true);
			  checkNextStepEnabled();
	
	
			});
	
			console.log("Result String : ", resultString);
		} else{
			alert("Please approve sub investor 1 address.");

		}

		

	}
	const depositfromSubInvestor4  = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		if (isAddedSub4){
			console.log("Escrow Id : ", escrowID);
			let subInvestorFundPriceWei = Number(subInvestorAmount)*1000000000000000000;
			console.log("subInvestorFundPriceWei as wei : ",subInvestorFundPriceWei);
			// Deposit asset
			setActionStatus("Depositing from the sub investor 4....");
			const resultString = escrowBlockchain.smartContract.methods.addFundFromSubInvestorByEscrowAndSubinvestorID(String(escrowID),"3")
			.send({value: subInvestorFundPriceWei,
				  from: account},function (err:any, res:any) {
					if (err) {
					  console.log("An error occured", err)
					  return
					}
					console.log("Hash of the transaction: " + res)
					setActionStatus("Depositing from the sub investor 4.... txHash:"+res);
					setTxStatus("Depositing from the sub investor 4 - txHash: "+res);
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
			  console.log("Transaction Finished.");      
			  alert("Transaction Finished.");
			  walletconnection();
			  setActionStatus("");
			  setTxStatus("Your transactions willl appear here...");
			  SetIsDepositedSub4(true);
			  checkNextStepEnabled();
	
	
			});
	
			console.log("Result String : ", resultString);
		} else{
			alert("Please approve sub investor 1 address.");

		}

		

	}
	const depositfromSubInvestor5  = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		if (isAddedSub5){
			console.log("Escrow Id : ", escrowID);
			let subInvestorFundPriceWei = Number(subInvestorAmount)*1000000000000000000;
			console.log("subInvestorFundPriceWei as wei : ",subInvestorFundPriceWei);
			// Deposit asset
			setActionStatus("Depositing from the sub investor 5....");
			const resultString = escrowBlockchain.smartContract.methods.addFundFromSubInvestorByEscrowAndSubinvestorID(String(escrowID),"4")
			.send({value: subInvestorFundPriceWei,
				  from: account},function (err:any, res:any) {
					if (err) {
					  console.log("An error occured", err)
					  return
					}
					console.log("Hash of the transaction: " + res)
					setActionStatus("Depositing from the sub investor 5.... txHash:"+res);
					setTxStatus("Depositing from the sub investor 5 - txHash: "+res);
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
			  console.log("Transaction Finished.");      
			  alert("Transaction Finished.");
			  walletconnection();
			  setActionStatus("");
			  setTxStatus("Your transactions willl appear here...");
			  SetIsDepositedSub5(true);
			  checkNextStepEnabled();
	
	
			});
	
			console.log("Result String : ", resultString);
	
		} else{
			alert("Please approve sub investor 1 address.");

		}

		
	}	

	const depositFromLeadInvestor = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	// const depositFromLeadInvestor = () => {

		console.log("Escrow Id : ", escrowID);
		let leadInvestorFundPriceWei = Number(leadInvestorAmount)*1000000000000000000;
		console.log("leadInvestorFundPriceWei as wei : ",leadInvestorFundPriceWei);
		// Deposit asset
		setActionStatus("Depositing from the lead investor....");
        const resultString = escrowBlockchain.smartContract.methods.addFundFromLeadInvestorByEscrowID(String(escrowID))
        .send({value: leadInvestorFundPriceWei,
              from: account},function (err:any, res:any) {
				if (err) {
				  console.log("An error occured", err)
				  return
				}
				console.log("Hash of the transaction: " + res)
                setActionStatus("Depositing from the lead investor.... txHash:"+res);
				setTxStatus("Depositing from the lead investor - txHash: "+res);
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
          console.log("Transaction Finished. The lead investor deposited fund.");      
          alert("Transaction Finished.");
          walletconnection();
          setActionStatus("");
          setTxStatus("Your transactions willl appear here...");
		  SetIsDepositLead(true);
		  checkNextStepEnabled();

        });

        console.log("Result String : ", resultString);
	}

	const [actionStatus, setActionStatus] = useState('');
	
	const onLeadInvestorAmount = (e: ChangeEvent<HTMLInputElement>): void => {
		// SetLeadInvestorAmount(e.target.value);
	}

	
	const onBackHomeHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		history.push("/step1");
	}
	const onNextStepHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		history.push("/step3");
	}
	const onEmptyHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	}

	const checkNextStepEnabled = () => {
		switch(parseInt(subInvestorCount)) {
			case 0:
			{
				if (isCreateAsset && isCreateEscrow && isDepositLead){
					SetNextStepEnabled(true);
				} else {
					SetNextStepEnabled(false);
				}
				break;
			}
			case 1: 
			{
				if (isCreateAsset && isCreateEscrow && isDepositLead && 
					isAddedSub1 && isDepositedSub1){
					SetNextStepEnabled(true);
				} else {
					SetNextStepEnabled(false);
				}
				break;
			}
			case 2: 
			{
				if (isCreateAsset && isCreateEscrow && isDepositLead && 
					isAddedSub1 && isDepositedSub1 && 
					isAddedSub2 && isDepositedSub2){
					SetNextStepEnabled(true);
				} else {
					SetNextStepEnabled(false);
				}
				break;
			}
			case 3: 
			{
				if (isCreateAsset && isCreateEscrow && isDepositLead && 
					isAddedSub1 && isDepositedSub1 && 
					isAddedSub2 && isDepositedSub2 && 
					isAddedSub3 && isDepositedSub3){
					SetNextStepEnabled(true);
				} else {
					SetNextStepEnabled(false);
				}
				break;
			}
			case 4: 
			{
				if (isCreateAsset && isCreateEscrow && isDepositLead && 
					isAddedSub1 && isDepositedSub1 && 
					isAddedSub2 && isDepositedSub2 && 
					isAddedSub3 && isDepositedSub3 && 
					isAddedSub4 && isDepositedSub4){
					SetNextStepEnabled(true);
				} else {
					SetNextStepEnabled(false);
				}
				break;
			}
			case 5: 
			{
				if (isCreateAsset && isCreateEscrow && isDepositLead && 
					isAddedSub1 && isDepositedSub1 && 
					isAddedSub2 && isDepositedSub2 && 
					isAddedSub3 && isDepositedSub3 && 
					isAddedSub4 && isDepositedSub4 &&
					isAddedSub5 && isDepositedSub5){
					SetNextStepEnabled(true);
				} else {
					SetNextStepEnabled(false);
				}
				break;
			}
			default:
				{
					SetNextStepEnabled(false);
					break;
				}
			}
	}



	useEffect(() => {

		checkNextStepEnabled();
		switch(walletType) {
			case 0:
				{

					break;
				}
			case 1: // Lead Investor Account
				{
					// set lead investor address
					console.log("Lead Investor address : ", account);
					SetLeadInvestorAddress(account);
					break;
				}			
			case 2: // Sub Investor 1 Account
				{
					// set sub investor 1 address
					console.log("Sub Investor 1 address : ", account);
					SetSubInvestor1Address(account);
					break;
				}			
			case 3: // Sub Investor 2 Account
				{
					// set sub investor 2 address
					console.log("Sub Investor 2 address : ", account);
					SetSubInvestor2Address(account);
					break;
				}			
			case 4: // Sub Investor 3 Account
				{
					// set sub investor 3 address
					console.log("Sub Investor 3 address : ", account);
					SetSubInvestor3Address(account);
					break;
				}			
			case 5: // Sub Investor 4 Account
				{
					// set sub investor 4 address
					console.log("Sub Investor 4 address : ", account);
					SetSubInvestor4Address(account);
					break;
				}			
			case 6: // Sub Investor 5 Account
				{
					// set sub investor 5 address
					console.log("Sub Investor 5 address : ", account);
					SetSubInvestor5Address(account);
					break;
				}	
			case 7: // Seller Account
				{
					// set Seller address
					console.log("Seller address : ", account);
					SetSellerAddress(account);
					break;
				}		
			default:
				{
					break;
				}
		}

		SetWalletType(0);


	}, [account,walletType])

	useEffect(() => {	
		checkNextStepEnabled();
	
		if(assetsArray){
			if(assetsArray.length != 0){
				console.log("Asset Array Length : ", assetsArray.length);
				let lastAssetValue = assetsArray[assetsArray.length-1];
				console.log("Asset Information : ", lastAssetValue);
				SetAssetID(lastAssetValue['assetID']);
			}else {
				SetAssetID(0);
			}			
		}else{
			SetAssetID(0);
		}
		
	}, [assetsArray])

	useEffect(() => {
		checkNextStepEnabled();
		
		if(escrowArray){
			if(escrowArray.length != 0 ) {
				console.log("Escrow Array Length : ", escrowArray);
				console.log("Escrow Array Length : ", escrowArray.length);
				let lastEscrowValue = escrowArray[escrowArray.length-1];
				console.log("Escrow Information : ", lastEscrowValue);
				console.log("Escrow Information - Escrow ID : ", lastEscrowValue['escrowID']);
				SetEscrowID(lastEscrowValue['escrowID']);

				SetFundedAmount(String(parseFloat(lastEscrowValue['fundedAmount'])/1000000000000000000));

			} else {
				SetEscrowID(0);
				SetFundedAmount('0');

			}
		}else{
			SetEscrowID(0);
		}
		
	}, [escrowArray])


	useEffect(() => {
		checkNextStepEnabled();

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

	}, [subInvestorCount])

	return (

		<section id="section" className="section">

			<div className="section__header pt-3">
				<StyledBackContainer>
					<button type="button" onClick={onBackHomeHandler} className="btn btn-primary mb-1">Step 1</button>
					{nextStepEnabled ?
                        <>
                            <StyledNextStepButton type="button" onClick={onNextStepHandler} className="btn btn-primary mb-1">Step 3</StyledNextStepButton>
                        </>
                        :
                        <>
        					<StyledNextStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Step 3</StyledNextStepButton>
                        </>
                    }											
				</StyledBackContainer>
				<StyledHeaderTitle className="mb-0">Deposit & Approve</StyledHeaderTitle>

				<div className="container-fluid">
					<div className="row">
						<div className="col">
							<StyledHeaderDiv0>
								<StyledHeaderDiv1>
									<label className="w-100 mb-3">
										<p className="form-label">NOTES:</p>
										<p className="form-label">1) Seller name outputs from Step 1.</p>
										<p className="form-label">2) Cost of asset outputs from Step 1.</p>
										<p className="form-label">3) Lead investor name outputs from Step 1.</p>
										<p className="form-label">4) Maximum sub investors N=5 from Step 1.</p>
										<p className="form-label">5) Lead amount to escrow= cost of asset*Lead investment percentage from Step 1.</p>
										<p className="form-label">6) Sub amount to escrow=(cost of asset-lead amount to escrow)/N.</p>
									</label>							
									<label className="w-100 mb-3">
										<p className="form-label">LOGIC:</p>
										<p className="form-label">1) Once all wallets are attached and approved, then funds flow to escrow wallet.</p>
									</label>	
								</StyledHeaderDiv1>
								<StyledHeaderTitle2 className="mb-0">Connected 	Address : {account}</StyledHeaderTitle2>

								{isCreateEscrow ?
									<>
										<StyledHeaderTitle2 className="mb-0">Escrow Amount : {fundedAmount}</StyledHeaderTitle2>
									</>
									:
									<>
									</>
								}
								
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
											<span className="form-label">Address : {leadInvestorAddress}</span> <br/>
											<span className="form-label">Name : {leadInvestorName}</span> <br/>
											<span className="form-label">Amount to Escrow (ETH) :</span>
											<input type="text" placeholder="name" className="form-control" onChange={onLeadInvestorAmount} value={leadInvestorAmount} disabled/>
										</StyledSubFormLabel>										
									</StyledSubFormInnerContentDiv>
									<StyledSubFormInnerDiv>
										<div className="text-right">
											{isCreateEscrow ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Attach Lead Wallet</StyledStepButton>
														</>
														:
														<>
															<LeadInvestorWalletConBtn handleOpenModal={onOpen} setWalletType={SetWalletType} walletType={walletType} walletconnection={walletconnection} />
														</>
											}
											{isCreateEscrow ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={createEscrowAndDepositLeadInvestor} className="btn btn-primary mb-1">Approve</StyledStepButton>
														</>
											}
											{isDepositLead ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Deposited ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={depositFromLeadInvestor} className="btn btn-primary mb-1">Deposit</StyledStepButton>
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
													<span className="form-label">Address : {SubInvestor1Address}</span> <br/>
													<span className="form-label">Name : </span> <br/>
													<input type="text" placeholder="name" className="form-control" onChange={onSubInvestor1Address} value={subinvestorname1}/>
													<span className="form-label">Amount to Escrow (ETH) : {subInvestorAmount}</span>
												</StyledSubFormLabel>
											</StyledSubFormInnerContentDiv>
											<StyledSubFormInnerDiv>
												<div className="text-right">
													{isAddedSub1 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Attach Sub 1 Wallet</StyledStepButton>
														</>
														:
														<>
															<SubInvestor1WalletConBtn handleOpenModal={onOpen} setWalletType={SetWalletType} walletType={walletType} walletconnection={walletconnection} />
														</>
													}
													{isAddedSub1 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={addSubInvestor1AddressToEscrow} className="btn btn-primary mb-1">Approve</StyledStepButton>
														</>
													}
													{isDepositedSub1 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Deposited ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={depositfromSubInvestor1} className="btn btn-primary mb-1">Deposit</StyledStepButton>
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
													<span className="form-label">Address : {SubInvestor1Address}</span> <br/>
													<span className="form-label">Name : </span> <br/>
													<input type="text" placeholder="name" className="form-control" onChange={onSubInvestor1Address} value={subinvestorname1}/>
													<span className="form-label">Amount to Escrow (ETH) : {subInvestorAmount}</span>
												</StyledSubFormLabel>
											</StyledSubFormInnerContentDiv>
											<StyledSubFormInnerDiv>
												<div className="text-right">
													{isAddedSub1 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Attach Sub 1 Wallet</StyledStepButton>
														</>
														:
														<>
															<SubInvestor1WalletConBtn handleOpenModal={onOpen} setWalletType={SetWalletType} walletType={walletType} walletconnection={walletconnection} />
														</>
													}
													{isAddedSub1 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={addSubInvestor1AddressToEscrow} className="btn btn-primary mb-1">Approve</StyledStepButton>
														</>
													}
													{isDepositedSub1 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Deposited ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={depositfromSubInvestor1} className="btn btn-primary mb-1">Deposit</StyledStepButton>
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
													<span className="form-label">Address : {SubInvestor2Address}</span> <br/>
													<span className="form-label">Name : </span> <br/>
													<input type="text" placeholder="name" className="form-control" onChange={onSubInvestor2Address} value={subinvestorname2}/>
													<span className="form-label">Amount to Escrow (ETH) : {subInvestorAmount}</span>
												</StyledSubFormLabel>
											</StyledSubFormInnerContentDiv>
											<StyledSubFormInnerDiv>
												<div className="text-right">
													{isAddedSub2 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Attach Sub 2 Wallet</StyledStepButton>
														</>
														:
														<>
															<SubInvestor2WalletConBtn handleOpenModal={onOpen} setWalletType={SetWalletType} walletType={walletType} walletconnection={walletconnection} />
														</>
													}
													{isAddedSub2 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={addSubInvestor2AddressToEscrow} className="btn btn-primary mb-1">Approve</StyledStepButton>
														</>
													}
													{isDepositedSub2 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Deposited ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={depositfromSubInvestor2} className="btn btn-primary mb-1">Deposit</StyledStepButton>
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
													<span className="form-label">Address : {SubInvestor1Address}</span> <br/>
													<span className="form-label">Name : </span> <br/>
													<input type="text" placeholder="name" className="form-control" onChange={onSubInvestor1Address} value={subinvestorname1}/>
													<span className="form-label">Amount to Escrow (ETH) : {subInvestorAmount}</span>
												</StyledSubFormLabel>
											</StyledSubFormInnerContentDiv>
											<StyledSubFormInnerDiv>
												<div className="text-right">
													{isAddedSub1 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Attach Sub 1 Wallet</StyledStepButton>
														</>
														:
														<>
															<SubInvestor1WalletConBtn handleOpenModal={onOpen} setWalletType={SetWalletType} walletType={walletType} walletconnection={walletconnection} />
														</>
													}
													{isAddedSub1 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={addSubInvestor1AddressToEscrow} className="btn btn-primary mb-1">Approve</StyledStepButton>
														</>
													}
													{isDepositedSub1 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Deposited ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={depositfromSubInvestor1} className="btn btn-primary mb-1">Deposit</StyledStepButton>
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
													<span className="form-label">Address : {SubInvestor2Address}</span> <br/>
													<span className="form-label">Name : </span> <br/>
													<input type="text" placeholder="name" className="form-control" onChange={onSubInvestor2Address} value={subinvestorname2}/>
													<span className="form-label">Amount to Escrow (ETH) : {subInvestorAmount}</span>
												</StyledSubFormLabel>
											</StyledSubFormInnerContentDiv>
											<StyledSubFormInnerDiv>
												<div className="text-right">
													{isAddedSub2 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Attach Sub 2 Wallet</StyledStepButton>
														</>
														:
														<>
															<SubInvestor2WalletConBtn handleOpenModal={onOpen} setWalletType={SetWalletType} walletType={walletType} walletconnection={walletconnection} />
														</>
													}
													{isAddedSub2 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={addSubInvestor2AddressToEscrow} className="btn btn-primary mb-1">Approve</StyledStepButton>
														</>
													}
													{isDepositedSub2 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Deposited ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={depositfromSubInvestor2} className="btn btn-primary mb-1">Deposit</StyledStepButton>
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
													<span className="form-label">Address : {SubInvestor3Address}</span> <br/>
													<span className="form-label">Name : </span> <br/>
													<input type="text" placeholder="name" className="form-control" onChange={onSubInvestor3Address} value={subinvestorname3}/>
													<span className="form-label">Amount to Escrow (ETH) : {subInvestorAmount}</span>
												</StyledSubFormLabel>
											</StyledSubFormInnerContentDiv>
											<StyledSubFormInnerDiv>
												<div className="text-right">
													{isAddedSub3 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Attach Sub 3 Wallet</StyledStepButton>
														</>
														:
														<>
															<SubInvestor3WalletConBtn handleOpenModal={onOpen} setWalletType={SetWalletType} walletType={walletType} walletconnection={walletconnection} />
														</>
													}
													{isAddedSub3 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={addSubInvestor3AddressToEscrow} className="btn btn-primary mb-1">Approve</StyledStepButton>
														</>
													}
													{isDepositedSub3 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Deposited ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={depositfromSubInvestor3} className="btn btn-primary mb-1">Deposit</StyledStepButton>
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
													<span className="form-label">Address : {SubInvestor1Address}</span> <br/>
													<span className="form-label">Name : </span> <br/>
													<input type="text" placeholder="name" className="form-control" onChange={onSubInvestor1Address} value={subinvestorname1}/>
													<span className="form-label">Amount to Escrow (ETH) : {subInvestorAmount}</span>
												</StyledSubFormLabel>
											</StyledSubFormInnerContentDiv>
											<StyledSubFormInnerDiv>
												<div className="text-right">
													{isAddedSub1 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Attach Sub 1 Wallet</StyledStepButton>
														</>
														:
														<>
															<SubInvestor1WalletConBtn handleOpenModal={onOpen} setWalletType={SetWalletType} walletType={walletType} walletconnection={walletconnection} />
														</>
													}
													{isAddedSub1 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={addSubInvestor1AddressToEscrow} className="btn btn-primary mb-1">Approve</StyledStepButton>
														</>
													}
													{isDepositedSub1 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Deposited ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={depositfromSubInvestor1} className="btn btn-primary mb-1">Deposit</StyledStepButton>
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
													<span className="form-label">Address : {SubInvestor2Address}</span> <br/>
													<span className="form-label">Name : </span> <br/>
													<input type="text" placeholder="name" className="form-control" onChange={onSubInvestor2Address} value={subinvestorname2}/>
													<span className="form-label">Amount to Escrow (ETH) : {subInvestorAmount}</span>
												</StyledSubFormLabel>
											</StyledSubFormInnerContentDiv>
											<StyledSubFormInnerDiv>
												<div className="text-right">
													{isAddedSub2 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Attach Sub 2 Wallet</StyledStepButton>
														</>
														:
														<>
															<SubInvestor2WalletConBtn handleOpenModal={onOpen} setWalletType={SetWalletType} walletType={walletType} walletconnection={walletconnection} />
														</>
													}
													{isAddedSub2 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={addSubInvestor2AddressToEscrow} className="btn btn-primary mb-1">Approve</StyledStepButton>
														</>
													}
													{isDepositedSub2 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Deposited ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={depositfromSubInvestor2} className="btn btn-primary mb-1">Deposit</StyledStepButton>
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
													<span className="form-label">Address : {SubInvestor3Address}</span> <br/>
													<span className="form-label">Name : </span> <br/>
													<input type="text" placeholder="name" className="form-control" onChange={onSubInvestor3Address} value={subinvestorname3}/>
													<span className="form-label">Amount to Escrow (ETH) : {subInvestorAmount}</span>
												</StyledSubFormLabel>
											</StyledSubFormInnerContentDiv>
											<StyledSubFormInnerDiv>
												<div className="text-right">
													{isAddedSub3 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Attach Sub 3 Wallet</StyledStepButton>
														</>
														:
														<>
															<SubInvestor3WalletConBtn handleOpenModal={onOpen} setWalletType={SetWalletType} walletType={walletType} walletconnection={walletconnection} />
														</>
													}
													{isAddedSub3 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={addSubInvestor3AddressToEscrow} className="btn btn-primary mb-1">Approve</StyledStepButton>
														</>
													}
													{isDepositedSub3 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Deposited ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={depositfromSubInvestor3} className="btn btn-primary mb-1">Deposit</StyledStepButton>
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
													<span className="form-label">Address : {SubInvestor4Address}</span> <br/>
													<span className="form-label">Name : </span> <br/>
													<input type="text" placeholder="name" className="form-control" onChange={onSubInvestor4Address} value={subinvestorname4}/>
													<span className="form-label">Amount to Escrow (ETH) : {subInvestorAmount}</span>
												</StyledSubFormLabel>
											</StyledSubFormInnerContentDiv>
											<StyledSubFormInnerDiv>
												<div className="text-right">
													{isAddedSub4 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Attach Sub 4 Wallet</StyledStepButton>
														</>
														:
														<>
															<SubInvestor4WalletConBtn handleOpenModal={onOpen} setWalletType={SetWalletType} walletType={walletType} walletconnection={walletconnection} />
														</>
													}
													{isAddedSub4 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={addSubInvestor4AddressToEscrow} className="btn btn-primary mb-1">Approve</StyledStepButton>
														</>
													}
													{isDepositedSub4 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Deposited ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={depositfromSubInvestor4} className="btn btn-primary mb-1">Deposit</StyledStepButton>
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
													<span className="form-label">Address : {SubInvestor1Address}</span> <br/>
													<span className="form-label">Name : </span> <br/>
													<input type="text" placeholder="name" className="form-control" onChange={onSubInvestor1Address} value={subinvestorname1}/>
													<span className="form-label">Amount to Escrow (ETH) : {subInvestorAmount}</span>
												</StyledSubFormLabel>
											</StyledSubFormInnerContentDiv>
											<StyledSubFormInnerDiv>
												<div className="text-right">
													{isAddedSub1 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Attach Sub 1 Wallet</StyledStepButton>
														</>
														:
														<>
															<SubInvestor1WalletConBtn handleOpenModal={onOpen} setWalletType={SetWalletType} walletType={walletType} walletconnection={walletconnection} />
														</>
													}
													{isAddedSub1 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={addSubInvestor1AddressToEscrow} className="btn btn-primary mb-1">Approve</StyledStepButton>
														</>
													}
													{isDepositedSub1 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Deposited ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={depositfromSubInvestor1} className="btn btn-primary mb-1">Deposit</StyledStepButton>
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
													<span className="form-label">Address : {SubInvestor2Address}</span> <br/>
													<span className="form-label">Name : </span> <br/>
													<input type="text" placeholder="name" className="form-control" onChange={onSubInvestor2Address} value={subinvestorname2}/>
													<span className="form-label">Amount to Escrow (ETH) : {subInvestorAmount}</span>
												</StyledSubFormLabel>
											</StyledSubFormInnerContentDiv>
											<StyledSubFormInnerDiv>
												<div className="text-right">
													{isAddedSub2 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Attach Sub 2 Wallet</StyledStepButton>
														</>
														:
														<>
															<SubInvestor2WalletConBtn handleOpenModal={onOpen} setWalletType={SetWalletType} walletType={walletType} walletconnection={walletconnection} />
														</>
													}
													{isAddedSub2 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={addSubInvestor2AddressToEscrow} className="btn btn-primary mb-1">Approve</StyledStepButton>
														</>
													}
													{isDepositedSub2 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Deposited ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={depositfromSubInvestor2} className="btn btn-primary mb-1">Deposit</StyledStepButton>
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
													<span className="form-label">Address : {SubInvestor3Address}</span> <br/>
													<span className="form-label">Name : </span> <br/>
													<input type="text" placeholder="name" className="form-control" onChange={onSubInvestor3Address} value={subinvestorname3}/>
													<span className="form-label">Amount to Escrow (ETH) : {subInvestorAmount}</span>
												</StyledSubFormLabel>
											</StyledSubFormInnerContentDiv>
											<StyledSubFormInnerDiv>
												<div className="text-right">
													{isAddedSub3 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Attach Sub 3 Wallet</StyledStepButton>
														</>
														:
														<>
															<SubInvestor3WalletConBtn handleOpenModal={onOpen} setWalletType={SetWalletType} walletType={walletType} walletconnection={walletconnection} />
														</>
													}
													{isAddedSub3 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={addSubInvestor3AddressToEscrow} className="btn btn-primary mb-1">Approve</StyledStepButton>
														</>
													}
													{isDepositedSub3 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Deposited ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={depositfromSubInvestor3} className="btn btn-primary mb-1">Deposit</StyledStepButton>
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
													<span className="form-label">Address : {SubInvestor4Address}</span> <br/>
													<span className="form-label">Name : </span> <br/>
													<input type="text" placeholder="name" className="form-control" onChange={onSubInvestor4Address} value={subinvestorname4}/>
													<span className="form-label">Amount to Escrow (ETH) : {subInvestorAmount}</span>
												</StyledSubFormLabel>
											</StyledSubFormInnerContentDiv>
											<StyledSubFormInnerDiv>
												<div className="text-right">
													{isAddedSub4 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Attach Sub 4 Wallet</StyledStepButton>
														</>
														:
														<>
															<SubInvestor4WalletConBtn handleOpenModal={onOpen} setWalletType={SetWalletType} walletType={walletType} walletconnection={walletconnection} />
														</>
													}
													{isAddedSub4 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={addSubInvestor4AddressToEscrow} className="btn btn-primary mb-1">Approve</StyledStepButton>
														</>
													}
													{isDepositedSub4 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Deposited ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={depositfromSubInvestor4} className="btn btn-primary mb-1">Deposit</StyledStepButton>
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
													<span className="form-label">Address : {SubInvestor5Address}</span> <br/>
													<span className="form-label">Name : </span> <br/>
													<input type="text" placeholder="name" className="form-control" onChange={onSubInvestor5Address} value={subinvestorname5}/>
													<span className="form-label">Amount to Escrow (ETH) : {subInvestorAmount}</span>
												</StyledSubFormLabel>
											</StyledSubFormInnerContentDiv>
											<StyledSubFormInnerDiv>
												<div className="text-right">
													{isAddedSub5 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Attach Sub 5 Wallet</StyledStepButton>
														</>
														:
														<>
															<SubInvestor5WalletConBtn handleOpenModal={onOpen} setWalletType={SetWalletType} walletType={walletType} walletconnection={walletconnection} />
														</>
													}
													{isAddedSub5 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Approved ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={addSubInvestor5AddressToEscrow} className="btn btn-primary mb-1">Approve</StyledStepButton>
														</>
													}
													{isDepositedSub5 ?
														<>
															<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Deposited ✅</StyledStepButton>
														</>
														:
														<>
															<StyledStepButton type="button" onClick={depositfromSubInvestor5} className="btn btn-primary mb-1">Deposit</StyledStepButton>
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
											<span className="form-label">Address : {SellerAddress}</span> <br/>
											<span className="form-label">Cost of asset (ETH) : {costofasset}</span>
										</StyledSubFormLabel>										
									</StyledSubFormInnerContentDiv>
									<StyledSubFormInnerDiv>
										<div className="text-right">
											{isCreateAsset ?
												<>
													<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Attach Seller Wallet1</StyledStepButton>
												</>
												:
												<>
													<SellerWalletConBtn handleOpenModal={onOpen} setWalletType={SetWalletType} walletType={walletType} walletconnection={walletconnection} />
												</>
											}
											{isCreateAsset ?
												<>
													<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Asset Created ✅</StyledStepButton>
												</>
												:
												<>
													<StyledStepButton type="button" onClick={createNewAsset} className="btn btn-primary mb-1">Create Asset</StyledStepButton>
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


export default Step2page
