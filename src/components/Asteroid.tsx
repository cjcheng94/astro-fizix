import { h } from "preact";
import { useState, useMemo } from "preact/hooks";

import useNeoWsData, {
  NeoFeedTodayData,
  NearEarthObject
} from "../utils/useNeoWsData";

import AsteroidCard from "./AsteroidCard";
import Button from "./Button";

const getNeosList = (data?: NeoFeedTodayData) => {
  let neosList: NearEarthObject[] = [];

  if (!data) {
    return neosList;
  }

  // there's actually only one key which is today's date in YYY-MM-DD format
  // but to keep this function pure, we spread the object instead
  for (const key in data.near_earth_objects) {
    neosList = [...neosList, ...data.near_earth_objects[key]!];
  }

  return neosList;
};

const getCloseApproachData = (nearEarthObject: NearEarthObject) =>
  nearEarthObject.close_approach_data![0];

const getRelativeSpeed = (nearEarthObject: NearEarthObject) =>
  parseFloat(
    getCloseApproachData(nearEarthObject).relative_velocity
      ?.kilometers_per_hour!
  );

const getMissDistance = (nearEarthObject: NearEarthObject) =>
  parseFloat(getCloseApproachData(nearEarthObject).miss_distance?.kilometers!);

type SortBy = "date" | "size" | "speed" | "distance";

const sortNeos = (sortBy: SortBy, neoList: NearEarthObject[]) => {
  if (neoList.length < 1) {
    return neoList;
  }

  if (sortBy === "date") {
    const neosByDate = neoList.sort((a, b) => {
      const dateA = getCloseApproachData(a).epoch_date_close_approach ?? 0;
      const dateB = getCloseApproachData(b).epoch_date_close_approach ?? 0;
      return dateA - dateB;
    });

    return neosByDate;
  }

  if (sortBy === "size") {
    const neosBySize = neoList.sort(
      (a, b) =>
        a.estimated_diameter?.meters?.estimated_diameter_max! -
        b.estimated_diameter?.meters?.estimated_diameter_max!
    );
    return neosBySize;
  }

  if (sortBy === "speed") {
    const neosBySpeed = neoList.sort(
      (a, b) => getRelativeSpeed(a) - getRelativeSpeed(b)
    );

    return neosBySpeed;
  }

  if (sortBy === "distance") {
    const neosByMissDistance = neoList.sort(
      (a, b) => getMissDistance(a) - getMissDistance(b)
    );

    return neosByMissDistance;
  }

  return neoList;
};

export default function Asteroid() {
  const [sortBy, setSortBy] = useState<SortBy>("date");
  const data = useNeoWsData();
  const neoList = useMemo(() => getNeosList(data), [data]);
  const sortedNeos = sortNeos(sortBy, neoList);

  return (
    <div class="my-4 ">
      {data ? (
        <p class="text-2xl text-center font-mono text-white mt-4">
          <span>There are</span>
          <span class="text-red-400"> {data.element_count} </span>
          <span>NEOs making their close approach today</span>
          <div>
            <Button onClick={() => setSortBy("date")}>Approach Date</Button>
            <Button onClick={() => setSortBy("size")}>Size</Button>
            <Button onClick={() => setSortBy("speed")}>Speed</Button>
            <Button onClick={() => setSortBy("distance")}>Miss Distance</Button>
          </div>
        </p>
      ) : (
        <p class="text-2xl text-center font-mono text-red-400 mt-4">
          Loading...
        </p>
      )}
      <div>
        {sortedNeos.map(neo => (
          <AsteroidCard {...neo} key={neo.id} />
        ))}
      </div>
    </div>
  );
}
