import React from "react";

import { useSelector } from "react-redux";

import { RootState } from "./store";

import Sidebar from "./components/Sidebar";
import {
  Counter,
  EventPropagation,
  TodoAppTopic,
  UseActionState,
  UseCallBack,
  UseContext,
  UseDebugValue,
  UseDeferredValue,
  UseEffect,
  UseEffectEvent,
  UseFormStatus,
  UseId,
  UseImperativeHandle,
  UseInsertionEffect,
  UseLayoutEffect,
  UseMemo,
  UseOptimistic,
  UseReducer,
  UseRef,
  UseState,
  UseSyncExternalStore,
  UseTransition,
} from "./components/topics";

const topicMap = {
  counter: <Counter />,
  todoapp: <TodoAppTopic />,
  usestate: <UseState />,
  useeffect: <UseEffect />,
  useactionstate: <UseActionState />,
  usecallback: <UseCallBack />,
  usecontext: <UseContext />,
  usedebugvalue: <UseDebugValue />,
  usedeferredvalue: <UseDeferredValue />,
  useeffectevent: <UseEffectEvent />,
  eventpropagation: <EventPropagation />,
  useid: <UseId />,
  useimperativehandle: <UseImperativeHandle />,
  useinsertioneffect: <UseInsertionEffect />,
  uselayouteffect: <UseLayoutEffect />,
  usememo: <UseMemo />,
  useoptimistic: <UseOptimistic />,
  useformstatus: <UseFormStatus />,
  usereducer: <UseReducer />,
  useref: <UseRef />,
  usesyncexternalstore: <UseSyncExternalStore />,
  usetransition: <UseTransition />,
};

const App = () => {
  const selected = useSelector((state: RootState) => state.topic.selected);

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans text-slate-900">
      <Sidebar />
      <main className="flex-1 p-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              {__APP_TITLE__}
            </p>
            <h1 className="mt-1 text-2xl font-semibold">Topic Explorer</h1>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              {__APP_ENV__}
            </span>
            <span className="max-w-[22rem] truncate rounded-full border border-slate-200 px-3 py-1">
              API: {__API_BASE_URL__ || "not configured"}
            </span>
          </div>
        </div>
        {topicMap[selected]}
      </main>
    </div>
  );
};

export default App;
