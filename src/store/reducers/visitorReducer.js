import { createSlice } from "@reduxjs/toolkit";

const visitorSlice = createSlice({
  name: "visitors",
  initialState: [
    { id: "1", name: "User", phone: "555 555 555", fin: "erhtj", email: "user", address: "A" },
    { id: "2", name: "Admin", phone: "555 555 555", fin: "edhrfjr", email: "user",address: "B" },
    { id: "3", name: "Person", phone: "555 555 555", fin: "jtydjrt", email: "user",address: "C" },
    { id: "4", name: "Kuku", phone: "555 555 555", fin: "jtukfjd", email: "user",address: "D" }
  ],
  reducers: {
    addVisitor: (state, action) => {
      const existingVisitor = state.find(
        (visitor) => visitor.name === action.payload.name
      );
      if (existingVisitor) {
        alert("Alredy exist");
        return state;
      }
      // return [...state, action.payload];
      state.push(action.payload);
    },
    deleteVisitor: (state, action) => {
      return state.filter((visitor) => visitor.id !== action.payload.id);
    },
    editVisitor: (state, action) => {
      return state.map((visitor) =>
        visitor.id === action.payload.id
          ? { ...visitor, ...action.payload.data }
          : visitor
      );
    },
    filterVisitor: (state, action) => { 

    },
  },
});

export const { addVisitor, deleteVisitor, editVisitor, filterVisitor } =
  visitorSlice.actions;

export default visitorSlice.reducer;
