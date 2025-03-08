import { notFound } from "next/navigation";

import { BASE_URL } from "@/lib/axios";
import {
    authorSchema,
    bankSchema,
    careerSchema,
    companyHistorySchema,
    employeeSchema,
    jumbotronSchema,
    newsListSchema,
    newsRetrieveSchema,
    pageResultSchema,
    partnerSchema,
    projectSchema,
    siteSettingsSchema,
    viewSeoSchema,
    yearSchema,
} from "@/types/schemas";

export async function getAllProjectsData({
    filters,
}: {
    filters: {
        city?: string;
        page: string;
        type?: string;
        page_size?: number;
    };
}) {
    const { city = "", page = "1", page_size = 3, type } = filters;

    const res = await fetch(
        `${BASE_URL}/api/project/?city_slug=${city}&page_size=${page_size}&page=${page}${
            type ? `&type=${type}` : ""
        }`,
        {
            next: {
                revalidate: 10,
            },
        },
    );

    const jsonData = await res.json();
    return pageResultSchema.parse(jsonData);
}

export async function getBanksData() {
    const response = await fetch(`${BASE_URL}/api/bank/`, {
        next: {
            revalidate: 10,
        },
    });

    const jsonData = await response.json();
    return bankSchema.array().optional().parse(jsonData);
}

export async function getProjectData({ slug }: { slug: string }) {
    const res = await fetch(`${BASE_URL}/api/project/${slug}/`, {
        next: {
            revalidate: 10,
        },
    }).then((res) => {
        if (res.status === 404) {
            notFound();
        }

        return res.json();
    });

    return projectSchema.optional().parse(res);
}

export async function getSiteSettings() {
    const response = await fetch(`${BASE_URL}/api/setting/`, {
        next: { revalidate: 10 },
    }).then((res) => {
        if (res.status === 404) {
            notFound();
        }

        return res.json();
    });

    return siteSettingsSchema.array().optional().parse(response);
}

export async function getSeoViewData(view: string) {
    const response = await fetch(
        `${BASE_URL}/api/setting/seo/view?view=${view}`,
        {
            next: { revalidate: 10 },
        },
    ).then((res) => {
        if (res.status === 404) {
            notFound();
        }
        return res.json();
    });

    return viewSeoSchema.optional().parse(response);
}

export async function getJumbotronData() {
    const response = await fetch(`${BASE_URL}/api/modules/jumbotron/`, {
        next: { revalidate: 10 },
    }).then((res) => {
        if (res.status === 404) {
            notFound();
        }

        return res.json();
    });

    return jumbotronSchema.array().optional().parse(response);
}

export async function getCompanyHistoryData({ year }: { year: number | null }) {
    const res = await fetch(
        `${BASE_URL}/api/company_history/${year ? `?year=${year}` : ""}`,
        {
            next: {
                revalidate: 10,
            },
        },
    ).then((res) => {
        if (res.status === 404) {
            notFound();
        }

        return res.json();
    });

    return companyHistorySchema.array().optional().parse(res);
}

export async function getCompanyHistoryYearData() {
    const res = await fetch(`${BASE_URL}/api/company_history/year/`, {
        next: {
            revalidate: 10,
        },
    }).then((res) => {
        if (res.status === 404) {
            notFound();
        }

        return res.json();
    });

    return yearSchema.array().optional().parse(res);
}

export async function getEmployeeData() {
    const res = await fetch(`${BASE_URL}/api/team/employee/`, {
        next: {
            revalidate: 10,
        },
    }).then((res) => {
        if (res.status === 404) {
            notFound();
        }

        return res.json();
    });

    return employeeSchema.array().optional().parse(res);
}

export async function getPartnerData() {
    const res = await fetch(`${BASE_URL}/api/partner/`, {
        next: {
            revalidate: 10,
        },
    }).then((res) => {
        if (res.status === 404) {
            notFound();
        }

        return res.json();
    });

    return partnerSchema.array().optional().parse(res);
}

export async function getCareerData() {
    const res = await fetch(`${BASE_URL}/api/career/vacancy/`, {
        next: {
            revalidate: 10,
        },
    }).then((res) => {
        if (res.status === 404) {
            notFound();
        }

        return res.json();
    });

    return careerSchema.array().optional().parse(res);
}

export async function getNewsData({
    year,
    category,
    pageSize,
    project,
}: {
    year: string;
    category: string;
    pageSize: string;
    project: string;
}) {
    const res = await fetch(
        `${BASE_URL}/api/news/?publication_date__year=${year}&category=${category}&page_size=${pageSize}&project=${project}`,
        {
            next: {
                revalidate: 10,
            },
        },
    ).then((res) => {
        if (res.status === 404) {
            notFound();
        }

        return res.json();
    });
    return newsListSchema.optional().parse(res);
}

export async function getNewsYearData() {
    const res = await fetch(`${BASE_URL}/api/news/year/`, {
        next: {
            revalidate: 10,
        },
    }).then((res) => {
        if (res.status === 404) {
            notFound();
        }

        return res.json();
    });

    return yearSchema.array().optional().parse(res);
}

export async function getNewsRetrieveData({ slug }: { slug: string }) {
    const res = await fetch(`${BASE_URL}/api/news/${slug}/`, {
        next: {
            revalidate: 10,
        },
    }).then((res) => {
        if (res.status === 404) {
            notFound();
        }

        return res.json();
    });

    return newsRetrieveSchema.optional().parse(res);
}

export async function getNewsAuthorData() {
    const res = await fetch(`${BASE_URL}/api/news/author/`, {
        next: {
            revalidate: 10,
        },
    }).then((res) => {
        if (res.status === 404) {
            notFound();
        }

        return res.json();
    });

    return authorSchema.array().optional().parse(res);
}
