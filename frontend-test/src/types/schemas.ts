import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 512; // 512Mb
const ACCEPTED_FILE_TYPES = ["application/pdf"];

export const jumbotronSchema = z.object({
    id: z.number(),
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    button_link: z.string(),
    picture: z.string(),
    order: z.number(),
});
export const featuredAdvantagesSchema = z.object({
    id: z.number(),
    icon: z.object({
        id: z.number(),
        title: z.string(),
        icon: z.string(),
    }),
    title: z.string(),
});
export const advantagesSchema = z.object({
    id: z.number(),
    icon: z.object({
        id: z.number(),
        title: z.string(),
        icon: z.string(),
    }),
    title: z.string(),
});

export const routesSchema = z.object({
    id: z.number(),
    icon: z.string(),
    destination: z.string(),
    travel_time: z.string(),
    order: z.number(),
    location: z.number(),
});

export const textBlocksSchema = z.object({
    id: z.number(),
    title: z.string(),
    horizontal_image: z.string(),
    square_image: z.string(),
    text: z.string(),
    order: z.number(),
    project: z.number(),
});

export const projectImagesSchema = z.object({
    id: z.number(),
    image: z.string(),
});

export const citySchema = z.object({
    id: z.number(),
    title: z.string(),
    slug: z.string(),
});

export const estateObjectSchema = z
    .object({
        id: z.number(),
        title: z.string(),
        corps: z.number().nullable(),
        area_max: z.number().nullable(),
        area_min: z.number().nullable(),
        floor_count: z.number().nullable(),
        room_count: z.number().nullable(),
    })
    .partial();

export const buildingProgressImageSchema = z.object({
    id: z.number(),
    image: z.string(),
    order: z.number(),
    building_progress: z.number(),
});

export const buildingProgressSchema = z.object({
    id: z.number(),
    images: buildingProgressImageSchema.array(),
    year: z.number(),
    month: z.number(),
    description: z.string(),
    order: z.number(),
    project: z.number(),
});

export const geotagSchema = z.object({
    id: z.number(),
    icon: z.object({
        id: z.number(),
        title: z.string(),
        icon: z.string(),
    }),
    title: z.string(),
    longitude: z.string(),
    latitude: z.string(),
    project: z.number(),
});

export const projectSchema = z.object({
    id: z.number(),
    slug: z.string(),
    title: z.string(),
    logo: z.string().nullable().optional(),
    image: z.string(),
    short_description: z.string(),
    short_description_image: z.string().nullable().optional(),
    featured_advantages: featuredAdvantagesSchema.array().nullable().optional(),
    advantages: advantagesSchema.array(),
    description: z.string(),
    housing_description: z.string().optional(),
    catalog_btn_link: z.string().nullable().optional(),
    address: z.string(),
    icon: z.string().nullable().optional(),
    longitude: z.string(),
    latitude: z.string(),
    type: z.string(),
    location: z
        .object({
            id: z.number(),
            routes: routesSchema.array(),
            title: z.string(),
            description: z.string(),
            image: z.string(),
            ya_maps_link: z.string().nullable(),
        })
        .nullable()
        .optional(),
    is_published: z.boolean(),
    estate_objects: estateObjectSchema.array(),
    images: projectImagesSchema.array(),
    city: citySchema,
    text_blocks: textBlocksSchema.array().optional(),
    building_progresses: buildingProgressSchema.array().optional(),
    geotags: geotagSchema.array().optional(),
    video_url: z.string().optional().nullable(),
    tour_3d_url: z.string().optional().nullable(),
});

export const pageResultSchema = z
    .object({
        count: z.number().optional(),
        next: z.string().nullable().optional(),
        previous: z.string().nullable().optional(),
        results: projectSchema.array().optional(),
    })
    .optional();

export const roomLayoutSchema = z.object({
    id: z.number(),
    title: z.string(),
    square: z.string(),
    room: z.number(),
    image: z.string(),
});

export const roomSchema = z.object({
    id: z.number(),
    estate_object: z.number(),
    flat: z.number(),
    floor: z.number(),
    layout: roomLayoutSchema,
    price: z.string(),
});

export const roomsPageSchema = z
    .object({
        count: z.number(),
        next: z.string().nullable(),
        previous: z.string().nullable(),
        results: roomSchema.array(),
    })
    .optional();

const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

export const reservationSchema = z.object({
    full_name: z
        .string()
        .max(255, "Допускается не более 255 символов")
        .min(3, "ФИО должно состоять хотя бы из 3 символов"),
    phone: z.string().regex(phoneRegex, "Неверный номер телефона"),
    email: z.string().email("Некорректный email"),
    room: z.string(),
    code: z.string(),
    project: z.number(),
});

export const consultationSchema = z.object({
    full_name: z
        .string()
        .min(1, "Обязательное поле")
        .max(75, "Допускается не более 75 символов"),
    phone: z.string().min(18, "Обязательное поле"),

    email: z
        .string()
        .max(50, "Допускается не более 50 символов")
        .email("Некорректный email"),

    city: z
        .string()
        .min(1, "Обязательное поле")
        .max(25, "Допускается не более 25 символов"),
});

