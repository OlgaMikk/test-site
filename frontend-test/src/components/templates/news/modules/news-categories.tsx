"use client";

import { cn } from "@/utils/cn";

const categories = [
    {
        id: "",
        title: "Все",
    },
    {
        id: "blog",
        title: "Блог",
    },
    {
        id: "analytics",
        title: "Аналитика",
    },
];

interface NewsCategoriesProps {
    category: string;
    onNewsParamsChange: (category: string) => void;
}
export function NewsCategories({
    category,
    onNewsParamsChange,
}: NewsCategoriesProps) {
    return (
        <div className="flex flex-row items-end gap-5 lg:gap-8">
            {categories.map((item) => (
                <button
                    key={item.title}
                    className={cn(
                        "h-fit text-[20px] !leading-none text-gray lg:text-[24px]",
                        category === item.id &&
                            "mb-[-1px] font-bold text-black lg:text-[28px]",
                    )}
                    onClick={() => onNewsParamsChange(item.id)}
                >
                    {item.title}
                </button>
            ))}
        </div>
    );
}
