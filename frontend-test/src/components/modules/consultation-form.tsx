"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { z } from "zod";

import { useLocalStorage } from "@/hooks/browser/use-local-storage";
import { postConsultation } from "@/queries/client";
import { consultationSchema } from "@/types/schemas";
import { cn } from "@/utils/cn";

import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { PhoneInput } from "../ui/phone-input";

const schema = consultationSchema;

type Consultation = z.infer<typeof schema>;

export function ConsultationForm() {
    const [, setConsultation] = useLocalStorage("consultation", "");

    const form = useForm<Consultation>({
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
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [formSended]);

    const onSubmit = form.handleSubmit((data: Consultation) => {
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
        <div className="container flex w-full flex-col gap-8 pt-14 max-md:px-2 md:pt-20">
            <SuccessDialog
                open={formSended}
                onClose={() => setFormSended(false)}
            />
            <div className="relative flex h-fit w-full flex-row items-center justify-center overflow-hidden rounded-lg px-[20px] pb-[30px] pt-[190px] max-md:bg-gray-bg md:px-[50px] md:py-[40px] lg:bg-white xl:mx-[-50px] xl:w-[calc(100%+100px)]">
                <div className="flex size-full flex-col md:flex-row">
                    <div className="flex w-full shrink-0 flex-col items-center md:w-1/2">
                        <h3 className="mb-[20px] mt-1.5 w-full font-mono text-[24px] font-bold uppercase leading-none md:mx-10 md:ml-0 lg:text-[30px]">
                            Нужна консультация?
                        </h3>
                    </div>
                    <Form {...form}>
                        <form
                            className="flex w-full shrink-0 flex-col gap-[40px] md:w-1/2"
                            onSubmit={onSubmit}
                        >
                            <p className="text-[18px] font-normal leading-tight lg:text-[26px] lg:font-medium">
                                Оставьте заявку, и наш специалист перезвонит Вам
                                в ближайшее время
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
                                        href={"/files/personal-data.pdf"}
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
                <div
                    className={cn(
                        "absolute flex shrink-0 items-center justify-center overflow-hidden md:rounded-tr-[50px]",
                        "max-md:left-0 max-md:top-0",
                        "md:bottom-0 md:left-0 md:h-[420px] md:w-[44%]",
                        "max-lg:h-[160px] max-lg:w-full",
                        "lg:h-[450px]",
                        "xl:h-[450px]",
                    )}
                >
                    <Image
                        src="/images/misc/building.png"
                        width={800}
                        height={800}
                        alt=""
                        className="size-full object-cover object-center  md:object-right"
                    />
                </div>
            </div>
        </div>
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
                    Ваша заявка принята, спасибо!
                </div>

                <div className="text-center xl:px-10">
                    Мы уже начали ее&nbsp;обрабатывать. Пожалуйста, ожидайте
                    звонка, мы&nbsp;свяжемся с&nbsp;Вами в&nbsp;течении дня
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
