import { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import RestAPI from "./RestAPI";

function KakaoAuth() {
  const Kakao = window.Kakao;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let redirectURL = window.location.href;
  let codeRecv = redirectURL.split("code=");

  const sendToken = async () => {
    try {
      if (codeRecv.length === 2) {
        setError(null);
        setData(null);
        setLoading(true);
        codeRecv = codeRecv[1];
        const _url = "https://kauth.kakao.com/oauth/token";
        // const config = {
        //   method: "POST",
        //   url: "https://kauth.kakao.com/oauth/token",
        //   data: qs.stringify({
        //     grant_type: "authorization_code",
        //     client_id: process.env.REACT_APP_KAKAO_RESTAPI_KEY,
        //     redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
        //     code: codeRecv,
        //   }),
        // };
        // await axios(config).then((res) => {
        //   setData(res.data);
        // });
        const _data = {
          grant_type: "authorization_code",
          client_id: process.env.REACT_APP_KAKAO_RESTAPI_KEY,
          redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
          code: codeRecv,
        };
        if (RestAPI("POST", _url, _data, setData)) {
          console.log("SUCCESS");
          console.log(data);
        } else {
          console.log("FAILED");
          console.log(data);
        }
        console.log(data);
      }
    } catch (e) {
      setError(e);
      console.log(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    sendToken();
  }, []);

  function loginWithKakao() {
    Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
    Kakao.isInitialized();
    Kakao.Auth.authorize({
      redirectUri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
    }).then(() => {
      console.log("test");
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
      {`Token Value : ${data}`}
    </>
  );
}

export default KakaoAuth;
