//HOOKS
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: [],
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        getCategories(state, action) {
            state.categories = action.payload;
        },
        postCategory(state,action){
            state.categories=action.payload
        }
    }
})

export const { getCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
