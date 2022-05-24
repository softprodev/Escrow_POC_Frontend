import React from 'react'

import ManagePage from './components/ManagePage';

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

const Home: React.FC<Props> = ({ escrowBlockchain, account,actionEnabled,walletconnection,activeProducerArray,activeProviderArray,activeAssetTypesArray, txStatus,setTxStatus}) => {
  // const Home = () => {
  return (
    <>
      <main className="main main--start p-home">
        <ManagePage escrowBlockchain={escrowBlockchain} account={account} actionEnabled={actionEnabled} walletconnection={walletconnection} activeProducerArray={activeProducerArray} activeProviderArray={activeProviderArray} activeAssetTypesArray={activeAssetTypesArray} txStatus={txStatus}  setTxStatus={setTxStatus}/>        
      </main>

    </>
  )
}

export default Home
