import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../store";
import { selectTopic, TopicId } from "../store/topicSlice";

const sections: {
  heading: string;
  topics: { id: TopicId; label: string }[];
}[] = [
  {
    heading: "React",
    topics: [
      { id: "todoapp", label: "Todo App" },
      { id: "debouncethrottle", label: "Debounce & Throttle" },
      { id: "usestate", label: "useState" },
      { id: "customusestate", label: "Custom useState" },
      { id: "useeffect", label: "useEffect" },
      { id: "useactionstate", label: "useActionState" },
      { id: "usecallback", label: "useCallback" },
      { id: "usecontext", label: "useContext" },
      { id: "usedebugvalue", label: "useDebugValue" },
      { id: "usedeferredvalue", label: "useDeferredValue" },
      { id: "useeffectevent", label: "useEffectEvent" },
      { id: "useid", label: "useId" },
      { id: "useimperativehandle", label: "useImperativeHandle" },
      { id: "useinsertioneffect", label: "useInsertionEffect" },
      { id: "eventpropagation", label: "Event Propagation" },
      { id: "uselayouteffect", label: "useLayoutEffect" },
      { id: "usememo", label: "useMemo" },
      { id: "useoptimistic", label: "useOptimistic" },
      { id: "usereducer", label: "useReducer" },
      { id: "useref", label: "useRef" },
      { id: "usesyncexternalstore", label: "useSyncExternalStore" },
      { id: "usetransition", label: "useTransition" },
    ],
  },
  {
    heading: "React DOM",
    topics: [{ id: "useformstatus", label: "useFormStatus" }],
  },
  {
    heading: "Redux",
    topics: [
      { id: "counter", label: "Counter" },
      { id: "routingAuth", label: "Routing & Auth" },
    ],
  },
];

const Sidebar = () => {
  const selected = useSelector((state: RootState) => state.topic.selected);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <aside className="w-[220px] min-h-screen border-r border-gray-200 py-6 bg-gray-50 shrink-0">
      {sections.map((section) => (
        <div key={section.heading} className="mb-6">
          <h3 className="px-5 mb-2 text-[11px] text-gray-400 uppercase tracking-widest">
            {section.heading}
          </h3>
          <ul className="list-none m-0 p-0">
            {section.topics.map((topic) => (
              <li key={topic.id}>
                <button
                  onClick={() => dispatch(selectTopic(topic.id))}
                  className={`w-full text-left px-5 py-2.5 border-none text-[15px] cursor-pointer border-l-[3px] ${
                    selected === topic.id
                      ? "bg-blue-50 text-blue-600 font-semibold border-l-blue-600"
                      : "bg-transparent text-gray-700 font-normal border-l-transparent"
                  }`}
                >
                  {topic.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
