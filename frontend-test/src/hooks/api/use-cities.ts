import useSWR from "swr";

import { getCities } from "@/queries/client";

export const useCities = () => {
    const { data, isLoading, error } = useSWR("/api/project/city/", getCities);

    return {
        cities: data,
        isLoading,
        isError: error,
    };
};
