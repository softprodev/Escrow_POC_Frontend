import React from 'react'

import Step3page from './components/Step3page';

interface Props {
  // escrowCount: number;
  escrowBlockchain: any;
  account: any;
  actionEnabled: boolean;
  walletconnection: () => void;	
	assetsArray: any;
  escrowArray: any;
  setTxStatus: (transactionStatus: string) => void;	
	txStatus: string;
}

const EStep3: React.FC<Props> = ({ escrowBlockchain, account,actionEnabled,walletconnection,
  assetsArray,escrowArray,
  txStatus,setTxStatus}) => {
  return (
    <>
    
      <main className="main main--start p-home">
        <Step3page escrowBlockchain={escrowBlockchain} account={account} actionEnabled={actionEnabled} walletconnection={walletconnection}
         assetsArray={assetsArray}
         escrowArray={escrowArray}
         txStatus={txStatus}  setTxStatus={setTxStatus}/>        
      </main>

    </>
  )
}

export default EStep3
