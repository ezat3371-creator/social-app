import React, { useContext } from "react";
import { counterContext } from "./context/counter.context";

export default function Gallery() {
  const {counter=0,increase=()=>{}} = useContext(counterContext) || {}
  return (
    <div className="border-2 border-green-500 my-3 p-5">
      <h1 onClick={increase}>Gallery {counter}</h1>
    </div>
  );
}
