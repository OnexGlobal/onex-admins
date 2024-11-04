import {useQuery} from "react-query";
import {AxiosResponse} from "axios";
import {Refetch} from "@repo/types";
import {DashboardData} from "@repo/types/src/dashboard";
import {GetDashboardData} from "../../services/dashboard";

export default function useDashboardData(filters: Record<string, string>): {
    dashboardData?: AxiosResponse<DashboardData>;
    isLoading?: boolean;
    refetch?: Refetch;
} {
    const {
        data: dashboardData,
        isLoading,
        refetch,
    } = useQuery(["dashboardData", filters], () => GetDashboardData(filters), {
        staleTime: Infinity,
        enabled: !!filters,
    });
    return {dashboardData, isLoading, refetch};
}
