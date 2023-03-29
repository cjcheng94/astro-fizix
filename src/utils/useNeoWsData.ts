import { useState, useEffect } from "preact/hooks";
import type { operations } from "../../neows-schema";

const NEOWSURL = "http://www.neowsapp.com/rest/v1/feed";
const API_KEY = import.meta.env.NASA_API_KEY;
// const START_DATE = "2023-03-29";
// const END_DATE = "2023-03-30";

type Data =
  | operations["retrieveNEOFeedToday"]["responses"][200]["content"]["application/json"]
  | null;

export default function useNeoWsData() {
  const [data, setData] = useState<Data>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${NEOWSURL}/today?&api_key=${API_KEY}`);
      const data: Data = await res.json();

      setData(data);
    }
    fetchData();
  }, []);

  return data;
}
