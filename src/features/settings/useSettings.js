import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const settings = useQuery({ queryKey: ["settings"], queryFn: getSettings });

  const { isLoading, error, data: setting } = settings;

  return { isLoading, error, setting };
}
