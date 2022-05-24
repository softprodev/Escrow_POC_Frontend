import React, { KeyboardEvent, ChangeEvent, useEffect, useState, FormEventHandler } from 'react'

import styled from 'styled-components'
import { useHistory, useLocation, Link } from 'react-router-dom'

import AccountModal from "../../../components/AccountModal";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import ConnectButton from "../../../components/ConnectButton";

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
`;

const StyledFundDiv0 = styled.div`
    background-color: #E7E9EB;
    padding: 15px 15px;
`;
const StyledContainerDiv = styled.div`
    max-width: none;
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
	activeProducerArray: any;
	activeProviderArray: any;	
	activeAssetTypesArray: any;
	setTxStatus: (transactionStatus: string) => void;	
	txStatus: string;
}
const EProvider: React.FC<Props> = ({ escrowBlockchain, account, actionEnabled, walletconnection, activeProducerArray, activeProviderArray,activeAssetTypesArray, txStatus, setTxStatus}) => {

	const { isOpen, onOpen, onClose } = useDisclosure();
	// const escrowIDArray = [1,2,3,4,5,6,7,8,9,0]; 

	const history = useHistory();

	const [escrowName, setEscrowName] = useState('');
	const [escrowID, setEscrowID] = useState('');
	const [escrowAssets, setEscrowAssets] = useState('');
	const [actionStatus, setActionStatus] = useState('');
	const [assetsFunded, setAssetsFunded] = useState('0');
	const [assetsRedeemed, setAssetsRedeemed] = useState('0');
	const [escrowOutstanding, setEscrowOutstanding] = useState('0');
	const [totalRebateReceived, setTotalRebateReceived] = useState('0');

	const onEscrowName = (e: ChangeEvent<HTMLInputElement>): void => {
		setEscrowName(e.target.value);
	}

	const onEscrowID = (e: ChangeEvent<HTMLSelectElement>): void => {
		setEscrowID(String(Number(e.target.value) - 0));
	}
	const onColledtedAssets = (e: ChangeEvent<HTMLInputElement>): void => {
		setEscrowAssets(e.target.value);
	}

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
		
	
	// const addNewSeller = (escrowID: string, collectedAssets: Array<Number>) => {

	// 	setActionStatus("Collecting Assets....");

	// 	escrowBlockchain.smartContract.methods.addProvider(escrowID, collectedAssets)
	// 		.send({ from: account },function (err:any, res:any) {
	// 			if (err) {
	// 			  console.log("An error occured", err)
	// 			  return
	// 			}
	// 			console.log("Hash of the transaction: " + res)
	// 			setActionStatus("Collecting Assets.... txHash:"+res);
	// 			setTxStatus("Collecting Assets - txHash: "+res);


	// 			// add feature to fetch data from transaction hash
				
	// 		  })
	// 		.once("error", (err: any) => {
	// 			console.log(err);
	// 			console.log("Sorry, something went wrong please try again later.");
	// 			alert("Sorry, something went wrong please try again later.");
	// 			walletconnection();
	// 			setActionStatus("");
	// 			setTxStatus("Your transactions willl appear here...");
	// 		})
	// 		.then((receipt: any) => {
	// 			console.log("Response : ", receipt);
	// 			console.log("Transaction finished.");
	// 			alert("Transaction finished.");
	// 			walletconnection();
	// 			setActionStatus("");
	// 			setTxStatus("Your transactions willl appear here...");

	// 	});
	// }
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
	const onBackHomeHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		history.push("/");
	}

	useEffect(() => {

		if (activeProducerArray) {
			let _assetsFunded: number = 0;
			let _assetsRedeemed: number = 0;
			let _escrowOutstanding: number = 0;
			let _totalRebateReceived: number = 0;

			// activeProducerArray.map((producerInfo: any) => {

			// 	if (producerInfo['producer'] == account) {
			// 		_assetsFunded = _assetsFunded + (parseInt(producerInfo['quantity']))
			// 		_assetsRedeemed = _assetsRedeemed + (parseInt(producerInfo['redeemedQuantity']))
			// 		_escrowOutstanding = _escrowOutstanding + (parseInt(producerInfo['remainingAmount']) / 1000000000000000000)
			// 	}
			// });

			activeProviderArray.map((providerInfo: any) => {

				if (providerInfo['provider'] == account) {
					_assetsRedeemed = _assetsRedeemed + (parseInt(providerInfo['quantity']))
					_totalRebateReceived = _totalRebateReceived + (parseInt(providerInfo['redeemedAmount']) / 1000000000000000000)
				}
			});

			setAssetsFunded(String(_assetsFunded.toFixed(0)));
			setAssetsRedeemed(String(_assetsRedeemed.toFixed(0)));
			setEscrowOutstanding(String(_escrowOutstanding.toFixed(5)));
			setTotalRebateReceived(String(_totalRebateReceived.toFixed(5)));
		} else {
			setAssetsFunded("0");
			setAssetsRedeemed("0");
			setEscrowOutstanding("0");
			setTotalRebateReceived("0");
		}

	}, [activeProviderArray, account, activeProducerArray])

	return (

		<section id="section" className="section">

			<div className="section__header pt-3">
				<StyledBackContainer>
					<button type="button" onClick={onBackHomeHandler} className="btn btn-primary mb-1">Home</button>
				</StyledBackContainer>
				<div className="container-fluid">
					<div className="row">
						<div className="col">
							<StyledHeaderDiv0>
								<StyledHeaderDiv1>
									<StyledHeaderTitle1 className="mb-0">02</StyledHeaderTitle1>
									<StyledHeaderVerticalLine />
									<StyledHeaderDiv2>
										<h1 className="mb-0">(re)deem</h1>
										<h1 className="mb-0">Submitting collected assets for redemption</h1>
									</StyledHeaderDiv2>
								</StyledHeaderDiv1>
								<StyledHeaderTitle2 className="mb-0">Provider Address : {account}</StyledHeaderTitle2>
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
					<div className="col-xs-12 col-md-8">
						<StyledProducerDiv1 className="row">
							{/* <div className="col-xs-6 col-sm-5">
								<StyledProducerDiv0>
									<StyledProducerText0 className="mb-0">{assetsFunded}</StyledProducerText0>
									<StyledProducerText1 className="mb-0"></StyledProducerText1>
									<StyledProducerText1 className="mb-0">Assets Funded</StyledProducerText1>
								</StyledProducerDiv0>
							</div> */}
							<div className="col-xs-6 col-sm-5">
								<StyledProducerDiv0>
									<StyledProducerText0 className="mb-0">{assetsRedeemed}</StyledProducerText0>
									<StyledProducerText1 className="mb-0"></StyledProducerText1>
									<StyledProducerText1 className="mb-0">Assets Redeemed</StyledProducerText1>
								</StyledProducerDiv0>
							</div>
							{/* <div className="col-xs-6 col-sm-3">
								<StyledProducerDiv0>
									<StyledProducerText0 className="mb-0">{escrowOutstanding}</StyledProducerText0>
									<StyledProducerText1 className="mb-0">ETH</StyledProducerText1>
									<StyledProducerText1 className="mb-0">Escrow Outstanding</StyledProducerText1>
								</StyledProducerDiv0>
							</div> */}
							<div className="col-xs-6 col-sm-3">
								<StyledProducerDiv0>
									<StyledProducerText0 className="mb-0">{totalRebateReceived} ETH</StyledProducerText0>
									<StyledProducerText1 className="mb-0"></StyledProducerText1>
									<StyledProducerText1 className="mb-0">Total Rebate Received</StyledProducerText1>
								</StyledProducerDiv0>
							</div>
						</StyledProducerDiv1>
					</div>
					<StyledFundDiv0 className="col-xs-6 col-md-4">
						<StyledSmallTitle className="mb-4">Redeem Assets</StyledSmallTitle>

						<form action="">
							{/* <div>
								<label className="w-100 mb-3">
									<span className="form-label">Escrow:</span>
									<select name="" className="form-control" onChange={onEscrowID}>
										<option value="0" selected disabled>Select Escrow</option>
										{activeProducerArray ?
											<>
												{activeProducerArray.map((producerInfo:any) => (
													<option value={producerInfo['escrowID']}>{producerInfo['escrowID']} - {producerInfo['escrowName']}</option>																											
												))}
											</>
											:
											<>
											</>
										}
									</select>
								</label>
							</div> */}
							<div>
								<label className="w-100 mb-3">
									<span className="form-label">Collected Assets(limit : 10)</span>
									<input type="text" placeholder="1,2,3,4,5,6.7.8.9.0" className="form-control" onChange={onColledtedAssets} value={escrowAssets} />
								</label>
							</div>
							<hr />
							<div className="text-center pb-2">
								<button type="submit" onClick={addNewSellerHandler} className="btn btn-primary w-100">Collect Assets</button>
							</div>
							<p className="text-center text-muted">{actionStatus}</p>
						</form>
					</StyledFundDiv0>
				</div>
			</StyledContainerDiv>
			{/* <div className="row">	
				<StyledButtonDiv0 className="col text-center">
					<StyledImg src="img/whitepaper.png" srcSet="img/whitepaper.png" alt="" />
				</StyledButtonDiv0>  
            </div> */}
			<hr />
			<StyledContainerDiv className="container pt-5 pb-5">
				<div className="row">
					<div className="col">

						<StyledSmallTitle className="mb-4" >List of Redemptions</StyledSmallTitle>

						<table className="table table-striped">
							<thead>
								<tr>
									<Styledth scope="col">Date</Styledth>
									<Styledth scope="col">ID</Styledth>
									{/* <Styledth scope="col">Escrow ID</Styledth>
									<Styledth scope="col">Escrow Name</Styledth> */}
									<Styledth scope="col">Producer</Styledth>
									{/* <Styledth scope="col">Provider</Styledth> */}
									<Styledth scope="col">QTY</Styledth>
									<Styledth scope="col">Redeemed Amount</Styledth>
								</tr>
							</thead>
							<tbody>
								{activeProviderArray ?
									<>

										{activeProviderArray.filter((providerInfo: any) => {
														return providerInfo['provider'] == account
												}).map((providerInfo:any) => (
													<tr>
														<Styledtd scope="row">{new Date(1000 * parseInt(providerInfo['createdDate'])).toLocaleDateString("en-US")}</Styledtd>
														<Styledtd scope="row">{providerInfo['providerID']}</Styledtd>
														{/* <Styledtd scope="row">{providerInfo['escrowID']}</Styledtd>
														<Styledtd scope="row">{providerInfo['escrowName']}</Styledtd> */}
														<Styledtd scope="row">{providerInfo['producer']}</Styledtd>
														{/* <Styledtd scope="row">{providerInfo['provider']}</Styledtd> */}
														<Styledtd scope="row">{providerInfo['quantity']}</Styledtd>
														<Styledtd scope="row">{String(parseInt(providerInfo['redeemedAmount']) / 1000000000000000000)} ETH</Styledtd>
													</tr>
												))
										}
												
										{/* {activeProviderArray.map((providerInfo: any) => (
											<tr>
												<td scope="row">{providerInfo['providerID']}</td>
												<td scope="row">{providerInfo['escrowID']}</td>
												<td scope="row">{providerInfo['escrowName']}</td>
												<td scope="row">{providerInfo['producer']}</td>
												<td scope="row">{providerInfo['provider']}</td>
												<td scope="row">{new Date(1000 * parseInt(providerInfo['createdDate'])).toLocaleDateString("en-US")}</td>
												<td scope="row">{providerInfo['quantity']}</td>
												<td scope="row">{String(parseInt(providerInfo['redeemedAmount']) / 1000000000000000000)} ETH</td>
											</tr>
										))} */}
									</>
									:
									<>
									</>
								}
								{/* {escrowIDArray.map((selectedescrowID,index) => (
							<tr>
								<td scope="row">{selectedescrowID}</td>
								<td>{escrowNameArray[index]}</td>
								<td className="text-break">{escrowAddressArray[index]}</td>
								<td>Mar 22 2022</td>
								<td>10</td>
								<td>1 ETH</td>
								<td>0.3 ETH</td>
							</tr>
						))}						 */}
							</tbody>
						</table>

					</div>
				</div>
			</StyledContainerDiv>
			<AccountModal isOpen={isOpen} onClose={onClose} txStatus={txStatus}/>
		</section>

	)
}


export default EProvider
