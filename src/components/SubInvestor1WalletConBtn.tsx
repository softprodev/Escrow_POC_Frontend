import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";

import styled from 'styled-components'
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

type Props = {
  handleOpenModal: any;
  setWalletType: (walletType: number) => void;
  walletType: number;
  walletconnection: () => void;
};
const SubInvestor1WalletConBtn: React.FC<Props> = ({ handleOpenModal,setWalletType,walletType,  walletconnection}) => {

// export default function ConnectButton({ handleOpenModal,walletConnection }: Props) {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  function handleConnectWallet() {

    activateBrowserWallet();
    walletconnection();
    setWalletType(2);
    console.log("current selected Wallet Type : ", 2);
    console.log("Wallet Type : ",walletType);
  }

  return account ? (
    <>
      {walletType == 2 ? 
          <>
                  <button type="button" className="btn btn-primary mb-1" onClick={handleOpenModal}>{account &&
              `${account.slice(0, 6)}...${account.slice(
                  account.length - 4,
                  account.length
              )}`}</button>
                  <p className="mb-0 fs-6 fw-bold lh-1 text-muted">{etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH</p>
          </> 
      : 
          <>
              <StyledStepButton type="button" onClick={handleConnectWallet} className="btn btn-primary mb-1">Attach Sub 1 Wallet</StyledStepButton>
          </>
      }    
    </>
  ) : (
    <StyledStepButton type="button" onClick={handleConnectWallet} className="btn btn-primary mb-1">Attach Sub 1 Wallet</StyledStepButton>
  );
}

export default SubInvestor1WalletConBtn
