import useSWR from "swr";

import { getNewsRate } from "@/queries/client";

export const useNewsRate = (id?: number) => {
    const { data, isLoading, error, mutate } = useSWR(
        `/api/news/rating/${id}/`,
        getNewsRate,
    );

    return {
        rate: data,
        isLoading,
        isError: error,
        mutate,
    };
};
