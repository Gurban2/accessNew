import { createSlice } from "@reduxjs/toolkit";

const departmentSlice = createSlice({
  name: "departments",
  initialState: [
    { id: 1, name: "Sales", phone: "555 555 555", office: "A" },
    { id: 2, name: "Marketing", phone: "555 555 555", office: "B" },
    { id: 3, name: "HR", phone: "555 555 555", office: "C" },
    { id: 4, name: "IT", phone: "555 555 555", office: "D" }
  ],
  reducers: {
    addDepartment: (state, action) => {
      const existingDepartment = state.find(
        (department) => department.name === action.payload.name
      );
      if (existingDepartment) {
        alert("Already exists");
        return state;
      }
      state.push(action.payload); // Используем мутацию, так как Redux Toolkit это позволяет
    },
    deleteDepartment: (state, action) => {
      return state.filter((department) => department.id !== action.payload.id);
    },
    editDepartment: (state, action) => {
      return state.map((department) =>
        department.id === action.payload.id
          ? { ...department, ...action.payload.data }
          : department
      );
    },
    filterDepartment: (state, action) => {
      return state.filter((department) =>
        department.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
});

export const {
  addDepartment,
  deleteDepartment,
  editDepartment,
  filterDepartment,
} = departmentSlice.actions;

export default departmentSlice.reducer;