// export const consultationSchema = z
// .object({
//     full_name: z
//         .string()
//         .max(75, "Допускается не более 75 символов")
//         .optional(),
//     phone: z.preprocess(
//         (val) => (typeof val === "string" && val !== "" ? val : undefined),
//         z
//             .string()
//             .max(20, "Допускается не более 20 символов")
//             .regex(phoneRegex, "Неверный номер телефона")
//             .optional(),
//     ),
//     email: z.preprocess(
//         (val) => (typeof val === "string" && val !== "" ? val : undefined),
//         z
//             .string()
//             .max(50, "Допускается не более 50 символов")
//             .email("Некорректный email")
//             .optional(),
//     ),
//     city: z.string().max(25, "Допускается не более 25 символов").optional(),
// })
// .superRefine((data, ctx) => {
//     if (!data.phone && !data.email) {
//         ctx.addIssue({
//             code: "custom",
//             path: ["phone"],
//             message: "Заполните одно из полей",
//         });
//         ctx.addIssue({
//             code: "custom",
//             path: ["email"],
//             message: "Заполните одно из полей",
//         });
//     }
// });
export const bankSchema = z.object({
    id: z.number(),
    title: z.string(),
    icon: z.string(),
    url: z.string(),
});

export const siteSettingsSchema = z.object({
    id: z.number(),
    phone: z.string(),
    email: z.string(),
    inn: z.string(),
    ogrn: z.string(),
    privacy_policy: z.string(),
    data_processing: z.string(),
    projects: projectSchema.array(),
});

// SEO schemas
const seoResultsSchema = z.object({
    id: z.number(),
    object_type: z.string(),
    twitter_type: z.string(),
    index: z.string(),
    follow: z.string(),
    canonical: z.string(),
    title: z.string(),
    og_title: z.string(),
    keywords: z.string(),
    description: z.string(),
    og_description: z.string(),
    image: z.string(),
    width: z.number(),
    height: z.number(),
    alt: z.string(),
    h1: z.string(),
    seo_text: z.string(),
    view: z.string(),
});

export const viewSeoSchema = z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: seoResultsSchema.array(),
});

export const companyHistoryBlockSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    image: z.string(),
    order: z.number(),
    company_history: z.number(),
});

export const companyHistorySchema = z.object({
    year: z.number(),
    blocks: companyHistoryBlockSchema.array(),
    title: z.string(),
    subtitle: z.string(),
});

export const yearSchema = z.object({
    year: z.number(),
});
export const authorSchema = z.object({
    id: z.number(),
    full_name: z.string(),
    avatar: z.string(),
    position: z.string(),
});

export const employeeSchema = z.object({
    id: z.number(),
    type: z.string(),
    full_name: z.string(),
    position: z.string(),
    photo: z.string(),
    quote: z.string(),
    phone: z.string(),
    email: z.string(),
    order: z.number(),
});

export const partnerSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    image: z.string(),
});

export const careerSchema = z.object({
    id: z.number(),
    position: z.string(),
    salary: z.string(),
    conditions: z.string().array(),
    requirements: z.string().array(),
});

export const careerConsultationSchema = z.object({
    full_name: z
        .string()
        .min(1, "Обязательное поле")
        .max(75, "Допускается не более 50 символов"),
    phone: z.string().min(18, "Обязательное поле"),
    email: z
        .string()
        .min(1, "Обязательное поле")
        .max(50, "Допускается не более 50 символов")
        .email("Некорректный email"),
    specialty: z.string().max(50, "Допускается не более 50 символов"),
    resume: z
        .custom<File>()
        .refine(
            (file) => {
                return file instanceof File;
            },
            { message: "Ожидался файл!" },
        )
        .refine(
            (file) => file?.size <= MAX_FILE_SIZE,
            `Размер файла слишком велик!`,
        )
        .refine(
            (file) => ACCEPTED_FILE_TYPES.includes(file?.type),
            "Для загрузки необходим только файл с расширением .pdf!",
        ),
    cover_letter: z
        .custom<File | null>()
        .refine(
            (file) => {
                if (file === null) {
                    return true;
                }
                return file instanceof File;
            },
            { message: "Ожидался файл!" },
        )
        .refine((file) => {
            if (file) {
                return file?.size <= MAX_FILE_SIZE;
            }
            return true;
        }, `Размер файла слишком велик!`)
        .refine((file) => {
            if (file) {
                return ACCEPTED_FILE_TYPES.includes(file?.type);
            }
            return true;
        }, "Для загрузки необходим только файл с расширением .pdf!"),
    vacancy: z.number().nullable(),
});

export const newsSchema = z.object({
    id: z.number(),
    slug: z.string(),
    title: z.string(),
    cover_image: z.string().nullable(),
    publication_date: z.string(),
    category: z.string(),
    project: z.number().nullable().optional(),
    author: z.number(),
    order: z.number().optional(),
});

export const newsListSchema = z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: newsSchema.array(),
});
export const newsRetrieveSchema = newsSchema.extend({
    article_blocks: z
        .object({
            id: z.number(),
            text: z.string(),
            image: z.string(),
            order: z.number().optional(),
            news: z.number(),
        })
        .array(),
    rating: z.number(),
});
export const ratingSchema = z.object({
    score: z.number(),
});
