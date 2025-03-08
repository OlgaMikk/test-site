import { EstateObject } from "@/types";

export const findMinFilterOption = (
    estate_objects?: EstateObject[],
    optionKey?: keyof EstateObject,
) => {
    let minValue = Infinity;

    if (optionKey) {
        estate_objects?.forEach((estate) => {
            const parameter = estate[optionKey];
            if (typeof parameter === "number") {
                const parameterMax = parameter;
                if (parameter && parameterMax < minValue) {
                    minValue = parameterMax;
                }
            }
        });
    }
    return String(minValue);
};

export const findMaxFilterOption = (
    estate_objects?: EstateObject[],
    optionKey?: keyof EstateObject,
) => {
    let maxValue = 0;

    if (optionKey) {
        estate_objects?.forEach((estate) => {
            const parameter = estate[optionKey];
            if (typeof parameter === "number") {
                const parameterMax = parameter;
                if (parameter && parameterMax > maxValue) {
                    maxValue = parameterMax;
                }
            }
        });
    }
    return String(maxValue);
};
