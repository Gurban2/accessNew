import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchVisitors,
  addVisitor,
  deleteVisitor,
  fetchVisitor,
  updateVisitor,
  blockVisitorApi,
  fetchDocumentTypes,
  fetchVisitorComplaints,
  fetchInfoByDoc,
  startVisit,
  endVisit,
} from "../api/visitorsApi";

import useQueryParams from "./useQueryParams";

export const useFetchVisitors = () => {
  const [queryParams, queryParamsKey] = useQueryParams();

  const query = useQuery({
    queryKey: ["visitors", queryParamsKey],
    queryFn: () => fetchVisitors(queryParams),
  });

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
    mutationFn: (id) => blockVisitorApi(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["visitors"] });
      queryClient.invalidateQueries({ queryKey: ["visitor", id] });

      const visitors = queryClient.getQueryData(["visitors"]);
      if (visitors) {
        queryClient.setQueryData(["visitors"], {
          ...visitors,
          data: visitors.data.filter((visitor) => visitor.id !== id),
        });
      }
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

export const useInfoByDoc = () => {
  return useMutation({
    mutationFn: fetchInfoByDoc,
  });
};

export const useStartVisit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    queryKey: ["startVisit"],
    mutationFn: startVisit,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["visitors"] });
      queryClient.invalidateQueries({ queryKey: ["visitor", id] });
    },
  });
};

export const useEndVisit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    queryKey: ["endVisit"],
    mutationFn: endVisit,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["visitors"] });
      queryClient.invalidateQueries({ queryKey: ["visitor", id] });
    },
  });
};
