import { z } from "zod";

import {
    advantagesSchema,
    authorSchema,
    bankSchema,
    buildingProgressImageSchema,
    buildingProgressSchema,
    careerConsultationSchema,
    careerSchema,
    companyHistoryBlockSchema,
    companyHistorySchema,
    consultationSchema,
    employeeSchema,
    estateObjectSchema,
    jumbotronSchema,
    newsListSchema,
    newsRetrieveSchema,
    newsSchema,
    pageResultSchema,
    partnerSchema,
    projectImagesSchema,
    projectSchema,
    reservationSchema,
    roomSchema,
    textBlocksSchema,
    yearSchema,
} from "./schemas";

export type Projects = z.infer<typeof projectSchema>;

export type PageResult = z.infer<typeof pageResultSchema>;

export type AdvantageType = z.infer<typeof advantagesSchema>;

export type ProjectImages = z.infer<typeof projectImagesSchema>;

export type FlatType = z.infer<typeof roomSchema>;

export type EstateObject = z.infer<typeof estateObjectSchema>;

export type ReservationData = z.infer<typeof reservationSchema>;

export type Bank = z.infer<typeof bankSchema>;

export type Jumbotron = z.infer<typeof jumbotronSchema>;

export type TextBlock = z.infer<typeof textBlocksSchema>;

export type BuildingProgress = z.infer<typeof buildingProgressSchema>;

export type BuildingProgressImage = z.infer<typeof buildingProgressImageSchema>;

export type CompanyHistoryBlock = z.infer<typeof companyHistoryBlockSchema>;

export type CompanyHistory = z.infer<typeof companyHistorySchema>;

export type Year = z.infer<typeof yearSchema>;

export type Employee = z.infer<typeof employeeSchema>;

export type Partner = z.infer<typeof partnerSchema>;

export type Career = z.infer<typeof careerSchema>;

export type CareerConsultation = z.infer<typeof careerConsultationSchema>;

export type Consultation = z.infer<typeof consultationSchema>;

export type News = z.infer<typeof newsSchema>;

export type NewsList = z.infer<typeof newsListSchema>;

export type NewsRetrieve = z.infer<typeof newsRetrieveSchema>;

export type Author = z.infer<typeof authorSchema>;
