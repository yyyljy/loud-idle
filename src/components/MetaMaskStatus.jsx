import { useMetaMask } from "metamask-react";

function MetaMaskStatus() {
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  console.log(`status: ${status}`);
  console.log(`connect: ${connect}`);
  console.log(`account: ${account}`);
  console.log(`chainId: ${chainId}`);
  console.log(`ethereum: ${ethereum}`);

  if (status === "initializing")
    return <div>Synchronisation with MetaMask ongoing...</div>;

  if (status === "unavailable") return <div>MetaMask not available :(</div>;

  if (status === "notConnected")
    return <button onClick={connect}>Connect to MetaMask</button>;

  if (status === "connecting") return <div>Connecting...</div>;

  if (status === "connected")
    return (
      <div>
        Connected account {account} on chain ID {chainId}
      </div>
    );

  return null;
}

export default MetaMaskStatus;
