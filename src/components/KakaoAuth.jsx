import { useEffect, useState } from "react";
import axios from "axios";

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
      console.log(codeRecv);
      setError(null);
      setData(null);
      setLoading(true);
      const config = {
        method: "post",
        url: "https://kauth.kakao.com/oauth/token",
        data: {
          grant_type: "authorization_code",
          client_id: process.env.REACT_APP_KAKAO_RESTAPI_KEY,
          redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
          code: codeRecv,
        },
        headers: {
          "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      };
      console.log(config);
      const response = await axios(config).then((res) => {
        console.log(res);
        console.log(`data:${res.data}`);
      });
      setData(response.data);
    } catch (e) {
      setError(e);
      console.log(e);
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
    Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
    Kakao.isInitialized();
    Kakao.Auth.authorize({
      redirectUri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
    }).then((res) => {
      console.log(res);
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
