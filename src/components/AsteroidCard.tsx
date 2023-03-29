import { h } from "preact";
import type { NearEarthObject } from "../utils/useNeoWsData";

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
    return [minKm.toFixed(2), maxKm.toFixed(2), "kilometers"];
  }
  return [minMeter.toFixed(2), maxMeter.toFixed(2), "meters"];
};

export default function AsteroidCard(props: NearEarthObject) {
  const {
    name,
    close_approach_data,
    is_potentially_hazardous_asteroid,
    estimated_diameter
  } = props;

  const { epoch_date_close_approach, miss_distance, relative_velocity } =
    close_approach_data![0];

  const { kilometers_per_second, kilometers_per_hour } = relative_velocity!;

  const [minDiameter, maxDiameter, unit] = getAptSizeUnit(estimated_diameter);

  const roundedMissDistance = parseFloat(miss_distance?.kilometers!).toFixed(3);

  const localeDate = new Date(epoch_date_close_approach!)
    .toString()
    .slice(4, 21);

  return (
    <div class="text-white font-mono border-2 border-white my-4 p-4">
      <div>
        <span>Name: </span>
        <span>{name}</span>
      </div>
      <div>
        <span>Size: </span>
        <span>
          {minDiameter} to {maxDiameter} {unit}
        </span>
      </div>
      <div>
        <span>Potentially hazardous: </span>
        <span>{is_potentially_hazardous_asteroid!.toString()}</span>
      </div>
      <div>
        <span>Close approach date: </span>
        <span>{localeDate}</span>
      </div>
      <div>
        <span>Miss distance: </span>
        <span>{roundedMissDistance} km</span>
      </div>
      <div>
        <span>Relative speed: </span>
        <span>{kilometers_per_second} km/s</span>
      </div>
    </div>
  );
}
