import React, { useId, useState } from "react";

const UseId = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const formId = useId();
  const nameId = `${formId}-name`;
  const emailId = `${formId}-email`;
  const hintId = `${formId}-hint`;

  return (
    <div className="p-6 rounded bg-white">
      <h2 className="text-2xl font-bold mb-2">useId</h2>
      <p className="text-gray-500 mb-4">
        useId creates stable, unique IDs so labels and form controls are linked
        accessibly without hardcoding global IDs.
      </p>

      <form className="max-w-md space-y-3" aria-describedby={hintId}>
        <div>
          <label htmlFor={nameId} className="block text-sm text-gray-600 mb-1">
            Name
          </label>
          <input
            id={nameId}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter name"
          />
        </div>

        <div>
          <label htmlFor={emailId} className="block text-sm text-gray-600 mb-1">
            Email
          </label>
          <input
            id={emailId}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter email"
          />
        </div>
      </form>

      <p id={hintId} className="text-xs text-gray-500 mt-3">
        Generated IDs stay stable for this component instance.
      </p>
      <p className="text-xs text-gray-500 mt-1">
        Current IDs: {nameId} and {emailId}
      </p>
    </div>
  );
};

export default UseId;
