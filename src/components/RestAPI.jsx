import qs from "qs";
import axios from "axios";

async function RestAPI(_method, _url, _data, setData) {
  alert("testasdasd");
  const res = { code: "", data: "" };
  const config = {
    method: _method,
    url: _url,
    data: qs.stringify(_data),
  };
  await axios(config)
    .then((response) => {
      res.code = "SUCCESS";
      res.data = response.data;
      setData(res);
      alert(res);
      return true;
    })
    .catch((e) => {
      res.code = "ERROR";
      res.data = e;
      console.log(res);
      return false;
    });
}

export default RestAPI;
