import { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import RestAPI from "./RestAPI";
// https://developers.kakao.com/sdk/reference/js/release/index.html

let user = {
  code: "",
  access_token: "",
  refresh_token: "",
  id: "",
  email: "",
  profile_image_url: "",
  thumbnail_image_url: "",
  age_range: "",
  gender: "",
  connected_at: "",
};

function KakaoAuth() {
  const Kakao = window.Kakao;
  const [userObj, setUserObj] = useState(user);
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
          if (await Kakao.isInitialized()) {
            await Kakao.Auth.setAccessToken(tokenData.setAccessToken);
            // await Kakao.Auth.getAccessToken();
            await Kakao.Auth.getStatusInfo();
          } else {
            Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
            await Kakao.Auth.setAccessToken(tokenData.access_token);
            // await Kakao.Auth.getAccessToken();
            await Kakao.Auth.getStatusInfo()
              .then((res) => {
                if (res.status === "connected") {
                  return res.user;
                } else {
                  console.log("NOT CONNECTED");
                }
              })
              .then((res) => {
                console.log(res);
                const _user = {
                  ...user,
                  connected_at: res.connected_at,
                  id: res.id,
                  age_range: res.age_range,
                  gender: res.gender,
                  profile_image_url: res.profile_image_url,
                  thumbnail_image_url: res.thumbnail_image_url,
                };
                setUserObj(_user);
              });
          }
          console.log(`userObj:${userObj.id}`);
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
      <p>{userObj ? `UserID : ${userObj.id}` : "Please Login"}</p>
      <p>{scope ? `Response : ${scope}` : "Please Login"}</p>
      <button onClick={() => {}}>?????? ?????? ??????</button>
    </>
  );
}

export default KakaoAuth;
