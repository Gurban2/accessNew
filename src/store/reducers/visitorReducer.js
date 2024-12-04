import { createSlice } from "@reduxjs/toolkit";

const visitorSlice = createSlice({
  name: "visitors",
  initialState: [
    {
      id: 1,
      name: "John Doe",
      phone: "1234567890",
      fin: "1234567890",
      email: "example@test.test",
    },
    {
      id: 2,
      name: "Qane Doe",
      phone: "0987654321",
      fin: "0987654321",
      email: "sadas",
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
      const visitorIndex = state.visitorsData.findIndex(
        (visitor) => visitor.id === id
      );

      return [
        ...state.visitorsData.slice(0, visitorIndex),
        {
          ...state.visitorsData[visitorIndex],
          personNonGrata,
          reason,
          updatedAt: new Date().toISOString(),
        },
        ...state.visitorsData.slice(visitorIndex + 1),
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
