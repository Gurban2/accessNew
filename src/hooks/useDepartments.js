import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  fetchDepartments,
  fetchDepartment,
  addDepartment,
  updateDepartment,
  deleteDepartment,
} from "../api/departmentsApi";

import {
  setDepartmentMeta,
  setDepartment,
} from "../store/reducers/departmentReducer";

export const useFetchDepartments = () => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
    // onError: (error) => {
    //   console.error("Error fetching departments:", error);
    // },
    // onSuccess: (data) => {
    //   const { data: departments, meta } = data;
    //   dispatch(setDepartment(departments));
    //   dispatch(setDepartmentMeta(meta));
    // },
  });

  useEffect(() => {
    if (query.data) {
      const { data: departments, meta } = query.data;
      dispatch(setDepartment(departments));
      dispatch(setDepartmentMeta(meta));
    }
  }, [query.data, dispatch]);

  return query;
  // return {
  //   ...query,
  //   departments: query.data?.data || [], // Extract departments
  //   meta: query.data?.meta || {}, // Extract meta
  // };
};

// export const useFetchDepartmentById = (id) => {
//   return useQuery({
//     queryKey: ['department', id],
//     queryFn: () => fetchDepartment(id),
//   });
// };
// Fetch a single department by ID
export const useFetchDepartmentById = (id) => {
  return useQuery({
    queryKey: ["department", id],
    queryFn: () => fetchDepartment(id),
    onError: (error) => {
      console.error("Error fetching department:", error);
    },
  });
};

// export const useAddDepartment = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: addDepartment,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['departments'] });
//     },
//   });
// };
// Add a department
export const useAddDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addDepartment,
    onError: (error) => {
      console.error("Error adding department:", error);
    },
    onSuccess: () => {
      // Invalidate 'departments' query to refetch
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};

// export const useUpdateDepartment = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (data) => updateDepartment(data.id, data.department),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['departments'] });
//     },
//   });
// };
// Update a department
export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateDepartment(data.id, data.department),
    onError: (error) => {
      console.error("Error updating department:", error);
    },
    onSuccess: () => {
      // Invalidate 'departments' query to refetch
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};

// export const useDeleteDepartment = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: deleteDepartment,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['departments'] });
//     },
//   });
// };
// Delete a department

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDepartment,
    onError: (error) => {
      console.error("Error deleting department:", error);
    },
    onSuccess: () => {
      // Invalidate 'departments' query to refetch
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
};
