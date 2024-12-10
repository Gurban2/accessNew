import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  fetchVisitors,
  addVisitor,
  deleteVisitor,
  fetchVisitor,
  updateVisitor,
  blockVisitorApi,
  fetchDocumentTypes,
  fetchVisitorComplaints,
} from "../api/visitorsApi";

import { setVisitors, setVisitorsMeta } from "../store/reducers/visitorReducer";
import useQueryParams from "./useQueryParams";

export const useFetchVisitors = () => {
  const dispatch = useDispatch();
  const [queryParams, queryParamsKey] = useQueryParams();

  const query = useQuery({
    queryKey: ["visitors", queryParamsKey],
    queryFn: () => fetchVisitors(queryParams),
  });

  useEffect(() => {
    if (query.data) {
      const { data: visitors, meta } = query.data;
      dispatch(setVisitors(visitors));
      dispatch(setVisitorsMeta(meta));
    }
  }, [query.data, dispatch]);

  return query;
};

export const useFetchVisitorById = (id) => {
  return useQuery({
    queryKey: ["visitor", id],
    queryFn: () => fetchVisitor(id),
  });
};

export const useAddVisitor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (visitor) => addVisitor(visitor),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitors"] });
    },
  });
};
export const useFetchVisitorComplaints = (id) => {
  return useQuery({
    queryKey: ["visitorComplaint", id],
    queryFn: () => fetchVisitorComplaints(id),
  });
};

export const useUpdateVisitor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => updateVisitor(data.id, data.visitor),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["visitors"] });
      queryClient.invalidateQueries({ queryKey: ["visitor", variables.id] });
    },
  });
};

export const useBlockVisitor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => blockVisitorApi(id), // Функция для выполнения мутации
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["visitors"] });
      queryClient.invalidateQueries({ queryKey: ["visitor", id] });
    },
    onError: (error) => {
      console.error("Error blocking visitor:", error);

      alert(`Failed to block visitor: ${error.message}`);
    },
  });
};

export const useDeleteVisitor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVisitor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["visitors"] });
    },
  });
};

export const useFetchDocumentTypes = () => {
  return useQuery({
    queryKey: ["documentTypes"],
    queryFn: fetchDocumentTypes,
  });
};
