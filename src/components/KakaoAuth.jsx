import { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import { getAdditionalUserInfo } from "firebase/auth";
import { async } from "@firebase/util";

function KakaoAuth() {
  const Kakao = window.Kakao;

  const [tokenData, setTokenData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let redirectURL = window.location.href;
  let codeRecv = redirectURL.split("code=");

  function loginKakao() {
    Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
    Kakao.isInitialized();
    Kakao.Auth.authorize({
      redirectUri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
    }).then(() => {
      console.log("test");
    });
  }

  const getToken = async () => {
    try {
      if (codeRecv.length === 2) {
        setError(null);
        setTokenData(null);
        setLoading(true);
        codeRecv = codeRecv[1];
        const _url = "https://kauth.kakao.com/oauth/token";
        const config = {
          method: "POST",
          url: _url,
          data: qs.stringify({
            grant_type: "authorization_code",
            client_id: process.env.REACT_APP_KAKAO_RESTAPI_KEY,
            redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
            code: codeRecv,
          }),
        };
        await axios(config).then((res) => {
          const result = res.data;
          setTokenData(result);
          console.log(res);
        });
      }
    } catch (e) {
      setError(e);
      console.log(error);
    }
    setLoading(false);
  };

  // GET/POST /v2/user/me HTTP/1.1
  // Host: kapi.kakao.com
  // Authorization: Bearer ${ACCESS_TOKEN}/KakaoAK ${APP_ADMIN_KEY}
  // Content-type: application/x-www-form-urlencoded;charset=utf-8

  const getUserInfo = async () => {
    console.log(Kakao.API.request());
    if (tokenData) {
      const _url = "https://kapi.kakao.com/v2/user/me";
      const config = {
        method: "POST",
        url: _url,
        header: {
          Authorization: "Bearer " + tokenData.access_token,
        },
        data: qs.stringify({
          target_id_type: "user_id",
          target_id: tokenData.id,
        }),
      };
      await axios(config)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  useEffect(() => {
    getToken();
    getUserInfo();
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
      {`Token Value : ${tokenData ? tokenData.access_token : "Please Login"}`}
    </>
  );
}

export default KakaoAuth;
