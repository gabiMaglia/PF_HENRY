//HOOKS
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  historyUser: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    getHistoryUser(state, action) {
      state.historyUser = action.payload;
    },
    postHistoryUser(state, action) {
      state.historyUser = [...state.historyUser, action.payload];
    },
  },
});

export const { getHistoryUser, postHistoryUser } = historySlice.actions;
export default historySlice.reducer;
