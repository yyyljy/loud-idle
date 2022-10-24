import detectEthereumProvider from "@metamask/detect-provider";
import { useState } from "react";

async function MetamaskAuth() {
  const [data, setdata] = useState({
    address: "0x9f6a0be1f3aEF6D826d98f8A2D865acbfBb467D0", // Stores address
    Balance: undefined, // Stores balance
  });
  if (window.ethereum) {
    console.log("metamask extension!!");
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [data.address, "latest"],
      })
      .then((balance) => {
        // Return string value to convert it into int balance
        console.log(balance);

        // Yarn add ethers for using ethers utils or
        // npm install ethers
        // console.log(ethers.utils.formatEther(balance));
        // Format the string into main latest balance
      });
  } else {
    alert("install metamask extension!!");
  }
  const provider = await detectEthereumProvider();

  if (provider) {
    console.log("Ethereum successfully detected!");
    // console.log(provider);
    ////////////////////////
    const chainId = await provider.request({
      method: "eth_chainId",
    });
  } else {
    // if the provider is not detected, detectEthereumProvider resolves to null
    console.error("Please install MetaMask!", "error");
  }

  return (
    <>
      <script src="https://unpkg.com/@metamask/detect-provider/dist/detect-provider.min.js"></script>
      <script type="text/javascript">
        const provider = await detectEthereumProvider() if (provider){" "}
        {
          // handle provider
        }{" "}
        else{" "}
        {
          // handle no provider
        }
      </script>
    </>
  );
}

export default MetamaskAuth;
