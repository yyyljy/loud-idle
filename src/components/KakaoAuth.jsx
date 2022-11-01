import { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import RestAPI from "./RestAPI";

function KakaoAuth() {
  const Kakao = window.Kakao;
  const [userObj, setUserObj] = useState({
    code: "",
    access_token: "",
    refresh_token: "",
    id: "",
    email: "",
    profile_url: "",
    thumbnail_url: "",
    age_range: "",
    gender: "",
  });
  const [tokenData, setTokenData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [scope, setScope] = useState(null);

  async function loginKakao() {
    await Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
    await Kakao.isInitialized();
    await Kakao.Auth.authorize({
      redirectUri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
    });
  }

  useEffect(() => {
    let redirectURL = window.location.href;
    let codeURI = redirectURL.split("code=");
    let code = "";
    if (codeURI.length === 2) {
      code = codeURI[1];
      setUserObj({ ...userObj, code: code });
      console.log(userObj);
    }

    async function getToken() {
      try {
        if (code) {
          const _url = "https://kauth.kakao.com/oauth/token";
          const config = {
            method: "POST",
            url: _url,
            data: qs.stringify({
              grant_type: "authorization_code",
              client_id: process.env.REACT_APP_KAKAO_RESTAPI_KEY,
              redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
              code: code,
            }),
          };
          await RestAPI(config, setTokenData);
        }
      } catch (e) {
        setError(e);
        console.log(error);
      }
    }

    async function setToken() {
      try {
        if (tokenData) {
          let result = "";
          if (await Kakao.isInitialized()) {
            await Kakao.Auth.setAccessToken(tokenData.setAccessToken);
            await Kakao.Auth.getAccessToken();
            result = Kakao.Auth.getStatusInfo();
          } else {
            Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
            await Kakao.Auth.setAccessToken(tokenData.access_token);
            await Kakao.Auth.getAccessToken();
            result = Kakao.Auth.getStatusInfo(({ status, _result }) => {
              console.log(status);
              console.log(_result);
            });
            console.log(result);
            console.log(result["_result"]);
            // console.log(result._result);
            // console.log(result.result);
            console.log(result.valueOf());
          }
          setUserObj({ ...userObj, id: result });
          console.log(userObj);
          console.log(result.kakao_account);
        }
      } catch (e) {
        setError(e);
        console.log(e);
      }
    }

    if (code) {
      if (!tokenData) {
        getToken();
      } else {
        setUserObj({
          ...userObj,
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token,
        });
        console.log(userObj);
        setToken();
      }
    }
  }, [tokenData]);

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
      <button onClick={() => {}}>추가 동의 받기</button>
    </>
  );
}

export default KakaoAuth;
