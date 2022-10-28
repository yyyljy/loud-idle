import qs from "qs";
import axios from "axios";

async function RestAPI(_method, _url, _data, setData) {
  const res = "EMPTY";
  const config = {
    method: _method,
    url: _url,
    data: qs.stringify(_data),
  };
  await axios(config)
    .then((response) => {
      setData(response.data);
      return true;
    })
    .catch((e) => {
      setData(e);
      return false;
    });
}

export default RestAPI;
