import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TopicId =
  | "counter"
  | "todoapp"
  | "usestate"
  | "customusestate"
  | "useeffect"
  | "useactionstate"
  | "usecallback"
  | "usecontext"
  | "usedebugvalue"
  | "usedeferredvalue"
  | "useeffectevent"
  | "useid"
  | "useimperativehandle"
  | "useinsertioneffect"
  | "eventpropagation"
  | "uselayouteffect"
  | "usememo"
  | "useoptimistic"
  | "useformstatus"
  | "usereducer"
  | "useref"
  | "usetransition"
  | "usesyncexternalstore"
  | "debouncethrottle"
  | "routingAuth";

interface TopicState {
  selected: TopicId;
}

const initialState: TopicState = {
  selected: "counter",
};

const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    selectTopic(state, action: PayloadAction<TopicId>) {
      state.selected = action.payload;
    },
  },
});

export const { selectTopic } = topicSlice.actions;
export default topicSlice.reducer;
