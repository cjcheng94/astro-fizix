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

type SortBy = "date" | "size" | "speed" | "distance" | "";

const sortNeos = (sortBy: SortBy, neoList: NearEarthObject[]) => {
  if (neoList.length < 1 || !sortBy) {
    return neoList;
  }

  const neosCopy = [...neoList];

  if (sortBy === "date") {
    const neosByDate = neosCopy.sort((a, b) => {
      const dateA = getCloseApproachData(a).epoch_date_close_approach ?? 0;
      const dateB = getCloseApproachData(b).epoch_date_close_approach ?? 0;
      return dateA - dateB;
    });

    return neosByDate;
  }

  if (sortBy === "size") {
    const neosBySize = neosCopy.sort(
      (a, b) =>
        a.estimated_diameter?.meters?.estimated_diameter_max! -
        b.estimated_diameter?.meters?.estimated_diameter_max!
    );
    return neosBySize;
  }

  if (sortBy === "speed") {
    const neosBySpeed = neosCopy.sort(
      (a, b) => getRelativeSpeed(a) - getRelativeSpeed(b)
    );

    return neosBySpeed;
  }

  if (sortBy === "distance") {
    const neosByMissDistance = neosCopy.sort(
      (a, b) => getMissDistance(a) - getMissDistance(b)
    );

    return neosByMissDistance;
  }

  return neoList;
};

const getNumberOfDangerousNeos = (neoList: NearEarthObject[]) => {
  let count = 0;

  neoList.forEach(neo => {
    if (neo.is_potentially_hazardous_asteroid) {
      count += 1;
    }
  });

  return count;
};

export default function Asteroid() {
  const [sortBy, setSortBy] = useState<SortBy>("");

  const data = useNeoWsData();

  const neoList = useMemo(() => getNeosList(data), [data]);

  const sortedNeos = useMemo(
    () => sortNeos(sortBy, neoList),
    [sortBy, neoList]
  );

  const numberOfDangerousNeos = useMemo(
    () => getNumberOfDangerousNeos(neoList),
    [neoList]
  );

  const sort = (type: SortBy) => () => {
    if (sortBy === type) {
      setSortBy("");
      return;
    }
    setSortBy(type);
  };

  const helpingVerb = numberOfDangerousNeos === 1 ? "is" : "are";

  return (
    <div class="my-8">
      {data ? (
        <>
          <div class="text-xl lg:text-2xl text-white">
            <div>
              <span>There are </span>
              <span class="text-lime-300">{data.element_count} </span>
              <span>
                <a
                  href="/learnmore/#near_earth_objects"
                  class="underline hover:text-blue-500"
                >
                  near-Earth objects
                </a>{" "}
                making their close approach today,{" "}
              </span>
              <span class="text-red-500">{numberOfDangerousNeos} </span>
              <span>
                of them {helpingVerb}{" "}
                <a
                  href="/learnmore/#potentially_hazardous_objects"
                  class="underline hover:text-blue-500"
                >
                  potentially hazardous
                </a>
              </span>
            </div>

            <div class="mt-8">
              <span class="text-white block lg:inline">Sort by: </span>
              <Button highlighted={sortBy === "date"} onClick={sort("date")}>
                Approach Date
              </Button>
              <Button highlighted={sortBy === "size"} onClick={sort("size")}>
                Size
              </Button>
              <Button highlighted={sortBy === "speed"} onClick={sort("speed")}>
                Speed
              </Button>
              <Button
                highlighted={sortBy === "distance"}
                onClick={sort("distance")}
              >
                Miss Distance
              </Button>
            </div>
          </div>

          <div class="mt-8">
            {sortedNeos.map(neo => (
              <AsteroidCard
                nearEarthObject={neo}
                key={neo.id}
                sortBy={sortBy}
              />
            ))}
          </div>
        </>
      ) : (
        <p class="text-2xl text-center text-red-500 mt-4">Loading...</p>
      )}
    </div>
  );
}
