import { useEffect, useState } from "react";
import axios from "axios";
import qs from "qs";

function KakaoAuth() {
  const Kakao = window.Kakao;

  let redirectURL = window.location.href;
  let codeRecv = redirectURL.split("code=");

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendToken = async () => {
    try {
      if (codeRecv.length === 2) {
        codeRecv = codeRecv[1];
      }
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
        console.log(`access_token:${res}`);
      });
      setData(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    sendToken();
  }, []);

  let htmlMsg = "";
  if (loading) htmlMsg = <div>로딩중..</div>;
  if (error) htmlMsg = <div>에러가 발생했습니다</div>;
  if (!data) {
    htmlMsg = null;
  } else {
    htmlMsg = <div>{data}</div>;
  }

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
