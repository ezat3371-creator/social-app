import React, { useContext } from "react";
import { counterContext } from "./context/counter.context";

export default function About() {
  const { counter, increase } = useContext(counterContext) || {};

  return (
    <div className="border-2 border-rose-500 p-5">
      <h1>About {counter} </h1>
      <button onClick={increase}>+</button>
    </div>
  );
}
