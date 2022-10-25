import detectEthereumProvider from "@metamask/detect-provider";
import { useEffect, useState } from "react";
// import MetaMaskStatus from "./MetaMaskStatus";
import { useMetaMask } from "metamask-react";
// import MetaMaskStatus from "./MetaMaskStatus";

function MetamaskAuth() {
  const [data, setdata] = useState({
    address: "0x9f6a0be1f3aEF6D826d98f8A2D865acbfBb467D0", // Stores address
    Balance: undefined, // Stores balance
  });

  useEffect(() => {
    async function isMetamaskInstalled() {
      if (window.ethereum) {
        window.ethereum
          .request({
            method: "eth_getBalance",
            params: [data.address, "latest"],
          })
          .then((balance) => {
            console.log(balance);
          });
      } else {
        alert("install metamask extension!!");
      }
      const provider = await detectEthereumProvider();

      if (provider) {
        console.log("Ethereum successfully detected!");
        const chainId = await provider.request({
          method: "eth_chainId",
        });
      } else {
        // if the provider is not detected, detectEthereumProvider resolves to null
        console.error("Please install MetaMask!", "error");
      }
    }
    isMetamaskInstalled();
  }, [data]);

  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const [msg, setMsg] = useState("");
  useEffect(() => {
    async function MetaMaskStatus() {
      console.log(`status: ${status}`);
      console.log(`connect: ${connect}`);
      console.log(`account: ${account}`);
      console.log(`chainId: ${chainId}`);
      console.log(`ethereum: ${ethereum}`);
      window.ethereum.on("connect", () => {
        alert("DDDDDDIsconnect");
      });

      await connect;
      if (status === "initializing")
        setMsg(<div>Synchronization with MetaMask ongoing...</div>);

      if (status === "unavailable")
        setMsg(<div>MetaMask not available :(</div>);

      if (status === "notConnected")
        setMsg(<button onClick={connect}>Connect to MetaMask</button>);

      if (status === "connecting") setMsg(<div>Connecting...</div>);

      if (status === "connected")
        setMsg(
          <>
            <div>
              Connected account {account} on chain ID {chainId}
            </div>
            <div>
              <button
                onClick={() => {
                  alert("Disconnect! (Not dev yet)");
                }}
              >
                Disconnect MetaMask
              </button>
            </div>
          </>
        );
      return null;
    }
    MetaMaskStatus();
    connect();
  }, [status]);

  return <>{msg}</>;
}

function connect() {
  window.ethereum
    .request({ method: "eth_requestAccounts" })
    .then(alert("handleAccountsChanged"))
    .catch((err) => {
      if (err.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        console.log("Please connect to MetaMask.");
      } else {
        console.error(err);
      }
    });
}

export default MetamaskAuth;
