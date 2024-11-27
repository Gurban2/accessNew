import { createSlice } from "@reduxjs/toolkit";

const departmentSlice = createSlice({
  name: "departments",
  initialState: {
    departmentsData: [
      { id: "1", name: "Sales", phone: "555 555 555", office: "A" },
      { id: "2", name: "Marketing", phone: "555 555 555", office: "B" },
      { id: "3", name: "HR", phone: "555 555 555", office: "C" },
      { id: "4", name: "IT", phone: "555 555 555", office: "D" }
    ], // начальное состояние
  },
  reducers: {
    setDepartment(state, action) {
      state.departmentsData = action.payload; // обновление данных
    },
    addDepartment: (state, action) => {
      const existingDepartment = state.departmentsData.find(
        (department) => department.name === action.payload.name
      );
      if (existingDepartment) {
        alert("Already exists");
        return;
      }
      state.departmentsData.push(action.payload); // Добавление нового департамента
    },
    deleteDepartment: (state, action) => {
      state.departmentsData = state.departmentsData.filter(
        (department) => department.id !== action.payload.id
      );
    },
    editDepartment: (state, action) => {
      const index = state.departmentsData.findIndex(
        (department) => department.id === action.payload.id
      );
      if (index !== -1) {
        state.departmentsData[index] = {
          ...state.departmentsData[index],
          ...action.payload.data,
        };
      }
    },
    
    filterDepartment: (state, action) => {
      // Фильтрация данных на основе имени
      state.filteredDepartments = state.departmentsData.filter((department) =>
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
  setDepartment,
} = departmentSlice.actions;

export default departmentSlice.reducer;
