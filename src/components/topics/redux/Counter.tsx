import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../store";
import { decrement, increment, reset } from "../../../store/counterSlice";

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Redux Counter</h2>
      <p className="text-gray-500">
        A basic counter managed with Redux Toolkit.
      </p>
      <div className="flex items-center gap-3 mt-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className="text-2xl font-bold w-10 text-center">{count}</span>
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <button
          className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
          onClick={() => dispatch(reset())}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
