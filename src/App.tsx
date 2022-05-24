import React, { useEffect, useState, useCallback } from 'react'
import { Route, Switch,Router} from "react-router-dom"

import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import theme from "./theme";
import Layout from "./components/Layout";
import AccountModal from "./components/AccountModal";
import "@fontsource/inter";
import { useDispatch,useSelector } from "react-redux";

import { RootState } from './redux/store'
import { connect } from "./redux/blockchain/blockchainActions";
import fetchData from "./redux/data/dataActions";

import { useEthers } from "@usedapp/core";
import history from './routerHistory'


import styled from "@emotion/styled";
import Home from './views/Home';
import EscrowProvider from './views/EscrowProvider';
import EscrowProducer from './views/EscrowProducer';
import Step1 from './views/Step1';
import Step2 from './views/Step2';
import Step3 from './views/Step3';



const StyledIdenticon1 = styled.div`
  // height: 1rem;
  // width: 1rem;
  border-radius: 1.125rem;
  background-color: black;
  color: white;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state: RootState) => state.blockchain);
  const data = useSelector((state: RootState) => state.data);
  const [initialLoad, setInitialLoad] = useState(true);
  const [actionEnabled, setActionEnabled] = useState(true);
  const [txStatus, settxStatus] = useState("Your transactions willl appear here...");



  const [leadInvestorName, SetLeadInvestorName] = useState('');
	const [leadInvestorPercentage, SetLeadInvestorPercentage] = useState('100');
	const [countOfSubInvestors, SetCountOFSubInvestors] = useState('0');
	const [sellerName, SetSellerName] = useState('');
	const [costOfAsset, SetCostOfAsset] = useState('0');


  let assetsArray: Array<any>;
  let escrowArray: Array<any>;

  let activeProducers: Array<any>;
  let activeProviders: Array<any>;
  let activeAssetTypes: Array<any>;

  const { activateBrowserWallet, account } = useEthers();
  const { isOpen, onOpen, onClose } = useDisclosure();  

  const createNewEscrowHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    
    let postedAssets: Array<number>;
    postedAssets = [1,2,3,4,5,6,7,8,9,0]; 
    const escrowName = "New Escrow"; 
    const postAssetCostWei = "10000000000000000";
    createNewEscrow(postedAssets, escrowName,postAssetCostWei);     
  };
  const createNewEscrow = (postedAssets : Array<Number>, escrowName: string,postAssetsCostWei: string) => {

    // set Static Value of 0.01 ETH
    blockchain.smartContract.methods.createNewEscrow(postedAssets,escrowName)
    .send({value: postAssetsCostWei,
          from: account})
    .once("error", (err: any) => {
      console.log(err);
      console.log("Sorry, something went wrong please try again later.");
      alert("Sorry, something went wrong please try again later.");
    })
    .then((receipt: any) => {
      console.log(receipt);      
      console.log("Transaction Finished.");      
      alert("Transaction Finished.");
    });
  }
  const addNewSellerHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();    
    let collectedAssets: Array<number>;
    collectedAssets = [1,2,3,4]; 
    const escrowID = "3"; 
    addNewSeller(escrowID, collectedAssets);     
  };
  const addNewSeller = (escrowID : string,collectedAssets : Array<Number>) => {
    blockchain.smartContract.methods.addNewSeller(escrowID,collectedAssets)
    .send({from: account})
    .once("error", (err: any) => {
      console.log(err);
      console.log("Sorry, something went wrong please try again later.");
      alert("Sorry, something went wrong please try again later.");
    })
    .then((receipt: any) => {
      console.log(receipt);
      console.log("Transaction finished.");
      alert("Transaction finished.");
    });
  }

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("Connec button clicked");
    walletConnection();
    // getData();
  };
  const fetchDataHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    getData();  
    
  };
  const fetchActiveEscrowHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // getActiveEscrows(); 

    
    var transaction = '0xa2683a663d89657fb8266cdc566ab6efcacd2c4ffcb8fbfb2a0eb9e0aa4591d1';

    blockchain.web3.eth.getTransaction(transaction, function(err:any, tx:any){
      let tx_data = tx.input;
      let input_data = '0x' + tx_data;  // get only data without function selector
      // let input_data = '0x' + tx_data.slice(10);  // get only data without function selector

      let params = blockchain.web3.eth.abi.decodeParameters(['bytes32', 'string', 'string', 'string'], input_data);
      console.log("Decode Data : " ,params);
    });
    
    // let postedAssets: Array<number>;
    // postedAssets = [1,2,3,4,5,6,7,8,9,0]; 
    // const escrowName = "New Escrow"; 
    // const postAssetCostWei = "10000000000000000";
    // createNewEscrow(postedAssets, escrowName,postAssetCostWei);     
  };




  const getActiveEscrows = () => {
    blockchain.smartContract.methods
      .getListOfActiveEscrow()
      .call()
      .once("error", (err: any) => {
        console.log(err);
        console.log("Sorry, something went wrong please try again later.");
        alert("Sorry, something went wrong please try again later.");
      })
      .then((receipt: any) => {
        console.log("Your escrow created");
        console.log(
          `WOW, the is yours! go visit Opensea.io to view it.`
        );
        alert(`WOW, the  is yours! go visit Opensea.io to view it.`);
        // dispatch(fetchData());
      });
  };

  const setTxStatus = (transactionStatus: string) => {
    settxStatus(transactionStatus);
  };

  const walletConnection = () => {
    dispatch(connect());  
    getData();  
  };
 
  const getData = useCallback(() => {
    console.log("getData");
    dispatch(fetchData());
  }, [dispatch]);


  const fetchEscrowData = () => {
    dispatch(connect());  
    getData();  
  }; 
  useEffect(()=>{
    console.log("Just called one time.");
    fetchEscrowData();
  }, [])

  // useEffect(() => {
		
	// 	if(blockchain.escrowArray){
	// 		console.log("Asset Array Length : ", blockchain.escrowArray.length);
	// 		let lastAssetValue = blockchain.escrowArray[escrowArray.length-1];
	// 		console.log("Asset Information : ", lastAssetValue);
	// 		// SetEscrowID(lastAssetValue['escrowID']);
	// 	}else{
	// 		// SetEscrowID(0);
	// 	}
		
	// }, [blockchain.escrowArray])
  
  return (
    <ChakraProvider theme={theme}>
      <Router history={history}>
        <Switch>
          <Layout>
              <Route path="/" exact>
                <Home escrowBlockchain={blockchain} account={account} actionEnabled={actionEnabled} walletconnection={walletConnection} activeProducerArray={blockchain.activeProducers ? blockchain.activeProducers : null} activeProviderArray={blockchain.activeProviders ? blockchain.activeProviders : null} activeAssetTypesArray={blockchain.activeAssetTypes ? blockchain.activeAssetTypes : null} txStatus={txStatus} setTxStatus={setTxStatus}/>                
              </Route>
              {/* <Route path="/provider" exact>
                <EscrowProvider escrowBlockchain={blockchain} account={account} actionEnabled={actionEnabled} walletconnection={walletConnection} activeProducerArray={blockchain.activeProducers ? blockchain.activeProducers : null} activeProviderArray={blockchain.activeProviders ? blockchain.activeProviders : null} activeAssetTypesArray={blockchain.activeAssetTypes ? blockchain.activeAssetTypes : null} txStatus={txStatus}  setTxStatus={setTxStatus}/>                
              </Route>
              <Route path="/producer" exact>
                <EscrowProducer contractOwnerAddress={blockchain.contractOwnerAddress} escrowBlockchain={blockchain} account={account} actionEnabled={actionEnabled} walletconnection={walletConnection} activeProducerArray={blockchain.activeProducers ? blockchain.activeProducers : null} activeAssetTypesArray={blockchain.activeAssetTypes ? blockchain.activeAssetTypes : null} txStatus={txStatus}  setTxStatus={setTxStatus}/>                
              </Route> */}
              <Route path="/step1" exact>
                <Step1 escrowBlockchain={blockchain} account={account} actionEnabled={actionEnabled} walletconnection={walletConnection} 
                 assetsArray={blockchain.assetsArray ? blockchain.assetsArray : null}
                 escrowArray={blockchain.escrowArray ? blockchain.escrowArray : null}
                 txStatus={txStatus}  setTxStatus={setTxStatus}
                 leadInvestorName={leadInvestorName} SetLeadInvestorName={SetLeadInvestorName}
                 leadInvestorPercentage={leadInvestorPercentage} SetLeadInvestorPercentage={SetLeadInvestorPercentage}
                 countOfSubInvestors={countOfSubInvestors} SetCountOFSubInvestors={SetCountOFSubInvestors}
                 sellerName={sellerName} SetSellerName={SetSellerName}
                 costOfAsset={costOfAsset} SetCostOfAsset={SetCostOfAsset}
                />                
              </Route>
              <Route path="/step2" exact>
                <Step2 escrowBlockchain={blockchain} account={account} actionEnabled={actionEnabled} walletconnection={walletConnection}
                 assetsArray={blockchain.assetsArray ? blockchain.assetsArray : null}
                 escrowArray={blockchain.escrowArray ? blockchain.escrowArray : null}
                 txStatus={txStatus}  setTxStatus={setTxStatus}
                 leadInvestorName={leadInvestorName} SetLeadInvestorName={SetLeadInvestorName}
                 leadInvestorPercentage={leadInvestorPercentage} SetLeadInvestorPercentage={SetLeadInvestorPercentage}
                 countOfSubInvestors={countOfSubInvestors} SetCountOFSubInvestors={SetCountOFSubInvestors}
                 sellerName={sellerName} SetSellerName={SetSellerName}
                 costOfAsset={costOfAsset} SetCostOfAsset={SetCostOfAsset}
                />                                
              </Route>
              <Route path="/step3" exact>
                <Step3 escrowBlockchain={blockchain} account={account} actionEnabled={actionEnabled} walletconnection={walletConnection}
                 txStatus={txStatus}  setTxStatus={setTxStatus}
                 assetsArray={blockchain.assetsArray ? blockchain.assetsArray : null}
                 escrowArray={blockchain.escrowArray ? blockchain.escrowArray : null}/>                
              </Route>
          </Layout>
        </Switch>
      </Router>

        <Layout>


        {/* <WalletButton onClick={buttonHandler} className="c-btn" type="button">
                <u className="c-btn__mask">Fetch Data</u>
        </WalletButton>
        
        <WalletButton onClick={createNewEscrowHandler} className="c-btn" type="button">
                <u className="c-btn__mask">Create New Escrow</u>
        </WalletButton>
        <WalletButton onClick={addNewSellerHandler} className="c-btn" type="button">
                <u className="c-btn__mask">Add New Seller</u>
        </WalletButton>

        <WalletButton onClick={fetchActiveEscrowHandler} className="c-btn" type="button">
                <u className="c-btn__mask">{blockchain.activeProducers ? "Data loaded" : "You should fetch data."}</u>
        </WalletButton>         */}
        <AccountModal isOpen={isOpen} onClose={onClose} txStatus={txStatus}/>
        </Layout>
        
    </ChakraProvider>
  );
}

const WalletButton = styled.button`

height: 100px;
width: 200px;
background-color: blue;
color: black;
outline: none;
  text-decoration: none;

margin-left: 20px !important;
background-color: transparent;

`;


export default App;
