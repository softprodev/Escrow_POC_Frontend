import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import AccountModal from "../../../components/AccountModal";
import { useDisclosure } from "@chakra-ui/react";
import ConnectButton from "../../../components/ConnectButton";


const StyledHeaderTitle = styled.h1`
    font-size: 65px;
    margin-right: 10px;
    margin-left: 10px;
	text-align : center;
`;




const StyledHeaderDiv0 = styled.div`
	margin-bottom: 50px;
	padding-top: 0px;
    display: block;
	padding: 0 50px;
`;
const StyledSectionDiv0 = styled.section`
    padding-top: 10px;
`;
const StyledButton0 = styled.button`
	font-size: 20px;
	height : 60px;
	width : 200px;
`;
const StyledButtonDivImage = styled.div`
// top: 50%;
padding: 10px;
`;
const StyledButtonDiv0 = styled.div`
// top: 50%;
padding: 10px;
`;


const StyledSmallTitle = styled.h4`
    font-size : 22px;
    padding-bottom: 30px;
`;

const StyledContainerDiv = styled.div`
    max-width: none;
`;
const StyledContainerDiv0 = styled.div`
    max-width: none;
`;

const StyledProducerDiv1 = styled.div`
    padding: 10px 0;
`;

const StyledProducerDiv0 = styled.div`
    text-align: center;
    display: block;
    margin-left: 10px;
    font-size: 20px;
    padding: 10px 10px;
`;

const StyledProducerText0 = styled.h1`
    padding-bottom : 5px;
    font-size : 20px;
`;
const StyledProducerText1 = styled.h1`
    font-size : 18px;
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

const StyledImg = styled.img`
	margin-left: auto;
	margin-right: auto;
	display: block;
`;
const StyledHeaderDiv1 = styled.div`
    display: flex;
    margin-bottom: 10px;
`;
const StyledHeaderDiv3 = styled.div`
    display: flex;
    margin-bottom: 10px;
`;
const StyledHeaderDiv4 = styled.div`
margin-left: auto; 
margin-right: 0;
`;
const StyledHeaderTitle1 = styled.h1`
    font-size: 65px;
    margin-right: 10px;
    margin-left: 10px;
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
const StyledHeaderTitle2 = styled.h1`
    padding-top: 20px;
    padding-bottom: 20px;
`;

