//HOKKS
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    brands: [],
}

const brandsSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {
        getBrands: (state, action) => {
            state.brands = action.payload;
        }
    }
})

export const { getBrands } = brandsSlice.actions;
export default brandsSlice.reducer;