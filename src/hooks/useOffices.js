import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchOffices,
  addOffice,
  deleteOffice,
  fetchOffice,
  updateOffice,
} from "../api/officesApi";
import { useDispatch } from "react-redux";
import { setOfficeMeta, setOffices } from "../store/reducers/officeReducer";
import { useEffect } from "react";

export const useFetchOffices = () => {
  const dispatch = useDispatch();

  const query = useQuery({
    queryKey: ["offices"],
    queryFn: fetchOffices,
  });

  useEffect(() => {
    if (query.data) {
      const { data: offices, meta } = query.data;
      dispatch(setOffices(offices));
      dispatch(setOfficeMeta(meta));
    }
  }, [query.data, dispatch]);

  return query;
};

export const useFetchOfficeById = (id) => {
  return useQuery({
    queryKey: ["office", id],
    queryFn: () => fetchOffice(id),
  });
};

export const useAddOffice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addOffice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offices"] }); // Refresh offices
    },
  });
};

export const useUpdateOffice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateOffice(data.id, data.office),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offices"] }); // Refresh offices
    },
  });
};

export const useDeleteOffice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteOffice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["offices"] }); // Refresh offices
    },
  });
};
