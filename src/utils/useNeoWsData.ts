import { useState, useEffect } from "preact/hooks";
import type { operations, components } from "../../neows-schema";

export type NearEarthObject = components["schemas"]["NearEarthObject"];

export type NeoFeedTodayData =
  operations["retrieveNEOFeedToday"]["responses"][200]["content"]["application/json"];

const NEOWSURL = "http://www.neowsapp.com/rest/v1/feed";
const API_KEY = import.meta.env.PUBLIC_NASA_API_KEY;

export default function useNeoWsData() {
  const [data, setData] = useState<NeoFeedTodayData>();

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${NEOWSURL}/today?&api_key=${API_KEY}`);

      const data: NeoFeedTodayData = await res.json();

      setData(data);
    }
    fetchData();
  }, []);

  return data;
}