interface Props {
	// escrowCount: number;
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

const ManagePage: React.FC<Props> = ({ escrowBlockchain, account,actionEnabled,walletconnection,activeProducerArray,activeProviderArray,activeAssetTypesArray, txStatus, setTxStatus}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();  
	const [assetsFunded, setAssetsFunded] = useState('0');
    const [assetsRedeemed, setAssetsRedeemed] = useState('0');
    const [escrowOutstanding, setEscrowOutstanding] = useState('0');
    const [totalRebateReceived, setTotalRebateReceived] = useState('0');

	const history = useHistory();

	const onProviderHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();  
		history.push("/provider");
	}
	const onProducerHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault(); 
		history.push("/producer"); 
	}
	const onEscrowStep1Handler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault(); 
		history.push("/step1"); 
	}
	const onEscrowStep2Handler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault(); 
		history.push("/step2"); 
	}
	const onEscrowStep3Handler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault(); 
		history.push("/step3"); 
	}
	const onViewHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault(); 
		history.push("/view"); 
	}
	const onFinanceHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault(); 
		history.push("/finance"); 
	}


	useEffect(()=>{

		if(activeProducerArray){
			let _assetsFunded: number = 0;
			let _assetsRedeemed: number = 0;
			let _escrowOutstanding: number = 0;
			let _totalRebateReceived: number = 0;

			activeProducerArray.map((producerInfo:any) => {
				// if(producerInfo['producer'] == account){
					_assetsFunded = _assetsFunded+(parseInt(producerInfo['quantity']))
					_assetsRedeemed = _assetsRedeemed + (parseInt(producerInfo['redeemedQuantity']))
					_escrowOutstanding = _escrowOutstanding + (parseInt(producerInfo['remainingAmount'])/1000000000000000000)
					_totalRebateReceived = _totalRebateReceived + (parseInt(producerInfo['redeemedAmount'])/1000000000000000000)
				// }                
			});
			
			setAssetsFunded(String(_assetsFunded.toFixed(0)));
			setAssetsRedeemed(String(_assetsRedeemed.toFixed(0)));
			setEscrowOutstanding(String(_escrowOutstanding.toFixed(5)));
			setTotalRebateReceived(String(_totalRebateReceived.toFixed(5)));
		}else {
			setAssetsFunded("0");
			setAssetsRedeemed("0");
			setEscrowOutstanding("0");
			setTotalRebateReceived("0");
		}      

    }, [activeProviderArray,account,activeProducerArray])
  return (
		<section>
		<div className="section__header pt-3">
			<div className="container-fluid">
				<div className="row">
					<div className="col">												
					</div>                    
					<div className="col col-lg-2 d-flex justify-content-end">
						<div className="text-right">
							<ConnectButton handleOpenModal={onOpen} walletconnection={walletconnection}/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div className="container-fluid">
			<div className="row">
				<div className="col">
					<StyledHeaderDiv0>
						<StyledHeaderDiv1>
							<StyledHeaderTitle className="mb-0">Escrow - Proof of Concept</StyledHeaderTitle>
							
						</StyledHeaderDiv1>
						<StyledHeaderDiv3>
							<StyledHeaderTitle2 className="mb-0">Connected Address : {account}</StyledHeaderTitle2>

							<StyledHeaderDiv4 >	
								<StyledButtonDiv0 className="col text-right">
									<StyledButton0 type="button" className="btn btn-primary mb-1" onClick={onEscrowStep1Handler}>Create Escrow</StyledButton0>
								</StyledButtonDiv0>            			
								{/* <StyledButtonDiv0 className="col text-right">
									<StyledButton0 type="button" className="btn btn-primary mb-1" onClick={onEscrowStep2Handler}> Step 2</StyledButton0>
								</StyledButtonDiv0>            			
								<StyledButtonDiv0 className="col text-right">
									<StyledButton0 type="button" className="btn btn-primary mb-1" onClick={onEscrowStep3Handler}> Step 3</StyledButton0>
								</StyledButtonDiv0>     */}
							</StyledHeaderDiv4>
						</StyledHeaderDiv3>
					</StyledHeaderDiv0>
				</div>
				{/* <div className="col col-lg-2 d-flex justify-content-end">
					<div className="text-right">
						<ConnectButton handleOpenModal={onOpen} walletconnection={walletconnection} />
					</div>
				</div> */}
			</div>
		</div>
		<StyledSectionDiv0 id="section" className="section">
				{/* <StyledHeaderDiv0>
					<StyledHeaderTitle className="mb-0">Escrow Project</StyledHeaderTitle>
				</StyledHeaderDiv0> */}
			<StyledHeaderDiv0>
			{/* <div className="row">	
				<StyledButtonDiv0 className="col text-center">
					<StyledButton0 type="button" className="btn btn-primary mb-1" onClick={onProducerHandler}>01 | (re)fund</StyledButton0>
				</StyledButtonDiv0>            			
				<StyledButtonDiv0 className="col text-center">
					<StyledButton0 type="button" className="btn btn-primary mb-1" onClick={onProviderHandler}>02 | (re)deem</StyledButton0>
				</StyledButtonDiv0>	
			</div> */}
					
			{/* <StyledContainerDiv0 className="container pt-5 pb-5">
				<div className="row">	            			
					<div className="col">
						<StyledProducerDiv1 className="row">	
							<div className="col-xs-6 col-sm-3">
									<StyledProducerDiv0>
										<StyledProducerText0 className="mb-0">{assetsFunded}</StyledProducerText0>
										<StyledProducerText1 className="mb-0">units</StyledProducerText1>
										<StyledProducerText1 className="mb-0">Total Assets Funded</StyledProducerText1>
									</StyledProducerDiv0>
							</div>					
							<div className="col-xs-6 col-sm-3">
									<StyledProducerDiv0>
										<StyledProducerText0 className="mb-0">{assetsRedeemed}</StyledProducerText0>
										<StyledProducerText1 className="mb-0">units</StyledProducerText1>
										<StyledProducerText1 className="mb-0">Total Assets Redeemed</StyledProducerText1>
									</StyledProducerDiv0>
							</div>					
							<div className="col-xs-6 col-sm-3">
									<StyledProducerDiv0>
										<StyledProducerText0 className="mb-0">{escrowOutstanding}</StyledProducerText0>
										<StyledProducerText1 className="mb-0">ETH</StyledProducerText1>
										<StyledProducerText1 className="mb-0">Escrow Balance</StyledProducerText1>
									</StyledProducerDiv0>
							</div>					
							<div className="col-xs-6 col-sm-3">
									<StyledProducerDiv0>
										<StyledProducerText0 className="mb-0">{totalRebateReceived}</StyledProducerText0>
										<StyledProducerText1 className="mb-0">ETH</StyledProducerText1>
										<StyledProducerText1 className="mb-0">Escrow Disbursed</StyledProducerText1>
									</StyledProducerDiv0>
							</div>	
						</StyledProducerDiv1>		
					</div>						
				</div>
			</StyledContainerDiv0> */}
			
			<hr/>
			{/* <StyledContainerDiv className="container pt-5 pb-5">
				<div className="row">
					<div className="col">
						
						<StyledSmallTitle className="mb-4" >List of Funds(All)</StyledSmallTitle>
						
						<table className="table table-striped">
							<thead>
							<tr>
								<Styledth scope="col">ID</Styledth>
								<Styledth scope="col">Name</Styledth>
								<Styledth scope="col">Address</Styledth>
								<Styledth scope="col">Date</Styledth>
								<Styledth scope="col">QTY</Styledth>
								<Styledth scope="col">QTY Redeemed</Styledth>
								<Styledth scope="col">QTY Remaining</Styledth>
								<Styledth scope="col">Amount</Styledth>
								<Styledth scope="col">Redeemed</Styledth>
								<Styledth scope="col">Rebate Received</Styledth>
								<Styledth scope="col">Remaininng</Styledth>
							</tr>
							</thead>
							<tbody>
								{ activeProducerArray ? 
									<>
										{activeProducerArray.map((producerInfo:any) => (
											<tr>
												<Styledtd scope="row">{producerInfo['escrowID']}</Styledtd>
												<Styledtd scope="row">{producerInfo['escrowName']}</Styledtd>
												<Styledtd scope="row">{producerInfo['producer']}</Styledtd>
												<Styledtd scope="row">{new Date(1000*parseInt(producerInfo['createdDate'])).toLocaleDateString("en-US")}</Styledtd>
												<Styledtd scope="row">{producerInfo['quantity']}</Styledtd>
												<Styledtd scope="row">{producerInfo['redeemedQuantity']}</Styledtd>
												<Styledtd scope="row">{parseInt(producerInfo['quantity']) - parseInt(producerInfo['redeemedQuantity'])}</Styledtd>
												<Styledtd scope="row">{String(parseInt(producerInfo['amount'])/1000000000000000000)} ETH</Styledtd>
												<Styledtd scope="row">{String(parseInt(producerInfo['redeemedAmount'])/1000000000000000000)} ETH</Styledtd>								
												<Styledtd scope="row">{String(parseInt(producerInfo['rebateReceivedAmount'])/1000000000000000000)} ETH</Styledtd>								
												<Styledtd scope="row">{String(parseInt(producerInfo['remainingAmount'])/1000000000000000000)} ETH</Styledtd>								
											</tr>
										))}
									</>
									:
									<>
									</>
								}
							</tbody>
						</table>
						
					</div>				
				</div>
			</StyledContainerDiv> */}
			{/* <StyledContainerDiv className="container pt-5 pb-5">
				<div className="row">
					<div className="col">
						
						<StyledSmallTitle className="mb-4" >List of Redemptions(All)</StyledSmallTitle>
						
						<table className="table table-striped">
							<thead>
							<tr>
								
								<Styledth scope="col">Date</Styledth>
								<Styledth scope="col">ID</Styledth>
								<Styledth scope="col">Producer</Styledth>
								<Styledth scope="col">Provider</Styledth>
								<Styledth scope="col">QTY</Styledth>
								<Styledth scope="col">Redeemed Amount</Styledth>
							</tr>
							</thead>
							<tbody>
								{ activeProviderArray ? 
									<>
										{activeProviderArray.map((providerInfo:any) => (
											<tr>
												<Styledtd scope="row">{new Date(1000*parseInt(providerInfo['createdDate'])).toLocaleDateString("en-US")}</Styledtd>
												<Styledtd scope="row">{providerInfo['providerID']}</Styledtd>
												<Styledtd scope="row">{providerInfo['producer']}</Styledtd>
												<Styledtd scope="row">{providerInfo['provider']}</Styledtd>
												<Styledtd scope="row">{providerInfo['quantity']}</Styledtd>
												<Styledtd scope="row">{String(parseInt(providerInfo['redeemedAmount'])/1000000000000000000)} ETH</Styledtd>								
											</tr>
										))}
									</>
									:
									<>
									</>
								}
							</tbody>
						</table>
						
					</div>				
				</div>
			</StyledContainerDiv>				 */}
					{/* <button type="button" className="btn btn-primary mb-1" onClick={onProviderHandler}>Provider</button>
					<button type="button" className="btn btn-primary mb-1" onClick={onProducerHandler}>Producer</button> */}
			</StyledHeaderDiv0>		
		</StyledSectionDiv0>
		<AccountModal isOpen={isOpen} onClose={onClose}  txStatus={txStatus}/>

		</section>
    
  )
}


export default ManagePage
