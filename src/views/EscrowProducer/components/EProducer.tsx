import React, {KeyboardEvent,ChangeEvent,useEffect ,useState} from 'react'
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
    padding: 100px 0;
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
    contractOwnerAddress: any;
    escrowBlockchain: any;
    account: any;
    actionEnabled: boolean;
    walletconnection: () => void;
    activeProducerArray: any;     
	activeAssetTypesArray: any;
    setTxStatus: (transactionStatus: string) => void;	
    txStatus: string;
}

// const EProducer = () => {
const EProducer: React.FC<Props> = ({ contractOwnerAddress,escrowBlockchain, account,actionEnabled,  walletconnection,activeProducerArray,activeAssetTypesArray,txStatus,setTxStatus}) => {
    // const { activateBrowserWallet, account } = useEthers();
    const { isOpen, onOpen, onClose } = useDisclosure();  
	const history = useHistory();

    const [newAssetPrice, setNewAssetPrice] = useState('0');
    const [newAssetName, setNewAssetName] = useState('');
    const [escrowName, setEscrowName] = useState('');
    const [escrowAmount, setEscrowAmount] = useState('0');
    const [assetPrice, setAssetPrice] = useState('0');
    const [assetType, setAssetType] = useState('');
    const [escrowAssets, setEscrowAssets] = useState('');
    const [actionStatus, setActionStatus] = useState('');
    const [assetsFunded, setAssetsFunded] = useState('0');
    const [assetsRedeemed, setAssetsRedeemed] = useState('0');
    const [escrowOutstanding, setEscrowOutstanding] = useState('0');
    const [totalRebateReceived, setTotalRebateReceived] = useState('0');

    const onNewAssetName = (e: ChangeEvent<HTMLInputElement>): void => {
        setNewAssetName(e.target.value);
    }
    const onNewAssetPrice = (e: ChangeEvent<HTMLInputElement>): void => {
        setNewAssetPrice(e.target.value);
    }
    const onEscrowName = (e: ChangeEvent<HTMLInputElement>): void => {
        setEscrowName(e.target.value);
    }
    const onEscrowAmount = (e: ChangeEvent<HTMLInputElement>): void => {
        setEscrowAmount(e.target.value);
    }
    const onAssetType = (e: ChangeEvent<HTMLSelectElement>): void => {
         activeAssetTypesArray.map((assetType:any) => {
            if(assetType['assetTypeID'] == e.target.value){
                setAssetPrice(assetType['assetPrice']);
                console.log("Asset price :",assetPrice);
                console.log("Asset price :",assetType['assetPrice']);
                var postedAssets: Array<number> = escrowAssets.split(',').map(function(item) {
                    console.log("posted asset item ", item);
                    return parseInt(item, 10);
                });
                setEscrowAmount(String(parseInt(assetType['assetPrice'])*postedAssets.length/1000000000000000000));

            }                
        });
		setAssetType(e.target.value);



       
	}
    const onAssetPrice = (e: ChangeEvent<HTMLInputElement>): void => {
        setAssetPrice(e.target.value);
    }
    const onAssets = (e: ChangeEvent<HTMLInputElement>): void => {        
        setEscrowAssets(e.target.value);
        var postedAssets: Array<number> = escrowAssets.split(',').map(function(item) {
            console.log("posted asset item ", item);
            return parseInt(item, 10);
        });
        setEscrowAmount(String(parseInt(assetPrice)*postedAssets.length/1000000000000000000));
        
    }

    const onKeyEscrowName = (e: KeyboardEvent): void => {
        console.log(e.key);
    }
    const onKeyEscrowAmount = (e: KeyboardEvent): void => {
        console.log(e.key);
    }
    const onKeyAssets = (e: KeyboardEvent): void => {
        console.log(e.key);
    }

    const createNewAssetsHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if(account){
            if(actionEnabled){                    
                if (newAssetName ===""){
                    alert("Please input asset type name.");    
                }else{
                    if (isNaN(Number(newAssetPrice))){
                        alert("Please input valid price.");
                    }else{
                        if(Number(newAssetPrice) == 0){
                            alert("Asset's price can't be zero.");
                        }else{
                            console.log("new Asset type: ", newAssetName);
                            console.log("new Asset price: ", newAssetPrice);

                            let postAssetPriceWei = Number(newAssetPrice)*1000000000000000000;
                            console.log("new Asset type: ", newAssetName);
                            console.log("new Asset price: ", newAssetPrice);
                            console.log("new Asset price as Wei: ", postAssetPriceWei);

                            createNewAssetType(newAssetName, String(postAssetPriceWei)); 
                        }
                       
                    }
                }
            }else{
                alert("Please connect wallet.");    
            }
        }else{
            walletconnection();
        }   
    };

    const createNewAssetType = (_newAssetName: String, _postAssetPriceWei: string) => {

		setActionStatus("Adding a new Assets Type....");

		escrowBlockchain.smartContract.methods.addNewAssetType(_newAssetName,_postAssetPriceWei)
			.send({ from: account },function (err:any, res:any) {
				if (err) {
				  console.log("An error occured", err)
				  return
				}
				console.log("Hash of the transaction: " + res)
				setActionStatus("Adding a new asset.... txHash:"+res);
				setTxStatus("Adding a new asset - txHash: "+res);


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
	}
    const createNewEscrowHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if(account){
            if(actionEnabled){
                var postedAssets: Array<number> = escrowAssets.split(',').map(function(item) {
                    return parseInt(item, 10);
                });
    
                if (escrowName ===""){
                    alert("Please input escrow name.");    
                }else{
                    if (postedAssets.length > 0){
                        if (postedAssets.length > 10){
                            alert("Maximum assets : 10 on devnet");
                        }else{
                            let isNumberArray: boolean = true;
    
                            for (let arrayItem of postedAssets) {
                                console.log("assets",arrayItem);
                                if (isNaN(arrayItem)){
                                    isNumberArray = false;
                                }
                            }    
                            if (isNumberArray){
                                if (isNaN(parseInt(assetType))){
                                    alert("Please select Asset Type.");
                                }else{
                                    let postAssetCostWei = parseInt(assetPrice)*postedAssets.length;
                                    console.log("original postedAssets",postedAssets);
                                    console.log("postAssetCostWei",postAssetCostWei);
                                    console.log("postAssetCostWei",parseInt(assetPrice)*postedAssets.length/1000000000000000000);
                                    console.log("escrowAmount",escrowAmount);
                                    console.log("escrowName",escrowName);
                    
                                    createNewEscrow(postedAssets, escrowName, parseInt(assetType),String(postAssetCostWei)); 
                                }
                                
                            }else{
                                alert("Please input valid assets by comma separated.");
                            }   
                        }
                                        
                    }else{
                        alert("Please input assets by comma separated.");
                    }
                }
            }else{
                alert("Please connect wallet.");    
            }
        }else{
            walletconnection();
        }   
    };

    const createNewEscrow = (postedAssets : Array<Number>, escrowName: string, assetTypeID: Number,postAssetsCostWei: string) => {
        // set Static Value of 0.01 ETH
        setActionStatus("Posting Assets....");
        const resultString = escrowBlockchain.smartContract.methods.addNewProducer(postedAssets,escrowName, assetTypeID)
        .send({value: postAssetsCostWei,
              from: account},function (err:any, res:any) {
				if (err) {
				  console.log("An error occured", err)
				  return
				}
				console.log("Hash of the transaction: " + res)
                setActionStatus("Posting Assets.... txHash:"+res);
				setTxStatus("Posting Assets - txHash: "+res);
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
        });

        console.log("Result String : ", resultString);
    }

    const onBackHomeHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();  
		history.push("/");
	}

    useEffect(()=>{
        
        if(activeProducerArray){
            let _assetsFunded: number = 0;
            let _assetsRedeemed: number = 0;
            let _escrowOutstanding: number = 0;
            let _totalRebateReceived: number = 0;
    
            activeProducerArray.map((producerInfo:any) => {
                if(producerInfo['producer'] == account){
                    _assetsFunded = _assetsFunded+(parseInt(producerInfo['quantity']))
                    _assetsRedeemed = _assetsRedeemed + (parseInt(producerInfo['redeemedQuantity']))
                    _escrowOutstanding = _escrowOutstanding + (parseInt(producerInfo['remainingAmount'])/1000000000000000000)
                    _totalRebateReceived = _totalRebateReceived + (parseInt(producerInfo['rebateReceivedAmount'])/1000000000000000000)
                }                
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
        
        // console.log("active assets array", activeAssetTypesArray);

    }, [activeProducerArray,activeAssetTypesArray,account])

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
                                <StyledHeaderTitle1 className="mb-0">01</StyledHeaderTitle1>
                                <StyledHeaderVerticalLine />
                                <StyledHeaderDiv2>
                                    <h1 className="mb-0">(re)fund</h1>
                                    <h1 className="mb-0">Creating and funding a producer asset escrow</h1>
                                </StyledHeaderDiv2>
                            </StyledHeaderDiv1>	
                            <StyledHeaderTitle2 className="mb-0">Producer Address : {account}</StyledHeaderTitle2>
                        </StyledHeaderDiv0>                        
					</div>                    
					<div className="col col-lg-2 d-flex justify-content-end">
						<div className="text-right">
                            <ConnectButton handleOpenModal={onOpen} walletconnection={walletconnection}/>
						</div>
					</div>
				</div>
			</div>
		</div>
        <hr/>
		<StyledContainerDiv className="container pt-5 pb-5">
			<div className="row">	            			
				<div className="col-xs-12 col-md-8">
                    <StyledProducerDiv1 className="row">	
                        <div className="col-xs-6 col-sm-3">
                                <StyledProducerDiv0>
                                    <StyledProducerText0 className="mb-0">{assetsFunded}</StyledProducerText0>
                                    <StyledProducerText1 className="mb-0"></StyledProducerText1>
                                    <StyledProducerText1 className="mb-0">Assets Funded</StyledProducerText1>
                                </StyledProducerDiv0>
                        </div>					
                        <div className="col-xs-6 col-sm-3">
                                <StyledProducerDiv0>
                                    <StyledProducerText0 className="mb-0">{assetsRedeemed}</StyledProducerText0>
                                    <StyledProducerText1 className="mb-0"></StyledProducerText1>
                                    <StyledProducerText1 className="mb-0">Assets Redeemed</StyledProducerText1>
                                </StyledProducerDiv0>
                        </div>					
                        <div className="col-xs-6 col-sm-3">
                                <StyledProducerDiv0>
                                    <StyledProducerText0 className="mb-0">{escrowOutstanding} ETH</StyledProducerText0>
                                    <StyledProducerText1 className="mb-0"></StyledProducerText1>
                                    <StyledProducerText1 className="mb-0">Escrow Outstanding</StyledProducerText1>
                                </StyledProducerDiv0>
                        </div>					
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
					<StyledSmallTitle className="mb-4">Fund an Escrow</StyledSmallTitle>					
					<form action="">
                        <div>
							<label className="w-100 mb-3">
								<span className="form-label">Name:</span>
								<input type="text" placeholder="Escrow Name" className="form-control" onChange={onEscrowName} value={escrowName} defaultValue="Escrow"/>
							</label>
						</div>
                        <div>
                            <label className="w-100 mb-3">
                                <span className="form-label">Asset Type</span>
                                <select name="" className="form-control" onChange={onAssetType}>
                                    <option value="0" selected disabled>Select Type</option>
                                    {activeAssetTypesArray ?
                                        <>
                                            {activeAssetTypesArray.map((assetType:any) => (
                                                <option value={assetType['assetTypeID']}>{assetType['assetTypeName']}</option>																											
                                            ))}
                                        </>
                                        :
                                        <>
                                        </>
                                    }
                                </select>
                            </label>
                        </div>											
						<div>
							<label className="w-100 mb-3">
								<span className="form-label">Asset Price(ETH):</span>
								<input type="text" placeholder="" className="form-control" onChange={onAssetPrice} value={String((parseInt(assetPrice)/1000000000000000000))} defaultValue="" disabled/>
							</label>
						</div>						
						<div>
							<label className="w-100 mb-3">
								<span className="form-label">Assets(limit : 10))</span>
								<input type="text" placeholder="1,2,3,4,5,6.7.8.9.0" className="form-control" onChange={onAssets} value={escrowAssets}/>
							</label>
						</div>
						<div>
							<label className="w-100 mb-3">
								<span className="form-label">Estimated Price : {escrowAmount} ETH</span>
							</label>
						</div>
                        <hr/>
						<div className="text-center pb-2">
							<button type="submit" onClick={createNewEscrowHandler} className="btn btn-primary w-100">Post Assets</button>
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
        <hr/>
        <StyledContainerDiv className="container pt-5 pb-5">
			<div className="row">
				<div className="col">
					
					<StyledSmallTitle className="mb-4" >List of Funds</StyledSmallTitle>
					
					<table className="table table-striped">
						<thead>
						<tr>
							<Styledth scope="col">ID</Styledth>
							<Styledth scope="col">Name</Styledth>
							{/* <Styledth scope="col">Address</Styledth> */}
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

                                    {activeProducerArray.filter((producerInfo: any) => {
														return producerInfo['producer'] == account
                                            }).map((producerInfo:any) => (
                                                <tr>
                                                    <Styledtd scope="row">{producerInfo['escrowID']}</Styledtd>
                                                    <Styledtd scope="row">{producerInfo['escrowName']}</Styledtd>
                                                    {/* <td scope="row">{producerInfo['producer']}</Styledtd> */}
                                                    <Styledtd scope="row">{new Date(1000*parseInt(producerInfo['createdDate'])).toLocaleDateString("en-US")}</Styledtd>
                                                    <Styledtd scope="row">{producerInfo['quantity']}</Styledtd>
                                                    <Styledtd scope="row">{producerInfo['redeemedQuantity']}</Styledtd>
                                                    <Styledtd scope="row">{parseInt(producerInfo['quantity']) - parseInt(producerInfo['redeemedQuantity'])}</Styledtd>
                                                    <Styledtd scope="row">{String(parseInt(producerInfo['amount'])/1000000000000000000)} ETH</Styledtd>
                                                    <Styledtd scope="row">{String(parseInt(producerInfo['redeemedAmount'])/1000000000000000000)} ETH</Styledtd>								
                                                    <Styledtd scope="row">{String(parseInt(producerInfo['rebateReceivedAmount'])/1000000000000000000)} ETH</Styledtd>								
                                                    <Styledtd scope="row">{String(parseInt(producerInfo['remainingAmount'])/1000000000000000000)} ETH</Styledtd>	
                                                </tr>
                                            ))
                                    }

                                    {/* {activeProducerArray.map((producerInfo:any) => (
                                        <tr>
                                            <td scope="row">{producerInfo['escrowID']}</td>
                                            <td scope="row">{producerInfo['escrowName']}</td>
                                            <td scope="row">{producerInfo['producer']}</td>
                                            <td scope="row">{new Date(1000*parseInt(producerInfo['createdDate'])).toLocaleDateString("en-US")}</td>
                                            <td scope="row">{producerInfo['quantity']}</td>
                                            <td scope="row">{String(parseInt(producerInfo['amount'])/1000000000000000000)} ETH</td>
                                            <td scope="row">{String(parseInt(producerInfo['redeemedAmount'])/1000000000000000000)} ETH</td>								
                                            <td scope="row">{String(parseInt(producerInfo['rebateReceivedAmount'])/1000000000000000000)} ETH</td>								
                                            <td scope="row">{String(parseInt(producerInfo['remainingAmount'])/1000000000000000000)} ETH</td>								
                                        </tr>
                                    ))} */}
                                </>
                                :
                                <>
                                </>
                            }
						</tbody>
					</table>
					
				</div>				
			</div>
		</StyledContainerDiv>
        {contractOwnerAddress == account ?
            <>
            <StyledFundDiv0 >					
                <StyledSmallTitle className="mb-4">Add Asset Type</StyledSmallTitle>					
                <form action="">
                    <div>
                        <label className="w-100 mb-3">
                            <span className="form-label">Asset Type Name:</span>
                            <input type="text" placeholder="Asset Type" className="form-control" onChange={onNewAssetName} value={newAssetName} defaultValue="Asset Type"/>
                        </label>
                    </div>                        											
                    <div>
                        <label className="w-100 mb-3">
                            <span className="form-label">Asset Price(ETH):</span>
                            <input type="text" placeholder="" className="form-control" onChange={onNewAssetPrice} value={newAssetPrice} defaultValue=""/>
                        </label>
                    </div>
                    <hr/>
                    <div className="text-center pb-2">
                        <button type="submit" onClick={createNewAssetsHandler} className="btn btn-primary w-100">Add Asset Type</button>
                    </div>
                    <p className="text-center text-muted">{actionStatus}</p>
                </form>
            </StyledFundDiv0>
            </>
            :
            <>
            </>
        }
        <AccountModal isOpen={isOpen} onClose={onClose} txStatus={txStatus}/>

	</section>
  )
}





export default EProducer
