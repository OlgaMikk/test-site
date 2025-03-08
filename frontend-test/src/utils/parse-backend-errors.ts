import { AxiosError } from "axios";

type BackendErrorResponse =
    | {
          code: string | string[];
      }
    | undefined;

export type CustomAxiosError = AxiosError<BackendErrorResponse> | undefined;

export const parseBackendErrors = (error: any) => {
    const responseData = (error as CustomAxiosError)?.response?.data;

    if (!responseData) {
        return "";
    } else if (responseData && responseData.code) {
        return "Неверный код";
    } else if (
        Array.isArray(responseData) &&
        responseData.includes("Invalid code")
    ) {
        return "Неверный код";
    } else {
        return "Произошла ошибка";
    }
};
