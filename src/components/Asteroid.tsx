import { h } from "preact";
import useNeoWsData from "../utils/useNeoWsData";

export default function Asteroid() {
  const data = useNeoWsData();
  console.log(data);

  return (
    <div class="container border-4 border-white my-8 p-4">
      <h1 class="text-3xl text-lime-300 text-center font-mono">
        Asteroid Watch
      </h1>
      {data ? (
        <p class="text-2xl text-center font-mono text-white mt-4">
          <span>There are</span>
          <span class="text-red-400"> {data.element_count} </span>
          <span>NEOs today</span>
        </p>
      ) : (
        <p class="text-2xl text-center font-mono text-red-400 mt-4">
          Loading...
        </p>
      )}
    </div>
  );
}
