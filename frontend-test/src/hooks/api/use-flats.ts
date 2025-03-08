import queryString from "query-string";
import useSWR from "swr";

import { getFlats } from "@/queries/client";
import { FilterValues } from "@/types/app";

export function useFlats(filters?: FilterValues) {
    const {
        slug,
        housing,
        roomsCount,
        priceMin,
        priceMax,
        squareMin,
        squareMax,
        floorMin,
        floorMax,
        pageSize,
        page,
    } = filters || {};

    const queryParams = {
        slug,

        page_size: pageSize,
        page,

        corps_ids: housing,
        room_ids: roomsCount,

        price_range_min: priceMin,
        price_range_max: priceMax,

        square_range_min: squareMin,
        square_range_max: squareMax,

        floor_range_min: floorMin,
        floor_range_max: floorMax,
    };

    const nonEmptyFilterValues = Object.fromEntries(
        Object.entries(queryParams).filter(([, value]) => value !== ""),
    );

    const queryStringParams = queryString.stringify(nonEmptyFilterValues);

    const { data, isLoading, error, mutate } = useSWR(
        slug ? `/api/project/${slug}/room/?${queryStringParams}` : null,
        getFlats,
        {
            errorRetryCount: 0,
        },
    );

    return {
        flats: data?.results,
        flatsCount: data?.count,
        nextPage: data?.next,
        prevPage: data?.previous,
        isLoading,
        isError: error,
        invalidate: mutate,
    };
}
