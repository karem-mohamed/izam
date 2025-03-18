import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { APIError, APIResponse } from "@/types/axios";
import axiosInstance from "@/axiosInstance";
import { NavItem } from "./types";

export async function fetchSideBarItems() {
  try {
    const response: APIResponse<NavItem[]> = await axiosInstance.get(`nav`);
    return response.data;
  } catch (err) {
    throw err as APIError;
  }
}

export function useFetchSideBarItems(
  options?:
    | Omit<UseMutationOptions<NavItem[], APIError>, "mutationFn">
    | undefined
) {
  return useMutation({
    mutationFn: fetchSideBarItems,
    ...options,
  });
}
