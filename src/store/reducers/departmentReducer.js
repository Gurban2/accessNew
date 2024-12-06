import { createSlice } from '@reduxjs/toolkit';

const departmentSlice = createSlice({
  name: 'departments',
  initialState: {
    departmentsData: [],
    loading: false,
    meta: {},
  },
  reducers: {
    addDepartment: (state, action) => {
      const updatedState = [...state.departmentsData, action.payload];
      console.log('State after adding department:', updatedState);
      return {
        ...state,
        departmentsData: updatedState,
      };
    },
    deleteDepartment: (state, action) => {
      return {
        ...state,
        departmentsData: state.departmentsData.filter(
          (department) => department.id !== action.payload.id
        ),
      };
    },
    editDepartment: (state, action) => {
      return {
        ...state,
        departmentsData: state.departmentsData.map((department) =>
          department.id === action.payload.id
            ? { ...department, ...action.payload.data }
            : department
        ),
      };
    },
    setDepartment: (state, action) => {
      return {
        ...state,
        departmentsData: action.payload,
      };
    },
    setLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    setDepartmentMeta: (state, action) => {
      return {
        ...state,
        meta: action.payload,
      };
    },
  },
});

export const {
  addDepartment,
  deleteDepartment,
  editDepartment,
  setDepartment,
  setLoading,
  setDepartmentMeta,
} = departmentSlice.actions;

export default departmentSlice.reducer;
