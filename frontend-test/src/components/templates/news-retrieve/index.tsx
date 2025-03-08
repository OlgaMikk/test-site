"use client";

import { useEffect, useMemo, useState } from "react";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Author, NewsRetrieve } from "@/types";

import { NewsArticle } from "./modules/news-article";
import { NewsHeader } from "./modules/news-header";
import { NewsRate } from "./modules/news-rate";
import { NewsShare } from "./modules/news-share";

interface NewsRetrieveTemplateProps {
    newsRetrieve?: NewsRetrieve;
    authorList?: Author[];
}
export function NewsRetrieveTemplate({
    newsRetrieve: data,
    authorList,
}: NewsRetrieveTemplateProps) {
    const [mount, setMount] = useState(false);

    const author = useMemo(
        () => authorList?.find((author) => author.id === data?.author),
        [authorList, data?.author],
    );

    useEffect(() => {
        setMount(true);
    }, []);
    return (
        <section className="pb-[50px] pt-[40px] lg:py-[60px]">
            <div className="container">
                <div className="flex w-full flex-col gap-[30px] max-lg:items-start lg:flex-row lg:gap-[80px] ">
                    <Button
                        onClick={() =>
                            mount ? window?.history.back() : undefined
                        }
                        variant="ghost"
                        className="h-fit items-center gap-1 p-0 text-base"
                    >
                        <ArrowLeft className="flex size-5 shrink-0" />
                        Назад
                    </Button>
                    <article className="flex w-full flex-1 flex-col gap-10">
                        <NewsHeader newsRetrieve={data} author={author} />
                        <NewsArticle newsRetrieve={data} />
                        <div className="flex w-full flex-row justify-between">
                            <NewsRate newsRetrieve={data} />
                            <NewsShare newsRetrieve={data} />
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
