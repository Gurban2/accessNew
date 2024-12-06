import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
  fetchDepartments,
  fetchDepartment,
  addDepartment,
  updateDepartment,
  deleteDepartment,
} from '../api/departmentsApi';

import {
  setDepartmentMeta,
  setDepartment,
} from '../store/reducers/departmentReducer';

export const useFetchDepartments = () => {
  const dispatch = useDispatch();
  const query = useQuery({
    queryKey: ['departments'],
    queryFn: fetchDepartments,
  });

  useEffect(() => {
    if (query.data) {
      const { data: departments, meta } = query.data;
      dispatch(setDepartment(departments));
      dispatch(setDepartmentMeta(meta));
    }
  }, [query.data, dispatch]);

  return query;
};

export const useFetchDepartmentById = (id) => {
  return useQuery({
    queryKey: ['department', id],
    queryFn: () => fetchDepartment(id),
  });
};

export const useAddDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });
};

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateDepartment(data.id, data.department),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });
};

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['departments'] });
    },
  });
};
