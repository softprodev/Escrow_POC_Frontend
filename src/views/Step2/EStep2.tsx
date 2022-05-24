import React from 'react'

import Step2page from './components/Step2page';

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

const EStep2: React.FC<Props> = ({ escrowBlockchain, account,actionEnabled,walletconnection,
  assetsArray,escrowArray,
  txStatus,setTxStatus,
  leadInvestorName, SetLeadInvestorName,
	leadInvestorPercentage, SetLeadInvestorPercentage,
	countOfSubInvestors, SetCountOFSubInvestors,
	sellerName, SetSellerName,
	costOfAsset, SetCostOfAsset
}) => {
  return (
    <>
    
      <main className="main main--start p-home">
        <Step2page escrowBlockchain={escrowBlockchain} account={account} actionEnabled={actionEnabled} walletconnection={walletconnection}
        assetsArray={assetsArray}
        escrowArray={escrowArray}
        txStatus={txStatus}  setTxStatus={setTxStatus}
        leadInvestorName={leadInvestorName} SetLeadInvestorName={SetLeadInvestorName}
        leadInvestorPercentage={leadInvestorPercentage} SetLeadInvestorPercentage={SetLeadInvestorPercentage}
        subInvestorCount={countOfSubInvestors} SetCountOFSubInvestors={SetCountOFSubInvestors}
        sellerName={sellerName} SetSellerName={SetSellerName}
        costofasset={costOfAsset} SetCostOfAsset={SetCostOfAsset}
         />          
      </main>

    </>
  )
}

export default EStep2
