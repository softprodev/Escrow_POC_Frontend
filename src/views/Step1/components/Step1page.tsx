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
const StyledStepButton = styled.button`    
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

	countOfSubInvestors: string;
	SetCountOFSubInvestors: (countOfSubInvestors: string) => void;	

	sellerName: string;
	SetSellerName: (sellerName: string) => void;	

	costOfAsset: string;
	SetCostOfAsset: (costOfAsset: string) => void;	
}
const Step1page: React.FC<Props> = ({ escrowBlockchain, account, actionEnabled, walletconnection, 
	assetsArray,escrowArray,
	txStatus, setTxStatus, 
	leadInvestorName, SetLeadInvestorName,
	leadInvestorPercentage, SetLeadInvestorPercentage,
	countOfSubInvestors, SetCountOFSubInvestors,
	sellerName, SetSellerName,
	costOfAsset, SetCostOfAsset
}) => {

    const [nextStepEnabled, SetNextStepEnabled] = useState(false);
	

	const onLeadInvestorName = (e: ChangeEvent<HTMLInputElement>): void => {
		SetLeadInvestorName(e.target.value);
	}
	const onLeadInvestorPercentage = (e: ChangeEvent<HTMLInputElement>): void => {
		SetLeadInvestorPercentage(e.target.value);
	}
	const onCountOfSubInvestors = (e: ChangeEvent<HTMLInputElement>): void => {
		SetCountOFSubInvestors(e.target.value);
	}
	const onSellerName = (e: ChangeEvent<HTMLInputElement>): void => {
		SetSellerName(e.target.value);
	}
	const onCostOfAsset = (e: ChangeEvent<HTMLInputElement>): void => {
		SetCostOfAsset(e.target.value);
	}

	const { isOpen, onOpen, onClose } = useDisclosure();
	const history = useHistory();

	const onBackHomeHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		history.push("/");
	}
	const onNextStepHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		
		history.push("/step2");
	}

	const onGotoStep2 = () => {
		history.push("/step2");
	}
	const onEmptyHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	}

	const createAssetsAndEscrowHandler = (event: React.MouseEvent<HTMLButtonElement>) => {

		event.preventDefault();
		CheckValidation();
	};

	const CheckValidation = () => {
		SetNextStepEnabled(false);
		// call - createNewAsset and createNewEscrow
		if (account) {
			console.log("Step 1 check validation");
			if (leadInvestorName){

				// check investor percentage is number or not
				if (!isNaN(parseInt(leadInvestorPercentage))){
					// lead investor percentage is number

					// check range from 1~100
					if ((parseInt(leadInvestorPercentage) >0) && (parseInt(leadInvestorPercentage) <= 100)){
						// lead investor percentage is number
						
							// check count of sub investor is number or not
							if (!isNaN(parseInt(countOfSubInvestors))){
								// count of sub investors is number

								// check range from 0~5
								if ((parseInt(countOfSubInvestors) >= 0) && (parseInt(countOfSubInvestors) <= 5)){
									// count of sub investors is number
									// if the count of sub investors  == 0 
									// check if the lead investor percentage is 100%. or update it 100% automatically.
									if (parseInt(countOfSubInvestors) == 0){

										if(parseInt(leadInvestorPercentage) == 100){

										}else{
											alert("Lead investor percentage must be 100% in the case of <Count of Sub Investor = 0>.");
											SetLeadInvestorPercentage('100');
											return;
										}

									}else{
									}

									// check seller name 
									if (sellerName){
										// check cost of asset
										if (!isNaN(parseInt(costOfAsset))){
											// cost of asset is number
						
											// check range from 1~100
											if (parseFloat(costOfAsset) >0){
												// all field checked
												console.log("cost of asset : ",costOfAsset);

												let assetPriceWei = Number(costOfAsset)*1000000000000000000;
												console.log("cost of asset as wei : ",assetPriceWei);

												createAssetsAndEscrow(leadInvestorName,parseFloat(leadInvestorPercentage),parseInt(countOfSubInvestors),sellerName,assetPriceWei);

											}else {
												alert("Please input valid number. Cost of Asset should be over 0.");
											}
										} else{
											alert("Please input valid number.");
										}

									} else {
										alert("Please input the seller name.");
									}

								} else{
									// lead investor percentage is number
									alert("Please input valid value (0~5).");
								}
							} else{
								// lead investor percentage is not number
								alert("Please input valid number (1~100). ");
							}


					} else{
						// lead investor percentage is number
						alert("Please input valid value (1~100).");
					}
				} else{
					// lead investor percentage is not number
					alert("Please input valid number (1~100). ");
				}
			} else{
				alert("Please input the investor name.");
			}
		} else {
			console.log("Step 1 check validation - connect wallet");
			alert("Please connect wallet.");
			walletconnection();

		}
	}
		
	
	const createAssetsAndEscrow = (_leadInvestorName : string, _leadInvestorPercentage : number, _countOfSubInvestors: number, _sellerName : string, _costOfAsset : number) => {
		alert("Creating an asset.");

		SetNextStepEnabled(true);
		onGotoStep2();


		console.log("asset cost : ", _costOfAsset);

		// escrowBlockchain.smartContract.methods.createNewAsset(_sellerName, String(_costOfAsset))
		// 	.send({ from: account },function (err:any, res:any) {
		// 		if (err) {
		// 		  console.log("An error occured", err)
		// 		  return
		// 		}
		// 		console.log("Hash of the transaction: " + res)
		// 		setActionStatus("Creating Assets.... txHash:"+res);
		// 		setTxStatus("Creating Assets - txHash: "+res);
		// 		// add feature to fetch data from transaction hash
				
		// 	  })
		// 	.once("error", (err: any) => {
		// 		console.log(err);
		// 		console.log("Sorry, something went wrong please try again later.");
		// 		alert("Sorry, something went wrong please try again later.");
		// 		walletconnection();
		// 		setActionStatus("");
		// 		setTxStatus("Your transactions willl appear here...");
		// 	})
		// 	.then((receipt: any) => {
		// 		console.log("Response : ", receipt);
		// 		console.log("Transaction finished.");
		// 		alert("Transaction finished.");
		// 		walletconnection();
		// 		setActionStatus("");
		// 		setTxStatus("Your transactions willl appear here...");
		// 		onGotoStep2();
		// });
	
	}


	const [escrowAssets, setEscrowAssets] = useState('');
	const [actionStatus, setActionStatus] = useState('');


	const addNewSellerHandler = (event: React.MouseEvent<HTMLButtonElement>) => {


		event.preventDefault();
		if (account) {

			if (actionEnabled) {
				var collectedAssets: Array<number> = escrowAssets.split(',').map(function (item) {
					return parseInt(item, 10);
				});


				let isNumberArray: boolean = true;

				for (let arrayItem of collectedAssets) {
					console.log("assets", arrayItem);
					if (isNaN(arrayItem)) {
						isNumberArray = false;
					}
				}

				if (isNumberArray) {
					// if (escrowID === "") {
					// 	alert("Please select Escrow ID.");
					// } else {
						if (collectedAssets) {
							addNewSeller(collectedAssets);
						} else {
							alert("Please input assets by comma separated.");
						}
					// }
				} else {
					alert("Please input valid numbers as assets");
				}
			} else {
				alert("Please connect wallet.");
			}
		} else {
			walletconnection();
		}

	};
	
	
	const addNewSeller = (collectedAssets: Array<Number>) => {

		setActionStatus("Collecting Assets....");

		escrowBlockchain.smartContract.methods.addProvider(collectedAssets)
			.send({ from: account },function (err:any, res:any) {
				if (err) {
				  console.log("An error occured", err)
				  return
				}
				console.log("Hash of the transaction: " + res)
				setActionStatus("Collecting Assets.... txHash:"+res);
				setTxStatus("Collecting Assets - txHash: "+res);


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
		});

		// escrowBlockchain.smartContract.methods.addProvider(escrowID, collectedAssets)
			// .send({ from: account }, function (err:any, res:any) {
			// 	if (err) {
			// 	  console.log("An error occured", err)
			// 	  return
			// 	}
			// 	console.log("Hash of the transaction: " + res)
			// 	setActionStatus("Collecting Assets.... txHash:"+res);
			// 	setTxStatus("Collecting Assets - txHash: "+res);
			//   })
			// .on('error', function(error: any){ 
			// 	console.log(error);
			// 	console.log("Sorry, something went wrong please try again later.");
			// 	alert("Sorry, something went wrong please try again later.");
			// 	walletconnection();
			// 	setActionStatus("");
			// 	setTxStatus("Your transactions willl appear here...");
			// 	console.log("testing on : error : ",error) 
			// })
			// .on('transactionHash', function(transactionHash: any){ console.log("testing on : transactionHash : ",transactionHash) })
			// .on('receipt', function(receipt: any){
			//    console.log(receipt.contractAddress) // contains the new contract address
			// })
			// .on('confirmation', function(confirmationNumber: any, receipt: any){ 
			// 	console.log("testing on : confirmationNumber : ",confirmationNumber); 
			// 	console.log("testing on : receipt : ",receipt); 
			//  })
			// .then((receipt: any) => {
			// 	console.log("Response : ", receipt);
			// 	console.log("Transaction finished.");
			// 	alert("Transaction finished.");
			// 	walletconnection();
			// 	setActionStatus("");
			// 	setTxStatus("Your transactions willl appear here...");
			// });
	}
	

	// useEffect(() => {

	// 	if (activeProducerArray) {
	// 		let _assetsFunded: number = 0;
	// 		let _assetsRedeemed: number = 0;
	// 		let _escrowOutstanding: number = 0;
	// 		let _totalRebateReceived: number = 0;


	// 		activeProviderArray.map((providerInfo: any) => {

	// 			if (providerInfo['provider'] == account) {
	// 				_assetsRedeemed = _assetsRedeemed + (parseInt(providerInfo['quantity']))
	// 				_totalRebateReceived = _totalRebateReceived + (parseInt(providerInfo['redeemedAmount']) / 1000000000000000000)
	// 			}
	// 		});

	// 		setAssetsFunded(String(_assetsFunded.toFixed(0)));
	// 		setAssetsRedeemed(String(_assetsRedeemed.toFixed(0)));
	// 		setEscrowOutstanding(String(_escrowOutstanding.toFixed(5)));
	// 		setTotalRebateReceived(String(_totalRebateReceived.toFixed(5)));
	// 	} else {
	// 		setAssetsFunded("0");
	// 		setAssetsRedeemed("0");
	// 		setEscrowOutstanding("0");
	// 		setTotalRebateReceived("0");
	// 	}

	// }, [activeProviderArray, account, activeProducerArray])

	return (

		<section id="section" className="section">

			<div className="section__header pt-3">
				<StyledBackContainer>
					<button type="button" onClick={onBackHomeHandler} className="btn btn-primary mb-1">Home</button>
					{nextStepEnabled ?
                        <>
                            <StyledStepButton type="button" onClick={onNextStepHandler} className="btn btn-primary mb-1">Step 2</StyledStepButton>
                        </>
                        :
                        <>
        					<StyledStepButton disabled type="button" onClick={onEmptyHandler} className="btn btn-primary mb-1">Step 2</StyledStepButton>
                        </>
                    }											
				</StyledBackContainer>
				<StyledHeaderTitle className="mb-0">Configuration transaction</StyledHeaderTitle>

				<div className="container-fluid">
					<div className="row">
						<div className="col">
							<StyledHeaderDiv0>
								<StyledHeaderDiv1>
									<label className="w-100 mb-3">
										<p className="form-label">NOTES:</p>
										<p className="form-label">1) All outlined boxes are required inputs from the user.</p>
									</label>							
									<label className="w-100 mb-3">
										<p className="form-label">LOGIC:</p>
										<p className="form-label">2) Once all boxes are complete, move to the next page.</p>
									</label>
								</StyledHeaderDiv1>
								<StyledHeaderTitle2 className="mb-0">Connected 	Address : {account}</StyledHeaderTitle2>
								<AccountModal isOpen={isOpen} onClose={onClose} txStatus={txStatus}/>
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
								<label className="w-100 mb-3">
									<span className="form-label">Lead investor name?</span>
									<input type="text" placeholder="name" className="form-control" onChange={onLeadInvestorName} value={leadInvestorName} />
								</label>
								<label className="w-100 mb-3">
									<span className="form-label">Lead investment percentage(%)?</span>
									<input type="text" placeholder="100" className="form-control" onChange={onLeadInvestorPercentage} value={leadInvestorPercentage} />
								</label>
								<label className="w-100 mb-3">
									<span className="form-label">How many sub investors?</span>
									<input type="text" placeholder="0" className="form-control" onChange={onCountOfSubInvestors} value={countOfSubInvestors} />
								</label>
							</div>
							<hr />
							
						</form>
					</StyledBuySideDiv>
					<StyledSellSideDiv className="col">
						<StyledSmallTitle className="mb-4">Sell Side</StyledSmallTitle>

						<form action="">							
							<div>
								<label className="w-100 mb-3">
									<span className="form-label">Seller name?</span>
									<input type="text" placeholder="name" className="form-control" onChange={onSellerName} value={sellerName} />
								</label>
								<label className="w-100 mb-3">
									<span className="form-label">Cost of Asset?</span>
									<input type="text" placeholder="100" className="form-control" onChange={onCostOfAsset} value={costOfAsset} />
								</label>
							</div>
							<hr />
							<div className="text-center pb-2">
								<button type="submit" onClick={createAssetsAndEscrowHandler} className="btn btn-primary w-100">Create Asset</button>
							</div>
							{/* <p className="text-center text-muted">{actionStatus}</p> */}
						</form>
					</StyledSellSideDiv>
				</div>
			</StyledContainerDiv>			
			<hr />			
		</section>
	)
}


export default Step1page
