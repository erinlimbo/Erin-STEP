import React, { Component } from "react";
import { useSelctor, useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../actions/index";

function Value() {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div className="increment">
      <h1>
        Counter: {counter}
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </h1>
    </div>
  );
}
export default Value;
