import React, { useImperativeHandle, useRef, useState } from "react";

type InputActions = {
  focus: () => void;
  clear: () => void;
};

type FancyInputProps = {
  label: string;
  ref?: React.Ref<InputActions>;
};

const FancyInput = ({ label, ref }: FancyInputProps) => {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      focus() {
        inputRef.current?.focus();
      },
      clear() {
        setValue("");
        inputRef.current?.focus();
      },
    }),
    [],
  );

  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type something"
      />
    </div>
  );
};

const UseImperativeHandle = () => {
  const inputActionsRef = useRef<InputActions>(null);

  return (
    <div className="p-6 rounded bg-white">
      <h2 className="text-2xl font-bold mb-2">useImperativeHandle</h2>
      <p className="text-gray-500 mb-4">
        Exposes selected methods from a child component to a parent via ref.
        Here the parent can call focus() and clear() on the child input.
      </p>

      <FancyInput ref={inputActionsRef} label="Message" />

      <div className="flex gap-2 mt-3">
        <button
          onClick={() => inputActionsRef.current?.focus()}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Focus Input
        </button>
        <button
          onClick={() => inputActionsRef.current?.clear()}
          className="px-3 py-1 bg-gray-700 text-white rounded"
        >
          Clear + Focus
        </button>
      </div>
    </div>
  );
};

export default UseImperativeHandle;
