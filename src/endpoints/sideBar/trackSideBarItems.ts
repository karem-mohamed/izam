import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { APIError, APIResponse } from "@/types/axios";
import axiosInstance from "@/axiosInstance";
import { TrackData } from "./types";

export async function TrackSideBarItems(data: TrackData) {
  try {
    const response: APIResponse<void> = await axiosInstance.post(`track`, data);
    return response.data;
  } catch (err) {
    throw err as APIError;
  }
}

export function useTrackSideBarItems(
  options?:
    | Omit<UseMutationOptions<void, APIError, TrackData>, "mutationFn">
    | undefined
) {
  return useMutation({
    mutationFn: TrackSideBarItems,
    ...options,
  });
}
