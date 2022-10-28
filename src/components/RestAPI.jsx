import qs from "qs";
import axios from "axios";
import { useState } from "react";

async function RestAPI(_method, _url, _data, setData) {
  const [res, setRes] = useState("");
  const config = {
    method: _method,
    url: _url,
    data: qs.stringify(_data),
  };
  await axios(config)
    .then((response) => {
      setRes(response.data);
    })
    .catch((e) => {
      setRes(e);
    });
  setData(res);
}

export default RestAPI;
