import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const visitorSlice = createSlice({
  name: "visitors",
  initialState: {
    visitorsData: [/* array of visitors */],
  },

  reducers: {
    setVisitors(state, action) {
      state.visitorsData = action.payload;
    },
    addVisitor: (state, action) => {
      const existingVisitor = state.visitorsData.find(
        (visitor) => visitor.id === action.payload.id
      );
      if (existingVisitor) {
        toast.error("Этот посетитель уже существует.");
        return;
      }
      state.visitorsData.push({
        ...action.payload,
        createdAt: new Date().toISOString(),
      });
      toast.success("Посетитель успешно добавлен.");
    },
    deleteVisitor: (state, action) => {
      state.visitorsData = state.visitorsData.filter(
        (visitor) => visitor.id !== action.payload.id
      );
    },
    editVisitor: (state, action) => {
      state.visitorsData = state.visitorsData.map((visitor) =>
        visitor.id === action.payload.id
          ? { ...visitor, ...action.payload.data, updatedAt: new Date().toISOString() }
          : visitor
      );
    },
    filterVisitor: (state, action) => {
      state.visitorsData = state.visitorsData.filter((visitor) =>
        visitor.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    updateVisitor: (state, action) => {
      const { id, personNonGrata, reason } = action.payload;
      const visitorIndex = state.visitorsData.findIndex((visitor) => visitor.id === id);
      if (visitorIndex !== -1) {
        state.visitorsData[visitorIndex] = {
          ...state.visitorsData[visitorIndex],
          personNonGrata,
          reason,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    updatePersona: (state, action) => {
      const { id, reason } = action.payload;
      const visitorIndex = state.visitorsData.findIndex((visitor) => visitor.id === id);
      if (visitorIndex !== -1) {
        state.visitorsData[visitorIndex] = {
          ...state.visitorsData[visitorIndex],
          reason,
          updatedAt: new Date().toISOString(),
        };
      }
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

