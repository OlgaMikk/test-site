"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { FileInput } from "@/components/ui/file-loader";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scrollarea";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/browser";
import { postCareerConsultation } from "@/queries/client";
import { Career } from "@/types";
import { careerConsultationSchema } from "@/types/schemas";
import { cn } from "@/utils/cn";

import { PhoneInput } from "../ui/phone-input";

export type CareerConsultation = z.infer<typeof careerConsultationSchema>;

interface VacancySheetProps {
    open: boolean;
    onClose: () => void;
    vacancy: Career | null;
}
export function VacancySheet({ open, onClose, vacancy }: VacancySheetProps) {
    const lg = useMediaQuery("(min-width: 1024px)");

    const [openForm, setOpenForm] = useState(false);

    const form = useForm<CareerConsultation>({
        defaultValues: {
            full_name: "",
            phone: "",
            email: "",
            specialty: "",
            cover_letter: null,
            vacancy: vacancy?.id || null,
        },
        resolver: zodResolver(careerConsultationSchema),
        mode: "onChange",
    });

    const formHasErrors = Object.keys(form.formState.errors).length > 0;

    const [formSended, setFormSended] = useState(false);
    const [loading, setLoading] = useState(false);
    const [responseError, setResponseError] = useState(false);

    useEffect(() => {
        form.reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formSended]);

    useEffect(() => {
        if (vacancy?.id) {
            form.setValue("vacancy", vacancy?.id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vacancy?.id]);

    const onSubmit = form.handleSubmit((data: CareerConsultation) => {
        setResponseError(false);
        setLoading(true);
        postCareerConsultation("/api/career/job/response/", data)
            .then(() => {
                setFormSended(true);
                setLoading(false);
            })
            .catch(() => {
                setResponseError(true);
                setLoading(false);
            });

        mutate("/api/career/job/response/");
    });

    useEffect(() => {
        if (open) {
            setOpenForm(false);
            setFormSended(false);
            setLoading(false);
            setResponseError(false);
        }
    }, [open]);

    const VacancyInformation = () => {
        return (
            <div className="flex flex-1 overflow-y-auto">
                <ScrollArea className="size-full">
                    <div className="flex h-[500px] w-full flex-col gap-8 p-6">
                        <div className="flex w-full">
                            <span className="text-sm text-gray lg:text-lg">
                                Вакансия
                            </span>
                        </div>
                        <div className="flex w-full flex-col gap-5">
                            <div className="flex w-full flex-col gap-2">
                                <h3 className="text-[22px] font-bold leading-tight lg:text-[30px]">
                                    {vacancy?.position}
                                </h3>
                                <span className="text-base lg:text-lg lg:font-medium">
                                    {vacancy?.salary}
                                </span>
                            </div>
                            <div className="flex w-full">
                                <ul>
                                    {vacancy?.conditions.map((item, idx) => (
                                        <li
                                            className="text-base lg:text-lg"
                                            key={idx}
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="flex w-full flex-col gap-5">
                            <div className="flex w-full flex-col gap-2">
                                <span className="text-[20px] font-medium leading-tight lg:text-[24px] lg:font-semibold">
                                    Требования
                                </span>
                            </div>
                            <div className="flex w-full">
                                <ul>
                                    {vacancy?.requirements.map((item, idx) => (
                                        <li
                                            className="text-base lg:text-lg"
                                            key={idx}
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </div>
        );
    };

    const VacancySuccessDialog = () => {
        return (
            <div className="relative flex flex-1 overflow-y-auto">
                <ScrollArea className="size-full">
                    <div className="flex w-full max-w-[630px] flex-col gap-[20px] p-6 lg:gap-[30px]">
                        <span className="text-sm text-gray max-lg:mb-2.5 lg:text-lg">
                            Вакансии
                        </span>
                        <h3 className="text-[22px] font-bold lg:text-[30px]">
                            Отклик на вакансию
                        </h3>
                        <p className="text-[18px] font-normal leading-tight lg:text-[26px] lg:font-medium">
                            Спасибо, Ваш отклик отправлен! <br />
                            Мы постараемся обработать его как можно скорее
                            и&nbsp;обязательно вернемся с&nbsp;обратной связью
                        </p>
                    </div>
                </ScrollArea>
                <div className="absolute bottom-16 right-16 size-1/2">
                    <Image
                        src={"/images/team/logo.svg"}
                        fill
                        alt=""
                        className="size-full object-contain"
                    />
                </div>
            </div>
        );
    };
    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent
                side={lg ? "right" : "bottom"}
                className="p-0"
                onFocus={(e) => e.preventDefault()}
                onFocusCapture={(e) => e.preventDefault()}
            >
                <div className="relative flex size-full flex-row overflow-hidden">
                    <div
                        className={cn(
                            "absolute left-0 top-0 z-10 flex size-full flex-col gap-5 overflow-hidden  bg-gray-bg transition duration-300",
                            openForm && "translate-x-full",
                        )}
                    >
                        <VacancyInformation />
                        <div className="flex w-full p-6">
                            <Button
                                onClick={() => setOpenForm(true)}
                                className="w-full"
                            >
                                Откликнуться
                            </Button>
                        </div>
                    </div>
                    <div className="relative left-0 top-0 z-0 flex size-full flex-col gap-5 overflow-hidden  bg-gray-bg">
                        <div className="flex flex-1 overflow-y-auto">
                            <ScrollArea className="size-full">
                                <Form {...form}>
                                    <form
                                        className="flex w-full shrink-0 flex-col gap-[40px] p-6"
                                        onSubmit={onSubmit}
                                    >
                                        <div className="flex w-full flex-col gap-[20px] lg:gap-[30px]">
                                            <span className="text-sm text-gray max-lg:mb-2.5 lg:text-lg">
                                                Вакансия
                                            </span>
                                            <h3 className="text-[22px] font-bold max-lg:w-[180px] lg:text-[30px]">
                                                Откликнуться на вакансию
                                            </h3>
                                            <p className="text-[18px] font-normal leading-tight lg:text-[26px] lg:font-medium">
                                                Напишите нам и мы обязательно
                                                рассмотрим ваше резюме
                                            </p>
                                        </div>

                                        <div className="flex flex-col gap-[30px]">
                                            <Form.Field
                                                control={form.control}
                                                name="full_name"
                                                render={({ field }) => (
                                                    <Form.Item>
                                                        <Form.Control>
                                                            <Input
                                                                placeholder="ФИО*"
                                                                className="bg-transparent text-[18px]"
                                                                {...field}
                                                            />
                                                        </Form.Control>
                                                        <Form.Message />
                                                    </Form.Item>
                                                )}
                                            />
                                            <Form.Field
                                                control={form.control}
                                                name="phone"
                                                render={({ field }) => (
                                                    <Form.Item>
                                                        <Form.Control>
                                                            <PhoneInput
                                                                placeholder="Телефон*"
                                                                className="bg-transparent  text-[18px]"
                                                                {...field}
                                                            />
                                                        </Form.Control>
                                                        <Form.Message />
                                                    </Form.Item>
                                                )}
                                            />
                                            <Form.Field
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <Form.Item>
                                                        <Form.Control>
                                                            <Input
                                                                placeholder="E-mail*"
                                                                className="bg-transparent  text-[18px]"
                                                                {...field}
                                                            />
                                                        </Form.Control>
                                                        <Form.Message />
                                                    </Form.Item>
                                                )}
                                            />
                                            <Form.Field
                                                control={form.control}
                                                name="specialty"
                                                render={({ field }) => (
                                                    <Form.Item>
                                                        <Form.Control>
                                                            <Input
                                                                placeholder="Ваша специальность"
                                                                className="bg-transparent text-[18px]"
                                                                {...field}
                                                            />
                                                        </Form.Control>
                                                        <Form.Message />
                                                    </Form.Item>
                                                )}
                                            />
                                            <div className="flex flex-col gap-5">
                                                <Form.Field
                                                    control={form.control}
                                                    name="resume"
                                                    render={({ field }) => (
                                                        <Form.Item>
                                                            <Form.Control>
                                                                <FileInput
                                                                    placeholder="Прикрепить резюме* (.pdf)"
                                                                    className="bg-transparent text-[18px]"
                                                                    file={
                                                                        field.value
                                                                    }
                                                                    setFile={
                                                                        field.onChange
                                                                    }
                                                                />
                                                            </Form.Control>
                                                            <Form.Message />
                                                        </Form.Item>
                                                    )}
                                                />
                                                <Form.Field
                                                    control={form.control}
                                                    name="cover_letter"
                                                    render={({ field }) => (
                                                        <Form.Item>
                                                            <Form.Control>
                                                                <FileInput
                                                                    placeholder="Прикрепить сопроводительное письмо (.pdf)"
                                                                    file={
                                                                        field.value
                                                                    }
                                                                    setFile={
                                                                        field.onChange
                                                                    }
                                                                />
                                                            </Form.Control>
                                                            <Form.Message />
                                                        </Form.Item>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex w-full flex-col gap-[20px]">
                                            <Button
                                                variant="default"
                                                type="submit"
                                                className="h-16 text-[16px]"
                                                disabled={formHasErrors}
                                            >
                                                {loading ? (
                                                    <Loader2 className="size-5 animate-spin" />
                                                ) : (
                                                    "Отправить"
                                                )}
                                            </Button>
                                            {responseError ? (
                                                <span className="text-center text-[14px] text-destructive">
                                                    Произошла ошибка при
                                                    отправке запроса! Повторите
                                                    попытку!
                                                </span>
                                            ) : null}
                                            <span className="text-left text-[14px] text-gray-dark md:text-left">
                                                Нажимая на кнопку, вы даете
                                                согласие на{" "}
                                                <Link
                                                    href={
                                                        "/files/personal-data.pdf"
                                                    }
                                                    className="text-black underline hover:text-primary"
                                                >
                                                    {" "}
                                                    Обработку персональных
                                                    данных
                                                </Link>{" "}
                                                и соглашаетесь с{" "}
                                                <Link
                                                    href={
                                                        "/files/privacy-policy.pdf"
                                                    }
                                                    className="text-black underline hover:text-primary"
                                                >
                                                    Политикой конфиденциальности
                                                </Link>
                                            </span>
                                        </div>
                                    </form>
                                </Form>
                            </ScrollArea>
                        </div>
                    </div>
                    <div
                        className={cn(
                            "absolute left-0 top-0 z-10 flex size-full flex-col gap-5 overflow-hidden bg-gray-bg transition duration-300",
                            !formSended && "-translate-x-full",
                        )}
                    >
                        <VacancySuccessDialog />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
