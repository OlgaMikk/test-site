import { api } from "@/lib/axios";
import { CareerConsultation, Consultation, ReservationData } from "@/types";
import {
    bankSchema,
    citySchema,
    ratingSchema,
    siteSettingsSchema,
} from "@/types/schemas";

import { roomsPageSchema } from "../types/schemas";

export const getCities = (url: string) =>
    api.get(url).then(({ data }) => citySchema.array().parse(data));

export const getFlats = (url: string) =>
    api.get(url).then(({ data }) => roomsPageSchema.parse(data));

export const postConsultation = (url: string, data: Consultation) =>
    api.post(url, data);

export const postCareerConsultation = (
    url: string,
    data: CareerConsultation,
) => {
    const formData = new FormData();
    formData.append("full_name", data.full_name);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("specialty", data.specialty);

    if (data.resume) {
        formData.append("resume", data.resume);
    }
    if (data.cover_letter) {
        formData.append("cover_letter", data.cover_letter);
    }

    return api.post(url, data, {
        headers: {
            "Content-type": "multipart/form-data",
        },
    });
};

export const patchNewsRate = (url: string, rate: number) => {
    return api.patch(url, { score: rate });
};

export const getNewsRate = (url: string) =>
    api.get(url).then(({ data }) => ratingSchema.parse(data));

export async function postConfirm(
    url: string,
    { arg }: { arg: { email: string; project: number } },
) {
    return api.post(url, arg);
}

export async function postReservation(
    url: string,
    { arg }: { arg: ReservationData },
) {
    return api.post(url, arg);
}

export const getBanks = (url: string) =>
    api.get(url).then(({ data }) => bankSchema.array().optional().parse(data));

export const getSiteSettings = (url: string) =>
    api
        .get(url)
        .then(({ data }) => siteSettingsSchema.array().optional().parse(data));
