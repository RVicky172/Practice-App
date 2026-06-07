import React, { useReducer } from "react";

type CounterState = {
  count: number;
  step: number;
};

type CounterAction =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "setStep"; payload: number }
  | { type: "reset" };

const initialState: CounterState = {
  count: 0,
  step: 1,
};

const reducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + state.step };
    case "decrement":
      return { ...state, count: state.count - state.step };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return initialState;
    default:
      return state;
  }
};

const UseReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="p-6 rounded bg-white">
      <h2 className="text-2xl font-bold mb-2">useReducer</h2>
      <p className="text-gray-500 mb-4">
        Useful when state updates follow clear action types and transition
        rules.
      </p>

      <div className="rounded border border-gray-200 p-4 bg-gray-50">
        <p className="text-sm text-gray-600">Current count</p>
        <p className="text-4xl font-bold text-gray-900 mt-1">{state.count}</p>

        <label className="block mt-4 text-sm text-gray-600">Step size</label>
        <input
          type="number"
          min={1}
          max={10}
          value={state.step}
          onChange={(event) => {
            const nextValue = Number(event.target.value);
            dispatch({
              type: "setStep",
              payload: Number.isNaN(nextValue)
                ? 1
                : Math.min(10, Math.max(1, nextValue)),
            });
          }}
          className="mt-1 w-24 px-2 py-1 border border-gray-300 rounded"
        />

        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={() => dispatch({ type: "decrement" })}
            className="px-3 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            - Step
          </button>
          <button
            onClick={() => dispatch({ type: "increment" })}
            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Step
          </button>
          <button
            onClick={() => dispatch({ type: "reset" })}
            className="px-3 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded text-sm text-blue-700">
        <strong>Reducer idea:</strong> actions describe what happened, and the
        reducer decides how state changes.
      </div>
    </div>
  );
};

export default UseReducer;
