import { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import RestAPI from "./RestAPI";

function KakaoAuth() {
  const Kakao = window.Kakao;

  const user = {
    code: "",
    access_token: "",
    refresh_token: "",
    kakao_id: "",
    email: "",
    profile_url: "",
    thumbnail_url: "",
    age_range: "",
    gender: "",
  };

  const [userObj, setUserObj] = useState(user);
  const [tokenData, setTokenData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
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

    async function token() {
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
          setUserObj({
            ...userObj,
            access_token: tokenData.access_token,
            refresh_token: tokenData.refresh_token,
          });
          console.log(userObj);
        }
      } catch (e) {
        setError(e);
        console.log(error);
      }
      setLoading(false);
    }

    async function setToken() {
      try {
        if (tokenData) {
          console.log(Kakao.isInitialized());
          if (await Kakao.isInitialized()) {
            await Kakao.Auth.setAccessToken(tokenData.setAccessToken);
            await Kakao.Auth.getAccessToken();
            console.log("test3");
            await Kakao.Auth.getStatusInfo();
            console.log("test4");
          } else {
            console.log("???");
            Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
            console.log("test5");
            await Kakao.Auth.setAccessToken(tokenData.access_token);
            console.log("test6");
            const obj = "";
            await Kakao.Auth.getAccessToken();
            obj = Kakao.Auth.getStatusInfo();
            console.log(obj);
          }
        }
      } catch (e) {
        setError(e);
        console.log(e);
      }
    }

    if (code) {
      if (!tokenData) token();
    }
    if (tokenData) {
      setToken();
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
