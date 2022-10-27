# LOGIN API

## Goal : Using Kakao Login API Only with Doc 

## Kakao API

1. [개발자 페이지](https://developers.kakao.com/)
2. [개발자 문서](https://developers.kakao.com/docs/latest/ko/kakaologin/common)
3. [Javascript](https://developers.kakao.com/docs/latest/ko/kakaologin/js)
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

