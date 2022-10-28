import axios from "axios";

async function RestAPI(_config, setData) {
  await axios(_config)
    .then((response) => {
      setData(response.data);
    })
    .catch((e) => {
      setData(e);
    });
}

export default RestAPI;
