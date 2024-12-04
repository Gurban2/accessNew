import { createSlice } from "@reduxjs/toolkit";

const visitorSlice = createSlice({
  name: "visitors",
  initialState: [
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
    setVisitors(state, action) {
      return [...action.payload];
    },
    addVisitor: (state, action) => {
      return [
        ...state,
        { ...action.payload, createdAt: new Date().toISOString() },
      ];
    },
    deleteVisitor: (state, action) => {
      return state.filter((visitor) => visitor.id !== action.payload.id);
    },
    editVisitor: (state, action) => {
      return state.map((visitor) =>
        visitor.id === action.payload.id
          ? {
              ...visitor,
              ...action.payload.data,
              updatedAt: new Date().toISOString(),
            }
          : visitor
      );
    },
    filterVisitor: (state, action) => {
      return state.filter((visitor) => {
        return visitor.name
          .toLowerCase()
          .includes(action.payload.toLowerCase());
      });
    },
    updateVisitor: (state, action) => {
      const { id, personNonGrata, reason } = action.payload;
      const visitorIndex = state.findIndex((visitor) => visitor.id === id);

      if (visitorIndex === -1) return state;
      
      return [
        ...state.slice(0, visitorIndex),
        {
          ...state[visitorIndex],
          personNonGrata,
          reason,
          updatedAt: new Date().toISOString(),
        },
        ...state.slice(visitorIndex + 1),
      ];
    },
    updatePersona: (state, action) => {
      const { id, reason } = action.payload;
      const visitorIndex = state.findIndex((visitor) => visitor.id === id);

      return [
        ...state.slice(0, visitorIndex),
        {
          ...state[visitorIndex],
          reason,
          updatedAt: new Date().toISOString(),
        },
        ...state.slice(visitorIndex + 1),
      ];
    },
  },
});

export const {
  addVisitor,
  deleteVisitor,
  editVisitor,
  filterVisitor,
  updateVisitor,
  updatePersona,
} = visitorSlice.actions;

export default visitorSlice.reducer;
