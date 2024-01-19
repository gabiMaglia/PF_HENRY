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
    deleteHistoryItem(state, action) {
      state.historyUser = state.historyUser.filter(
        (history) => history.value !== action.payload
      );
    },
  },
});

export const { getHistoryUser, postHistoryUser, deleteHistoryItem } =
  historySlice.actions;
export default historySlice.reducer;
