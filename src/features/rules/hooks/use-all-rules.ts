import { useQuery, UseQueryResult } from "react-query";
import { useAuth } from "@p-features/login/hooks/use-auth";
import { getAllRules } from "../rules-service";

type AllRulesReturn = Awaited<ReturnType<typeof getAllRules>>;

export function useAllRules(): UseQueryResult<AllRulesReturn, unknown>;
export function useAllRules<T>(select: (data: AllRulesReturn) => T): UseQueryResult<T, unknown>;
export function useAllRules<T>(select?: (data: AllRulesReturn) => T) {
  const { user } = useAuth();
  return useQuery("getAllRules", () => getAllRules(), { enabled: user !== null, select });
}
