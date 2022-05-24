import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";

type Props = {
  handleOpenModal: any;
  walletconnection: () => void;
};
const ConnectButton: React.FC<Props> = ({ handleOpenModal,  walletconnection}) => {

// export default function ConnectButton({ handleOpenModal,walletConnection }: Props) {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  function handleConnectWallet() {
    activateBrowserWallet();
    walletconnection();
    // walletConnection
  }

  return account ? (
    <>
    <button type="button" className="btn btn-primary mb-1" onClick={handleOpenModal}>{account &&
      `${account.slice(0, 6)}...${account.slice(
        account.length - 4,
        account.length
      )}`}</button>
		<p className="mb-0 fs-6 fw-bold lh-1 text-muted">{etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH</p>
    </>
  ) : (
    <button type="button" onClick={handleConnectWallet} className="btn btn-primary mb-1">Connect Wallet</button>
  );
}

export default ConnectButton
