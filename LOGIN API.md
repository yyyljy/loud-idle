# LOGIN API

## Goal : Using Kakao Login API Only with Doc 

## Kakao API

1. [개발자 페이지](https://developers.kakao.com/)
2. [개발자 문서](https://developers.kakao.com/docs/latest/ko/kakaologin/common)
3. [Kakao - Javascript](https://developers.kakao.com/docs/latest/ko/kakaologin/js)
4. ![카카오 로그인 과정](https://developers.kakao.com/docs/latest/ko/assets/style/images/kakaologin/kakaologin_sequence_js.png)



## AXIOS

1. [DOCUMENTS](https://axios-http.com/kr/docs/api_intro)

2. Axios API Reference

```javascript
// node.js에서 GET 요청으로 원격 이미지 가져오기
axios({
  method: 'get',
  url: 'http://bit.ly/2mTM3nY',
  responseType: 'stream'
})
  .then(function (response) {
    response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
  });
```



## ! 주의할 점 !

```
3시간 정도 고생끝에 원인을 찾아서 로그인에 성공했다.

온갖 실수를 다 저질렀고 다른 사람들은 나 같지 않길 바라며
하나하나 고친 과정을 적어보려한다.
```

- 401 오류 등 오류가 발생하면 아래 사항들을 체크해보길 권한다. (REACT node.js 환경)

1. Kakao = window.Kakao;

2. Kakao.Auth.authorize() 로 보내는 요청

```javascript
function loginWithKakao() {
    Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
    Kakao.isInitialized();
    Kakao.Auth.authorize({
      redirectUri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
    });
}
```

- Kakao.init()에 들어가는 키는 JAVASCRIPT_KEY 이다.

- redirectUri 는 내 애플리케이션에 설정한 Redirect URI로 한다.

3. redirect된 후 주소창을 보면 code값이 들어와있다.
   - CODE 다. Token이 아니다. (위에 로그인 과정 참고)
4. 여기서 나는 저 code값 읽어오는 방법을 잘 몰라 현재 주소값에서 분리했다.

```javascript
let redirectURL = window.location.href;
let codeRecv = redirectURL.split("code=");
if (codeRecv.length === 2) {
    codeRecv = codeRecv[1];
}
```

5. POST로 토큰 요청을 보낸다. 결론은 아래처럼 하면되고 ~~그 밑에 나열된 건 안봐도 된다.~~

```javascript
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
        console.log(res.data);
});
```

- ~~여기서 대부분의 시간을 보내며 고생했다.~~
- https://axios-http.com/kr/docs/intro 이 곳을 보고 코드를 짰는데
- ~~처음 참고한 코드~~는

```javascript
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

- https://axios-http.com/kr/docs/api_intro 여기에 들어가니 다른 코드가 있어서 아래 방식으로 진행

```javascript
// POST 요청 전송
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
```

- 401 오류가 발생해서 401 Unauthorized로 검색해보니 client_secret 이야기를 하는데

  내 어플리케이션에 아무리 찾아도 보안 메뉴는 물론 client_secret 설정도 없다.

- Kakao Docs를 다시 천천히 읽어보다가 아래의 부분이 눈에 들어왔다.

```
POST /oauth/token HTTP/1.1
Host: kauth.kakao.com
Content-type: application/x-www-form-urlencoded;charset=utf-8
```

- 안해본건 Content-type 뿐이 었기 때문에 다시 axios docs를 살펴보았다.
- https://axios-http.com/kr/docs/urlencoded
- 기본 방식은 application/json 방식이다. 그래서 오류가 발생했고 qs.stringfy를 이용해 해결했다.

