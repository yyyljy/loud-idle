import { useEffect, useState } from "react";
import { icon } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@nextui-org/react";

function MetamaskAuth() {
  const ethereum = window.ethereum;
  const [address, setAddress] = useState("");
  const [server, setServer] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [htmlMsg, setHtmlMsg] = useState("");

  useEffect(() => {
    function MetaMaskRender() {
      if (!isConnected) {
        return setHtmlMsg(
          <div>
            <Button
              onClick={() => {
                MetaMaskLogin();
              }}
            >
              Connect to MetaMask
            </Button>
          </div>
        );
      } else {
        return setHtmlMsg(
          <div>
            <p>Your Address : {address}</p>
            <p>Your Server : {serverName(server)}</p>
          </div>
        );
      }
    }
    MetaMaskRender();
  }, [address, server, isConnected]);

  function MetaMaskLogin() {
    if (!ethereum.isMetaMask) {
      alert("install metamask extension!!");
    } else {
      ethereum
        .request({ method: "eth_requestAccounts" })
        .then(() => {
          setAddress(ethereum.selectedAddress);
          setServer(ethereum.networkVersion);
          setIsConnected(true);
        })
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
  }

  function serverName(_serverName) {
    const [
      Mainnet,
      RopstenTestNetwork,
      RinkebyTestNetwork,
      GoerliTestNetwork,
      KovanTestNetwork,
    ] = ["1", "3", "4", "5", "42"];
    switch (_serverName) {
      case Mainnet:
        return "Mainnet";
      case RopstenTestNetwork:
        return "Ropsten Test Network";
      case RinkebyTestNetwork:
        return "Rinkeby Test Network";
      case GoerliTestNetwork:
        return "Goerli Test Network";
      case KovanTestNetwork:
        return "Kovan Test Network";
      default:
        return "Please Check Your Server";
    }
  }

  return <>{htmlMsg}</>;
}

export default MetamaskAuth;
