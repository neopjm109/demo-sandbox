import axios from "axios";
import AxiosBody from "./page.body";

const fetchData = async () => {
  let res = await axios(
    'http://localhost:9999/api/test',
    {
      headers: {
        "Content-type": "application/json"
      },
      method: "POST"
    }
  );
  return res.data;
}

export default async function Axios() {
  const data = await fetchData();
  return <AxiosBody data={ data }/>;
}
