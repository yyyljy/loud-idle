import { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";
import RestAPI from "./RestAPI";

function KakaoAuth() {
  const Kakao = window.Kakao;
  const _url = "https://kauth.kakao.com/oauth/token";
  const _sendData = "";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  let redirectURL = window.location.href;
  let codeRecv = redirectURL.split("code=");

  const sendToken = async () => {
    console.log("sendToken");
    try {
      console.log("try");
      if (codeRecv.length === 2) {
        _sendData = {
          grant_type: "authorization_code",
          client_id: process.env.REACT_APP_KAKAO_RESTAPI_KEY,
          redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
          code: codeRecv[1],
        };
        setError(null);
        setData(null);
        setLoading(true);
        const config = {
          method: "POST",
          url: "https://kauth.kakao.com/oauth/token",
          data: qs.stringify({
            grant_type: "authorization_code",
            client_id: process.env.REACT_APP_KAKAO_RESTAPI_KEY,
            redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
            code: codeRecv,
          }),
        };
        const response = await axios(config).then((res) => {
          setData(response.data);
          console.log(data);
        });
      }
    } catch (e) {
      setError(e);
      console.log("ERROR?!!?!?");
    }
    setLoading(false);
    console.log(data);
  };

  useEffect(() => {
    sendToken();
  }, []);

  function loginWithKakao() {
    Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
    Kakao.isInitialized();
    Kakao.Auth.authorize({
      redirectUri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
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
