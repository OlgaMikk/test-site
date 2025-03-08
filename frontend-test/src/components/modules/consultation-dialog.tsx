"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { z } from "zod";

import { useLocalStorage } from "@/hooks/browser/use-local-storage";
import { postConsultation } from "@/queries/client";
import { consultationSchema } from "@/types/schemas";

import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { PhoneInput } from "../ui/phone-input";

const schema = consultationSchema;

type ConsultationFormType = z.infer<typeof schema>;

interface ConsultationDialogProps {
    open: boolean;
    onClose: () => void;
}
export function ConsultationDialog({ open, onClose }: ConsultationDialogProps) {
    const [, setConsultation] = useLocalStorage("consultation", "");

    const form = useForm<ConsultationFormType>({
        defaultValues: {
            full_name: "",
            phone: "",
            email: "",
            city: "",
        },
        resolver: zodResolver(schema),
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
        if (formSended) {
            const timeout = setTimeout(() => {
                setFormSended(false);
                onClose();
            }, 3000);

            return () => clearTimeout(timeout);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formSended]);

    const onSubmit = form.handleSubmit((data: ConsultationFormType) => {
        setResponseError(false);
        setLoading(true);
        postConsultation("/api/callback/", data)
            .then(() => {
                setFormSended(true);
                setLoading(false);
                setConsultation("true");
            })
            .catch(() => {
                setResponseError(true);
                setLoading(false);
            });

        mutate("/api/callback/");
    });

    return (
        <Dialog
            key="success-consultation-dialog"
            open={open}
            onOpenChange={onClose}
        >
            <Dialog.Content className=" px-6 lg:px-8 lg:py-10">
                <div className="flex w-full max-w-[525px]">
                    <SuccessDialog
                        open={formSended}
                        onClose={() => setFormSended(false)}
                    />
                    <Form {...form}>
                        <form
                            className="flex w-full shrink-0 flex-col gap-[40px]"
                            onSubmit={onSubmit}
                        >
                            <p className="text-[20px] font-medium leading-tight lg:text-[24px] lg:font-bold">
                                Оставьте свой номер телефона, чтобы мы Вас
                                проконсультировали
                            </p>
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
                                    name="email"
                                    render={({ field }) => (
                                        <Form.Item>
                                            <Form.Control>
                                                <Input
                                                    placeholder="E-mail*"
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
                                    name="city"
                                    render={({ field }) => (
                                        <Form.Item>
                                            <Form.Control>
                                                <Input
                                                    placeholder="Город*"
                                                    className="bg-transparent text-[18px]"
                                                    {...field}
                                                />
                                            </Form.Control>
                                            <Form.Message />
                                        </Form.Item>
                                    )}
                                />
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
                                        Произошла ошибка при отправке запроса!
                                        Повторите попытку!
                                    </span>
                                ) : null}
                                <span className="text-left text-[14px] text-gray-dark md:text-left">
                                    Нажимая на кнопку, вы даете согласие на{" "}
                                    <Link
                                        href={"/public/files/personal-data.pdf"}
                                        className="text-black underline hover:text-primary"
                                    >
                                        {" "}
                                        Обработку персональных данных
                                    </Link>{" "}
                                    и соглашаетесь с{" "}
                                    <Link
                                        href={"/files/privacy-policy.pdf"}
                                        className="text-black underline hover:text-primary"
                                    >
                                        Политикой конфиденциальности
                                    </Link>
                                </span>
                            </div>
                        </form>
                    </Form>
                </div>
            </Dialog.Content>
        </Dialog>
    );
}

function SuccessDialog({
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
                    Спасибо за доверие!
                </div>

                <div className="text-center xl:px-10">
                    Мы свяжемся с Вами в ближайшее время
                </div>

                <Button
                    className="w-full text-[16px]"
                    size="xl"
                    onClick={onClose}
                >
                    Буду ждать
                </Button>
            </Dialog.Content>
        </Dialog>
    );
}
