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

  function loginKakao() {
    Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
    Kakao.isInitialized();
    Kakao.Auth.authorize({
      redirectUri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
    });
  }

  const getToken = async () => {
    try {
      if (codeRecv.length === 2) {
        codeRecv = codeRecv[1];
        const _url = "https://kauth.kakao.com/oauth/token";
        setError(null);
        setTokenData(null);
        setLoading(true);
        const config = {
          method: "POST",
          url: _url,
          data: qs.stringify({
            grant_type: "authorization_code",
            client_id: process.env.REACT_APP_KAKAO_RESTAPI_KEY,
            redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
            code: codeRecv,
            // scope: "account_email, gender",
          }),
        };
        RestAPI(config, setTokenData);
      }
    } catch (e) {
      setError(e);
      console.log(error);
    }
    setLoading(false);
  };

  const getUserData = async () => {
    if (tokenData) {
      const _url = "https://kapi.kakao.com/v2/user/me";
      const config = {
        method: "POST",
        url: _url,
        headers: {
          Authorization: "Bearer " + tokenData.access_token,
        },
      };
      RestAPI(config, setUserData);
    }
  };

  const getScope = async () => {
    if (userData) {
      const config = {
        headers: {
          Authorization: "Bearer " + tokenData.access_token,
        },
        url: "https://kapi.kakao.com/v2/user/scopes",
        method: "GET",
      };
      RestAPI(config, setScope);
    }
  };

  useEffect(() => {
    if (!tokenData) {
      getToken();
      console.log(tokenData);
    }
    if (tokenData && !userData) {
      getUserData();
    }
    if (tokenData && userData && !respon) {
      getScope();
    }
  }, [tokenData, userData, scope]);

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
    </>
  );
}

export default KakaoAuth;
