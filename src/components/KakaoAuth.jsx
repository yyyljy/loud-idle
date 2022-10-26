function KakaoAuth() {
  const Kakao = window.Kakao;

  function loginWithKakao() {
    Kakao.init(process.env.REACT_APP_KAKAO_KEY);
    Kakao.isInitialized();
    Kakao.Auth.authorize({
      redirectUri: "https://loud-idle.vercel.app" /* redirect되는 URL */,
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
        />
      </button>
    </>
  );
}

export default KakaoAuth;
