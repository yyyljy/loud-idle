import { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import RestAPI from "./RestAPI";

function KakaoAuth() {
  const Kakao = window.Kakao;

  const [tokenData, setTokenData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [scope, setScope] = useState(null);

  let redirectURL = window.location.href;
  let codeRecv = redirectURL.split("code=");

  async function loginKakao() {
    await Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY).throw((e) => {
      console.log(e);
    });
    await Kakao.isInitialized();
    await Kakao.Auth.authorize({
      redirectUri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
    });
    await function () {
      if (!tokenData) {
        const tokenCookie = document.cookie.split("authorize-access-token=");
        if (tokenCookie.length === 2) {
          setTokenData(tokenCookie[1]);
        }
      }
    };
    await Kakao.Auth.setAccessToken(tokenData);
    await Kakao.Auth.getStatusInfo()
      .then(function (res) {
        if (res.status === "connected") {
          console.log("login success");
          console.log(Kakao.Auth.getAccessToken());
        }
      })
      .catch(function (err) {
        console.log(err);
        Kakao.Auth.setAccessToken(null);
      });
  }

  // const getToken = async () => {
  //   try {
  //     if (codeRecv.length === 2) {
  //       codeRecv = codeRecv[1];
  //       const _url = "https://kauth.kakao.com/oauth/token";
  //       setError(null);
  //       setTokenData(null);
  //       setLoading(true);
  //       const config = {
  //         method: "POST",
  //         url: _url,
  //         data: qs.stringify({
  //           grant_type: "authorization_code",
  //           client_id: process.env.REACT_APP_KAKAO_RESTAPI_KEY,
  //           redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
  //           code: codeRecv,
  //         }),
  //       };
  //       RestAPI(config, setTokenData);
  //     }
  //   } catch (e) {
  //     setError(e);
  //     console.log(error);
  //   }
  //   setLoading(false);
  // };

  // const getUserData = async () => {
  //   if (tokenData) {
  //     const _url = "https://kapi.kakao.com/v2/user/me";
  //     const config = {
  //       method: "POST",
  //       url: _url,
  //       headers: {
  //         Authorization: "Bearer " + tokenData.access_token,
  //       },
  //     };
  //     RestAPI(config, setUserData);
  //   }
  // };

  // const getScope = async () => {
  //   if (userData) {
  //     const config = {
  //       headers: {
  //         Authorization: "Bearer " + tokenData.access_token,
  //       },
  //       url: "https://kapi.kakao.com/v2/user/scopes",
  //       method: "GET",
  //     };
  //     RestAPI(config, setScope);
  //   }
  // };

  // const getAgreement = async () => {
  //   if (userData) {
  //     const res = await axios({
  //       url: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_RESTAPI_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}/scope&response_type=code&scope=account_email,gender,profile`,
  //     });
  //     console.log(res);
  //   }
  // };

  useEffect(() => {
    // if (!tokenData) {
    //   getToken();
    // }
    // if (tokenData && !userData) {
    //   getUserData();
    //   getAgreement();
    // }
    // if (!scope) {
    //   // getAdditionalAgreement();
    // }
  }, [tokenData, userData]);

  // const getAdditionalAgreement = async () => {
  //   Kakao.API.request({
  //     url: "/v2/user/me",
  //   })
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  return (
    <>
      <button
        id="custom-login-btn"
        onClick={() => {
          loginKakao();
        }}
      >
        <img
          src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
          width="222"
          alt="kakao-login-img"
        />
      </button>
      <p>
        {tokenData
          ? `Access Token : ${tokenData.access_token}`
          : "Please Login"}
      </p>
      <p>{userData ? `UserID : ${userData.id}` : "Please Login"}</p>
      <p>{scope ? `Response : ${scope}` : "Please Login"}</p>
      {/* <button
        onClick={() => {
          getAdditionalAgreement();
        }}
      >
        추가 동의 받기
      </button> */}
    </>
  );
}

export default KakaoAuth;
