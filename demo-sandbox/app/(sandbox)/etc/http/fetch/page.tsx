import FetchBody from "./page.body";

const fetchData = async () => {
  let res = await fetch(
    'http://localhost:9999/api/test',
    {
      headers: {
        "Content-type": "application/json"
      },
      method: "POST"
    }
  );

  if (res.ok) {
    return res.json();
  }
  return null;
}

export default async function Fetch() {
  const data = await fetchData();
  return <FetchBody data={ data }/>;
}
