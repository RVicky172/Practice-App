import React from "react";

import { useDispatch,useSelector } from "react-redux";

import { RootState } from "./store";
import { toggleTheme } from "./store/themeSlice";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import {
  Counter,
  CustomUseState,
  DebounceThrottleTodo,
  EventPropagation,
  RoutingAuth,
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

const getTopicComponent = (topicId: string) => {
  const topicMap: Record<string, React.ReactNode> = {
    counter: <Counter />,
    todoapp: <TodoAppTopic />,
    debouncethrottle: <DebounceThrottleTodo />,
    usestate: <UseState />,
    customusestate: <CustomUseState />,
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
    routingAuth: <RoutingAuth />,
  };
  return topicMap[topicId];
};

const App = () => {
  const dispatch = useDispatch();
  const selected = useSelector((state: RootState) => state.topic.selected);
  const theme = useSelector((state: RootState) => state.theme.mode);

  // Apply theme class before first paint
  React.useLayoutEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    root.style.colorScheme = theme;
  }, [theme]);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <div
      className="min-h-screen font-sans transition-colors duration-300 ease-in-out"
      style={{
        backgroundColor: theme === "light" ? "#ffffff" : "#020617",
        color: theme === "light" ? "#0f172a" : "#f8fafc",
      }}
    >
      <Navbar theme={theme} onToggleTheme={handleToggleTheme} />
      <div className="flex min-h-[calc(100vh-72px)]">
        <Sidebar theme={theme} />
        <main className="flex-1 p-10">
          <div
            className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border px-6 py-4 shadow-sm transition-all duration-300 ease-in-out"
            style={{
              backgroundColor: theme === "light" ? "#ffffff" : "#111827",
              borderColor: theme === "light" ? "#e6e6e6" : "#334155",
            }}
          >
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.35em] transition-colors duration-300"
                style={{
                  color: theme === "light" ? "#64748b" : "#94a3b8",
                }}
              >
                {__APP_TITLE__}
              </p>
              <h1
                className="mt-1 text-2xl font-semibold transition-colors duration-300"
                style={{
                  color: theme === "light" ? "#0f172a" : "#f1f5f9",
                }}
              >
                Topic Explorer
              </h1>
            </div>
            <div
              className="flex flex-wrap items-center gap-3 text-sm transition-colors duration-300"
              style={{
                color: theme === "light" ? "#64748b" : "#cbd5e1",
              }}
            >
              <span
                className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300"
                style={{
                  backgroundColor: theme === "light" ? "#0f172a" : "#4f46e5",
                  color: "#ffffff",
                }}
              >
                {__APP_ENV__}
              </span>
              <span
                className="max-w-[22rem] truncate rounded-full border px-3 py-1 transition-colors duration-300"
                style={{
                  borderColor: theme === "light" ? "#e6e6e6" : "#334155",
                  backgroundColor: theme === "light" ? "#ffffff" : "#1e293b",
                }}
              >
                API: {__API_BASE_URL__ || "not configured"}
              </span>
            </div>
          </div>
          {getTopicComponent(selected)}
        </main>
      </div>
    </div>
  );
};

export default App;
