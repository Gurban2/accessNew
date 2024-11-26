import { createSlice } from "@reduxjs/toolkit";

const departmentSlice = createSlice({
  name: "departments",
  initialState: {
    departmentsData: [], // начальное состояние
  },
  reducers: {
    setDepartmentsData(state, action) {
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
  setDepartmentsData,
} = departmentSlice.actions;

export default departmentSlice.reducer;
