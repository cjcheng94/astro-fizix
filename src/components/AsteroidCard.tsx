import { h } from "preact";
import type { NearEarthObject } from "../utils/useNeoWsData";

const formatNumber = (number: number, maximumFractionDigits: number = 2) =>
  number.toLocaleString("en-US", { maximumFractionDigits });

// Get estimated size number in meters if it's smaller than 1 km,
// otherwise get it in kilometers
const getAptSizeUnit = (
  diameterObject: NearEarthObject["estimated_diameter"]
): [
  minDiameter: string,
  maxDiameter: string,
  unit: "meters" | "kilometers"
] => {
  const { meters, kilometers } = diameterObject!;
  const minMeter = meters?.estimated_diameter_min as number;
  const maxMeter = meters?.estimated_diameter_max as number;

  const minKm = kilometers?.estimated_diameter_min as number;
  const maxKm = kilometers?.estimated_diameter_max as number;

  if (minKm > 1) {
    return [formatNumber(minKm, 2), formatNumber(maxKm, 2), "kilometers"];
  }
  return [formatNumber(minMeter, 0), formatNumber(maxMeter, 0), "meters"];
};

export default function AsteroidCard({
  nearEarthObject,
  sortBy
}: {
  nearEarthObject: NearEarthObject;
  sortBy: "date" | "size" | "speed" | "distance" | "";
}) {
  const {
    name,
    nasa_jpl_url,
    close_approach_data,
    is_potentially_hazardous_asteroid,
    estimated_diameter
  } = nearEarthObject;

  const { epoch_date_close_approach, miss_distance, relative_velocity } =
    close_approach_data![0];

  const { kilometers_per_second, kilometers_per_hour } = relative_velocity!;

  const [minDiameter, maxDiameter, unit] = getAptSizeUnit(estimated_diameter);

  const roundedMissDistance = formatNumber(
    parseFloat(miss_distance?.kilometers!)
  );

  const roundedSpeed = formatNumber(parseFloat(kilometers_per_second!));

  const localeDate = new Date(epoch_date_close_approach!)
    .toString()
    .slice(4, 21);

  const highlightedClass = (type: "date" | "size" | "speed" | "distance") =>
    type === sortBy ? "text-lime-300" : "text-white";
  const dangerousClass = is_potentially_hazardous_asteroid
    ? "text-red-500"
    : "text-white";

  return (
    <div class="flex justify-between flex-wrap gap-4 my-4 p-4 text-white font-mono border-2 border-white ">
      <div class="flex-auto lg:mr-4 sm:min-w-[380px]">
        <div class="sm:max-lg:flex justify-between">
          <span class="inline-block sm:min-w-[24ch] mr-2">Name:</span>
          <span class="underline hover:text-blue-500">
            <a href={nasa_jpl_url} target="_blank" rel="noreferrer noopener">
              {name}
            </a>
          </span>
        </div>
        <div class="sm:max-lg:flex justify-between">
          <span class="inline-block sm:min-w-[24ch] mr-2">Size:</span>
          <span class={highlightedClass("size")}>
            {minDiameter} to {maxDiameter} {unit}
          </span>
        </div>
        <div class="sm:max-lg:flex justify-between">
          <span class="inline-block sm:min-w-[24ch] mr-2">
            Potentially hazardous:{" "}
          </span>
          <span class={dangerousClass}>
            {is_potentially_hazardous_asteroid!.toString()}
          </span>
        </div>
        <div class="sm:max-lg:flex justify-between">
          <span class="inline-block sm:min-w-[24ch] mr-2">
            Close approach date:{" "}
          </span>
          <span class={highlightedClass("date") + " whitespace-nowrap"}>
            {localeDate}
          </span>
        </div>
        <div class="sm:max-lg:flex justify-between">
          <span class="inline-block sm:min-w-[24ch] mr-2">Miss distance:</span>
          <span class={highlightedClass("distance")}>
            {roundedMissDistance} km
          </span>
        </div>
        <div class="sm:max-lg:flex justify-between">
          <span class="inline-block sm:min-w-[24ch] mr-2">Relative speed:</span>
          <span class={highlightedClass("speed")}>{roundedSpeed} km/s</span>
        </div>
      </div>
      <div class="flex-auto flex flex-col justify-center items-center text-4xl text-lime-300 whitespace-nowrap">
        <span class="px-4 py-2 text-center w-max border-4 border-lime-300 ">
          T- 01:30:10
        </span>
      </div>
    </div>
  );
}
