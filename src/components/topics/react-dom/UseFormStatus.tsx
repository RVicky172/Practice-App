import React, { useState } from "react";
import { useFormStatus } from "react-dom";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const SubmitButton = () => {
  const { pending, data } = useFormStatus();
  const draftName = data?.get("name")?.toString().trim();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="submit"
        disabled={pending}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? "Saving..." : "Save profile"}
      </button>
      <span className="text-sm text-gray-500 min-h-5">
        {pending
          ? `Submitting ${draftName || "your profile"}...`
          : "useFormStatus reads the parent form's current submission state."}
      </span>
    </div>
  );
};

const UseFormStatus = () => {
  const [savedName, setSavedName] = useState("Ada Lovelace");
  const [savedRole, setSavedRole] = useState("Frontend Engineer");

  const saveProfile = async (formData: FormData) => {
    const nextName = formData.get("name")?.toString().trim() || "Anonymous";
    const nextRole = formData.get("role")?.toString().trim() || "Unassigned";

    await wait(1200);

    setSavedName(nextName);
    setSavedRole(nextRole);
  };

  return (
    <div className="p-6 rounded bg-white">
      <h2 className="text-2xl font-bold mb-2">useFormStatus</h2>
      <p className="text-gray-500 mb-4">
        <code>useFormStatus</code> comes from React DOM and lets nested
        components read whether a parent form submission is pending, plus the
        current form data.
      </p>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <form
          action={saveProfile}
          className="space-y-4 rounded border border-gray-200 p-4 bg-gray-50"
        >
          <div>
            <label
              className="block text-sm text-gray-600 mb-1"
              htmlFor="useformstatus-name"
            >
              Name
            </label>
            <input
              id="useformstatus-name"
              name="name"
              defaultValue={savedName}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              className="block text-sm text-gray-600 mb-1"
              htmlFor="useformstatus-role"
            >
              Role
            </label>
            <input
              id="useformstatus-role"
              name="role"
              defaultValue={savedRole}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <SubmitButton />
        </form>

        <div className="rounded border border-blue-100 bg-blue-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 mb-2">
            Last saved profile
          </p>
          <p className="text-xl font-semibold text-gray-900">{savedName}</p>
          <p className="text-sm text-gray-600 mt-1">{savedRole}</p>
          <p className="text-xs text-gray-500 mt-4">
            Change the fields and submit to watch the button and helper text
            react to the pending form state.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UseFormStatus;
