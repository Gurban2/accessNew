import { createSlice } from "@reduxjs/toolkit";

const officeSlice = createSlice({
  name: "offices",
  initialState: [
    { id: 1, name: "Sales", phone: "555 555 555", address: "A" },
    { id: 2, name: "Marketing", phone: "555 555 555", address: "B" },
    { id: 3, name: "HR", phone: "555 555 555", address: "C" },
    { id: 4, name: "IT", phone: "555 555 555", address: "D" }
  ],
  reducers: {
    addOffice: (state, action) => {
      const existingOffice = state.find(
        (office) => office.name === action.payload.name
      );
      if (existingOffice) {
        alert("Already exists");
        return state; // If office exists, do not add
      }

      const updatedState = [...state, action.payload];
      
      // Log the state after adding the new office
      console.log("State after adding office:", updatedState);
      
      return updatedState; // Return the updated state
    },
    deleteOffice: (state, action) => {
      return state.filter((office) => office.id !== action.payload.id);
    },
    editOffice: (state, action) => {
      return state.map((office) =>
        office.id === action.payload.id
          ? { ...office, ...action.payload.data }
          : office
      );
    },
    filterOffice: (state, action) => {},
  },
});

export const { addOffice, deleteOffice, editOffice, filterOffice } = officeSlice.actions;

export default officeSlice.reducer;
