import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { APIError, APIResponse } from "@/types/axios";
import axiosInstance from "@/axiosInstance";
import { NavItem } from "./types";

export async function OrderSideBarItems(data: NavItem[]) {
  try {
    const response: APIResponse<void> = await axiosInstance.post(`nav`, data);
    return response.data;
  } catch (err) {
    throw err as APIError;
  }
}

export function useOrderSideBarItems(
  options?:
    | Omit<UseMutationOptions<void, APIError, NavItem[]>, "mutationFn">
    | undefined
) {
  return useMutation({
    mutationFn: OrderSideBarItems,
    ...options,
  });
}
