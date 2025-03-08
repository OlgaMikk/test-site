"use client";

import { useMemo, useState } from "react";

import { Star } from "lucide-react";
import { mutate } from "swr";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { useNewsRate } from "@/hooks/api/use-news-rate";
import { patchNewsRate } from "@/queries/client";
import { NewsRetrieve } from "@/types";
import { cn } from "@/utils/cn";

interface NewsRateProps {
    newsRetrieve?: NewsRetrieve;
}
export function NewsRate({ newsRetrieve: data }: NewsRateProps) {
    const { rate: newsRate, mutate: mutateNewsRate } = useNewsRate(data?.id);
    const [rate, setRate] = useState(0);

    const rates = [1, 2, 3, 4, 5];

    const [formSended, setFormSended] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSendRate = (rate: number) => {
        setLoading(true);
        patchNewsRate(`/api/news/rating/${data?.id}/`, rate)
            .then(() => {
                setFormSended(true);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });

        mutate(`/api/news/rating/${data?.id}/`);
        mutateNewsRate();
    };

    const modifiedRate = useMemo(() => {
        return rate || newsRate?.score || data?.rating || 0;
    }, [rate, newsRate?.score, data?.rating]);

    return (
        <div
            className={cn(
                "flex flex-col gap-2",
                loading && "pointer-events-none animate-pulse",
            )}
        >
            <span className="text-lg text-gray-dark">
                {newsRate?.score ? "Спасибо за оценку!" : "Было интересно?"}
            </span>
            <div
                className="flex flex-row gap-1"
                onMouseLeave={() => (!loading ? setRate(0) : undefined)}
            >
                {rates.map((item) => (
                    <Star
                        key={item}
                        className={cn(
                            "size-5",
                            item <= modifiedRate &&
                                " fill-primary text-primary",
                        )}
                        onMouseEnter={() =>
                            !loading ? setRate(item) : undefined
                        }
                        onClick={() => onSendRate(item)}
                    />
                ))}
            </div>
            <NewsRateSuccessDialog
                open={formSended}
                onClose={() => setFormSended(false)}
            />
        </div>
    );
}

function NewsRateSuccessDialog({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    return (
        <Dialog
            key="success-consultation-dialog"
            open={open}
            onOpenChange={onClose}
        >
            <Dialog.Content className="flex flex-col items-center justify-center gap-6 p-6 py-14 sm:w-96 md:gap-10 md:p-10 xl:w-[500px]">
                <div className="text-center text-xl font-semibold md:text-3xl">
                    Ваша оценка принята, спасибо!
                </div>
                <Button
                    className="w-full text-[16px]"
                    size="xl"
                    onClick={onClose}
                >
                    Вернуться к новости!
                </Button>
            </Dialog.Content>
        </Dialog>
    );
}
