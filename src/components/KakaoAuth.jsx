import { useEffect, useState } from "react";
import axios from "axios";

function KakaoAuth() {
  const Kakao = window.Kakao;

  let redirectURL = window.location.href;
  let codeRecv = redirectURL.split("code=");
  if (codeRecv.length === 2) {
    codeRecv = codeRecv[1];
    axios
      .post({
        method: "post",
        url: "https://kauth.kakao.com/oauth/token",
        data: {
          grant_type: "authorization_code",
          client_id: process.env.REACT_APP_KAKAO_APP_ID,
          redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
          code: codeRecv,
        },
      })
      .then(function (response) {
        console.log(response);
      });
  }

  // const [isKakaoLoggedIn, setIsKakaoLoggedIn] = useState(false);
  // const [kakaoToken, setkakaoToken] = useState("");

  // useEffect(() => {
  //   console.log("test");
  //   if (!isKakaoLoggedIn) {
  //     return;
  //   } else {
  //     async function displayToken() {
  //       setkakaoToken = getCookie("authorize-access-token");

  //       console.log("test");
  //       if (kakaoToken) {
  //         await Kakao.Auth.setAccessToken(kakaoToken);
  //         await Kakao.Auth.getStatusInfo()
  //           .then(function (res) {
  //             if (res.status === "connected") {
  //               setIsKakaoLoggedIn(true);
  //               document.getElementById("token-result").innerText =
  //                 "login success, token: " + Kakao.Auth.getAccessToken();
  //             }
  //           })
  //           .catch(function (err) {
  //             Kakao.Auth.setAccessToken(null);
  //           });
  //       }
  //     }

  //     function getCookie(name) {
  //       let parts = document.cookie.split(name + "=");
  //       if (parts.length === 2) {
  //         return parts[1].split(";")[0];
  //       }
  //     }
  //     displayToken();
  //   }
  // }, [isKakaoLoggedIn, kakaoToken]);

  function loginWithKakao() {
    Kakao.init(process.env.REACT_APP_KAKAO_KEY);
    Kakao.isInitialized();
    Kakao.Auth.authorize({
      redirectUri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
    }).then(() => {
      console("this is test");
    });
  }

  return (
    <>
      <button
        id="custom-login-btn"
        onClick={() => {
          loginWithKakao();
        }}
      >
        <img
          src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
          width="222"
          alt="kakao-login-img"
        />
      </button>
      {/* <button>{`Token Value : ${kakaoToken}`}</button> */}
    </>
  );
}

export default KakaoAuth;
