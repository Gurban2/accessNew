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
      photo: "",
      tag: "",
      reason: "",
      personNonGrata: "false",
      reported: "false",
      createdAt: new Date().toISOString(), // Add timestamp when created
    },
    {
      id: "2",
      name: "Admin",
      phone: "555 555 555",
      fin: "edhrfjr",
      email: "user",
      address: "B",
      photo: "",
      tag: "",
      reason: "",
      personNonGrata: "false",
      reported: "false",
      createdAt: new Date().toISOString(),
    },
    {
      id: "45",
      name: "Admin",
      phone: "555 555 555",
      fin: "edergeger",
      email: "user",
      address: "B",
      photo: "",
      tag: "",
      reason: "",
      personNonGrata: "false",
      reported: "false",
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Person",
      phone: "555 555 555",
      fin: "jtydjrt",
      email: "user",
      address: "C",
      photo: "",
      tag: "",
      reason: "",
      personNonGrata: "false",
      reported: "false",
      createdAt: new Date().toISOString(),
    },
    {
      id: "4",
      name: "Kuku",
      phone: "555 555 555",
      fin: "jtukfjd",
      email: "user",
      address: "D",
      photo: "",
      tag: "",
      reason: "",
      personNonGrata: "false",
      reported: "false",
      createdAt: new Date().toISOString(),
    },
  ],
  reducers: {
    addVisitor: (state, action) => {
      const existingVisitor = state.find(
        (visitor) => visitor.id === action.payload.id
      );
      if (existingVisitor) {
        alert("Already exists");
        return state;
      }
      // Add time when adding a new visitor
      const updatedState = [...state, { ...action.payload, createdAt: new Date().toISOString() }];
      console.log("State after adding:", updatedState);
      return updatedState;
    },
    deleteVisitor: (state, action) => {
      return state.filter((visitor) => visitor.id !== action.payload.id);
    },
    editVisitor: (state, action) => {
      return state.map((visitor) =>
        visitor.id === action.payload.id
          ? { ...visitor, ...action.payload.data, updatedAt: new Date().toISOString() } // Add time when editing
          : visitor
      );
    },
    filterVisitor: (state, action) => {
      return state.filter((visitor) =>
        visitor.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    updateVisitor: (state, action) => {
      const { id, personNonGrata, reason } = action.payload;
      const visitorIndex = state.findIndex((visitor) => visitor.id === id);
      if (visitorIndex !== -1) {
        state[visitorIndex] = {
          ...state[visitorIndex],
          personNonGrata,
          reason,
          updatedAt: new Date().toISOString(), // Add time when updating the visitor's status
        };
      }
    },
    updatePersona: (state, action) => {
      const { id, reason } = action.payload;
      const visitorIndex = state.findIndex((visitor) => visitor.id === id);
      if (visitorIndex !== -1) {
        state[visitorIndex] = {
          ...state[visitorIndex],
          reason,
          updatedAt: new Date().toISOString(), // Add time when updating reason
        };
      }
    },
  },
});
console.log(new Date()); // Проверь, возвращает ли это правильную дату

export const { addVisitor, deleteVisitor, editVisitor, filterVisitor, updateVisitor, updatePersona } =
  visitorSlice.actions;

export default visitorSlice.reducer;
