// import { Button } from "@nextui-org/react";

// function NaverAuth() {
//   let express = require("express");
//   let app = express();
//   let client_id = process.env.REACT_APP_NAVER_CLIENT_ID;
//   let client_secret = process.env.REACT_APP_NAVER_CLIENT_SECRET;
//   let state = "RANDOM_STATE";
//   let redirectURI = encodeURI("https://loud-idle.vercel.app/");
//   let api_url = "";
//   app.get("/naverlogin", function (req, res) {
//     api_url =
//       "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" +
//       client_id +
//       "&redirect_uri=" +
//       redirectURI +
//       "&state=" +
//       state;
//     res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
//     res.end(
//       "<a href='" +
//         api_url +
//         "'><img height='50' src='http://static.nid.naver.com/oauth/small_g_in.PNG'/></a>"
//     );
//   });
//   app.get("/callback", function (req, res) {
//     let code = req.query.code;
//     state = req.query.state;
//     api_url =
//       "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=" +
//       client_id +
//       "&client_secret=" +
//       client_secret +
//       "&redirect_uri=" +
//       redirectURI +
//       "&code=" +
//       code +
//       "&state=" +
//       state;
//     let request = require("request");
//     let options = {
//       url: api_url,
//       headers: {
//         "X-Naver-Client-Id": client_id,
//         "X-Naver-Client-Secret": client_secret,
//       },
//     };
//     request.get(options, function (error, response, body) {
//       if (!error && response.statusCode == 200) {
//         res.writeHead(200, {
//           "Content-Type": "text/json;charset=utf-8",
//         });
//         res.end(body);
//       } else {
//         res.status(response.statusCode).end();
//         console.log("error = " + response.statusCode);
//       }
//     });
//   });
//   app.listen(3000, function () {
//     console.log("http://127.0.0.1:3000/naverlogin app listening on port 3000!");
//   });

//   return (
//     <>
//       <Button onClick={NaverAuth()}>Naver Login</Button>
//     </>
//   );
// }

// export default NaverAuth;
