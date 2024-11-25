import { createSlice } from "@reduxjs/toolkit";

const officeSlice = createSlice({
  name: "offices",
  initialState: [],
  reducers: {
    addOffice: (state, action) => {
      const existingOffice = state.find((office) => (
        office.name === action.payload.name
      ));
      if (existingOffice) {
        alert("Alredy exist");
      }
      return [...state, action.payload];
    },
    deleteOffice: (state, action) => {},
    editOffice: (state, action) => {},
    filterOffice: (state, action) => {},
  },
});

export const { addOffice, deleteOffice, editOffice, filterOffice } =
  officeSlice.actions;

export default officeSlice.reducer;
