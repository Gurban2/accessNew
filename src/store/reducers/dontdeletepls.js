import { createSlice } from "@reduxjs/toolkit";

const visitorSlice = createSlice({
  name: "visitors",
  initialState: [
    {
      id: "1",
      name: "User",
      phone: "555 555 555",
      fin: "erhtj",
      email: "user",
      address: "A",
      photo: "data:image/jpeg;base64,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",
      tag: "true",
      reason: "",
    },
    {
      id: "2",
      name: "Admin",
      phone: "555 555 555",
      fin: "edhrfjr",
      email: "user",
      address: "B",  
      tag: "person non grata",
      reason: "",   
    },
    {
      id: "3",
      name: "Person",
      phone: "555 555 555",
      fin: "jtydjrt",
      email: "user",
      address: "C",
      tag: "true",
      reason: "",   
    },
    {
      id: "4",
      name: "Kuku",
      phone: "555 555 555",
      fin: "jtukfjd",
      email: "user",
      address: "D",
      tag: "true",
      reason: "",   
    },
  ],
  reducers: {
    addVisitor: (state, action) => {
      const existingVisitor = state.find(
        (visitor) =>
          visitor.name.toLowerCase() === action.payload.name.toLowerCase()
      );
      if (existingVisitor) {
        alert("Already exists");
        return state;
      }
      // return [...state, action.payload]; 
      const updatedState = [...state, action.payload]; 
      console.log("State after adding:", updatedState);
      return updatedState;
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
      return state.filter((visitor) =>
        visitor.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
});

export const { addVisitor, deleteVisitor, editVisitor, filterVisitor } =
  visitorSlice.actions;

export default visitorSlice.reducer;