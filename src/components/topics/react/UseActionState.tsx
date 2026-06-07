import React, {
  startTransition,
  useActionState,
  useOptimistic,
  useRef,
} from "react";

class AbortError extends Error {
  name = "AbortError";
  constructor(message = "The operation was aborted") {
    super(message);
  }
}

function sleep(
  ms: number | undefined,
  signal: {
    aborted: boolean;
    removeEventListener: (arg0: string, arg1: () => void) => void;
    addEventListener: (
      arg0: string,
      arg1: () => void,
      arg2: { once: boolean },
    ) => void;
  },
) {
  if (!signal) return new Promise((resolve) => setTimeout(resolve, ms));
  if (signal.aborted) return Promise.reject(new AbortError());

  return new Promise<void>((resolve, reject) => {
    const id = setTimeout(() => {
      signal.removeEventListener("abort", onAbort);
      resolve();
    }, ms);

    const onAbort = () => {
      clearTimeout(id);
      reject(new AbortError());
    };

    signal.addEventListener("abort", onAbort, { once: true });
  });
}

async function updateCount(
  currentCount: number,
  signal: AbortSignal,
): Promise<{ count: number }> {
  await sleep(1000, signal);
  return { count: currentCount + 1 };
}

async function decrementCount(
  currentCount: number,
  signal: AbortSignal,
): Promise<{ count: number }> {
  await sleep(1000, signal);
  return { count: currentCount - 1 };
}

async function resetCount(signal: AbortSignal): Promise<{ count: number }> {
  await sleep(1000, signal);
  return { count: 0 };
}

async function reducerAction(
  state: { count: number },
  actionPayload: { type: string; signal: AbortSignal },
) {
  switch (actionPayload.type) {
    case "increment": {
      try {
        const result = await updateCount(state.count, actionPayload.signal);
        return result;
      } catch (error) {
        if (error instanceof AbortError) {
          console.log("Action was aborted");
          return state;
        }
      }
      return state;
    }
    case "decrement": {
      try {
        const result = await decrementCount(state.count, actionPayload.signal);
        return result;
      } catch (error) {
        if (error instanceof AbortError) {
          console.log("Action was aborted");
          return state;
        }
      }
      return state;
    }
    case "reset": {
      try {
        const result = await resetCount(actionPayload.signal);
        return result;
      } catch (error) {
        if (error instanceof AbortError) {
          console.log("Action was aborted");
          return state;
        }
      }
      return state;
    }
    default:
      return state;
  }
}

function UseActionState() {
  const abortControllerRef = useRef<AbortController | null>(null);

  const [state, dispatchAction, isPending] = useActionState(reducerAction, {
    count: 0,
  });

  const [optimisticState, setOptimisticState] = useOptimistic(state);

  const handleIncrement = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const newAbortController = new AbortController();
    abortControllerRef.current = newAbortController;
    startTransition(() => {
      setOptimisticState((prev) => ({ count: prev.count + 1 }));
      dispatchAction({ type: "increment", signal: newAbortController.signal });
    });
  };

  const handleDecrement = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const newAbortController = new AbortController();
    abortControllerRef.current = newAbortController;
    startTransition(() => {
      setOptimisticState((prev) => ({ count: prev.count - 1 }));
      dispatchAction({ type: "decrement", signal: newAbortController.signal });
    });
  };

  const reset = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const newAbortController = new AbortController();
    abortControllerRef.current = newAbortController;
    startTransition(() => {
      setOptimisticState({ count: 0 });
      dispatchAction({
        type: "reset",
        signal: newAbortController.signal,
      });
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">useActionState</h2>
      <p className="text-gray-500">
        useActionState is a React Hook that lets you update state with side
        effects using Actions.
      </p>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p className="text-lg">Count: {state.count}</p>
      </div>
      {isPending && <p className="text-sm text-gray-500 mt-2">Updating...</p>}
      <div className="flex items-center gap-3 mt-4">
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={handleDecrement}
        >
          -
        </button>
        <span className="text-2xl font-bold w-10 text-center">
          {optimisticState.count}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={handleIncrement}
        >
          +
        </button>
        <button
          className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default UseActionState;
