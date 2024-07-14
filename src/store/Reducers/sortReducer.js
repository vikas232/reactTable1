import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  selectedAssets: "abdcddfd",
};
const sortReducer = createSlice({
  name: "formReducer",
  initialState,
  reducers: {
    setSelectedAssets: (state, { payload }) => {
      return {
        ...state,
        selectedAssets: payload,
      };
    },
  },
});

export default sortReducer.reducer;

export const { setSelectedAssets,setSelectedLayout ,setSelectedVaribleLink , selectedSamplePersonalization } = sortReducer.actions;
