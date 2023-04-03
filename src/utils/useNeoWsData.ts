import { useState, useEffect } from "preact/hooks";
import type { operations, components } from "../../neows-schema";

export type NearEarthObject = components["schemas"]["NearEarthObject"];

export type NeoFeedTodayData =
  operations["retrieveNEOFeedToday"]["responses"][200]["content"]["application/json"];

const NEOWSURL = "https://www.neowsapp.com/rest/v1/feed";
const API_KEY = import.meta.env.PUBLIC_NASA_API_KEY;

const isDev = import.meta.env.DEV;

export default function useNeoWsData() {
  const [data, setData] = useState<NeoFeedTodayData>();

  useEffect(() => {
    // use local data when in dev, faster and saves API quota
    const dataFromLs = localStorage.getItem("devData");

    if (isDev && dataFromLs) {
      const localData = JSON.parse(dataFromLs);
      setData(localData);
      console.log("loaded data for dev");

      return;
    }

    async function fetchData() {
      const res = await fetch(`${NEOWSURL}/today?&api_key=${API_KEY}`);
      const data: NeoFeedTodayData = await res.json();

      setData(data);

      // save a data sample in localStorage for dev environment
      if (isDev && !dataFromLs) {
        localStorage.setItem("devData", JSON.stringify(data));
      }
    }

    fetchData();
  }, []);

  return data;
}
