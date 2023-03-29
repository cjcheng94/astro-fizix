import { h } from "preact";
import useNeoWsData, {
  NeoFeedTodayData,
  NearEarthObject
} from "../utils/useNeoWsData";
import AsteroidCard from "./AsteroidCard";

const getNeosList = (dateString: string, data?: NeoFeedTodayData) => {
  if (!data) {
    return [];
  }

  return data?.near_earth_objects?.[dateString];
};

const getCloseApproachDate = (nearEarthObject: NearEarthObject) => {
  const date =
    nearEarthObject?.close_approach_data?.[0].epoch_date_close_approach;

  return date ?? 0;
};

export default function Asteroid() {
  const data = useNeoWsData();

  // Get today's YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const neoList = getNeosList(today, data);

  const neosByTimeline = neoList?.sort(
    (a, b) => getCloseApproachDate(a) - getCloseApproachDate(b)
  );

  return (
    <div class="container border-4 border-white my-8 p-4">
      <h1 class="text-3xl text-lime-300 text-center font-mono">
        Asteroid Watch
      </h1>
      {data ? (
        <p class="text-2xl text-center font-mono text-white mt-4">
          <span>There are</span>
          <span class="text-red-400"> {data.element_count} </span>
          <span>NEOs making their close approach today</span>
        </p>
      ) : (
        <p class="text-2xl text-center font-mono text-red-400 mt-4">
          Loading...
        </p>
      )}
      <div>
        {neosByTimeline?.map(neo => (
          <AsteroidCard {...neo} key={neo.id} />
        ))}
      </div>
    </div>
  );
}
