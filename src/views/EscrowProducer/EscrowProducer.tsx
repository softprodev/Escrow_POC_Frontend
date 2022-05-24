import React from 'react'

import EProducer from './components/EProducer';
interface Props {
  // escrowCount: number;
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

const EscrowProducer: React.FC<Props> = ({ contractOwnerAddress,escrowBlockchain, account,actionEnabled,walletconnection,activeProducerArray,activeAssetTypesArray,txStatus,setTxStatus}) => {
  return (
    <>
      {/* <main className="main main--start p-home"> */}
        <EProducer contractOwnerAddress={contractOwnerAddress} escrowBlockchain={escrowBlockchain} account={account} actionEnabled={actionEnabled} walletconnection={walletconnection} activeProducerArray={activeProducerArray} activeAssetTypesArray={activeAssetTypesArray} txStatus={txStatus} setTxStatus={setTxStatus}/>            
      {/* </main> */}

    </>
  )
}

export default EscrowProducer
