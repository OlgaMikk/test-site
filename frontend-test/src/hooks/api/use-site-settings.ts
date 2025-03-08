import useSWR from "swr";

import { getSiteSettings } from "@/queries/client";

export const useSiteSettings = () => {
    const { data, isLoading, error } = useSWR("/api/setting/", getSiteSettings);

    return {
        siteSettings: data ? data[0] : undefined,
        isLoading,
        isError: error,
    };
};
