import React, { useState } from "react";

type LogEntry = {
  id: number;
  text: string;
};

const items = ["Alpha", "Beta", "Gamma"];

const EventPropagation = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [captureClicks, setCaptureClicks] = useState(0);
  const [stopInnerClicks, setStopInnerClicks] = useState(true);

  const addLog = (text: string) => {
    setLogs((currentLogs) => [
      { id: Date.now() + Math.random(), text },
      ...currentLogs,
    ]);
  };

  const clearLogs = () => setLogs([]);

  const isInnerButtonTarget = (target: EventTarget | null) =>
    target instanceof HTMLElement &&
    Boolean(target.closest("button[data-prop-demo='inner']"));

  const handleOuterClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!isInnerButtonTarget(event.target)) return;

    setClickCount((count) => count + 1);
    addLog("Bubble: outer container handler ran");
  };

  const handleCaptureClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!isInnerButtonTarget(event.target)) return;

    setCaptureClicks((count) => count + 1);
    addLog("Capture: outer container handler ran before target/bubble");
  };

  const handleInnerButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    addLog("Target: inner button handler ran");

    if (stopInnerClicks) {
      event.stopPropagation();
      addLog("Target: propagation stopped at the button");
    }
  };

  const handleStopInnerClicksChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setStopInnerClicks(event.currentTarget.checked);
  };

  const handleDelegatedListClick = (
    event: React.MouseEvent<HTMLUListElement>,
  ) => {
    const target = event.target as HTMLElement;
    const button = target.closest("button[data-item]");

    if (!button) return;

    const item = button.getAttribute("data-item");
    addLog(`Delegation: parent <ul> handled click for ${item}`);
  };

  return (
    <div className="p-6 rounded bg-white">
      <h2 className="text-2xl font-bold mb-2">Event Propagation</h2>
      <p className="text-gray-500 mb-4">
        React uses event delegation under the hood. A click starts at the
        target, can run capture handlers on the way down, then bubbles back up
        unless you stop propagation.
      </p>

      <div className="grid gap-4 lg:grid-cols-2">
        <section
          className="rounded border border-gray-200 p-4 bg-gray-50"
          onClick={handleOuterClick}
          onClickCapture={handleCaptureClick}
        >
          <h3 className="font-semibold mb-2">Propagation demo</h3>
          <p className="text-sm text-gray-600 mb-3">
            Click the button. You will see capture first, then target, then
            bubble.
          </p>

          <button
            data-prop-demo="inner"
            onClick={handleInnerButtonClick}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Inner button
          </button>

          <label className="flex items-center gap-2 mt-4 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={stopInnerClicks}
              onChange={handleStopInnerClicksChange}
            />
            Stop propagation from inner button
          </label>

          <div className="mt-3 text-sm text-gray-700 space-y-1">
            <p>Capture count: {captureClicks}</p>
            <p>Bubble count: {clickCount}</p>
          </div>
        </section>

        <section className="rounded border border-gray-200 p-4 bg-gray-50">
          <h3 className="font-semibold mb-2">Event delegation demo</h3>
          <p className="text-sm text-gray-600 mb-3">
            Only the parent list handles clicks. It inspects the real clicked
            element to decide which item was activated.
          </p>

          <ul onClick={handleDelegatedListClick} className="space-y-2">
            {items.map((item) => (
              <li key={item}>
                <button
                  data-item={item}
                  className="w-full text-left px-3 py-2 rounded border border-gray-300 bg-white hover:bg-gray-100"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-4 rounded border border-gray-200 p-4">
        <div className="flex items-center justify-between gap-3 mb-2">
          <h3 className="font-semibold">Event log</h3>
          <button
            onClick={clearLogs}
            className="px-3 py-1 text-sm bg-gray-700 text-white rounded"
          >
            Clear
          </button>
        </div>

        <ol className="space-y-2 text-sm text-gray-700">
          {logs.length === 0 ? (
            <li className="text-gray-400">
              No events yet. Click a control above.
            </li>
          ) : (
            logs.map((entry) => <li key={entry.id}>{entry.text}</li>)
          )}
        </ol>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded text-sm text-blue-700 space-y-1">
        <p>
          <strong>Propagation order</strong>
        </p>
        <p>
          1. Capture phase: events travel from the root down to the target. 2.
          Target phase: the clicked element handles the event. 3. Bubble phase:
          the event moves back up to parent elements.
        </p>
        <p>
          <strong>Delegation</strong> works because one parent listener can
          handle many child interactions, and React already attaches listeners
          at a higher level instead of every DOM node.
        </p>
      </div>
    </div>
  );
};

export default EventPropagation;
