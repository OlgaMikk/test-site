import { useEffect, useMemo } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Spinner } from "@/components/modules/spinner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReservationData } from "@/types";
import { reservationSchema } from "@/types/schemas";
import { cn } from "@/utils/cn";

const schema = reservationSchema;

type ReservationFormType = z.infer<typeof schema>;

type FlatReservationFormProps = {
    onSubmit: (data: ReservationFormType) => void;
    defaultValues: ReservationData;
    isLoading: boolean;
};

export function FlatReservationForm({
    onSubmit,
    defaultValues,
    isLoading,
}: FlatReservationFormProps) {
    const initialValues = useMemo<ReservationFormType>(
        () => defaultValues,
        [defaultValues],
    );
    const form = useForm<ReservationFormType>({
        defaultValues: initialValues,
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const formHasErrors = Object.keys(form.formState.errors).length > 0;

    useEffect(() => {
        form.reset(initialValues);
    }, [initialValues, form]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn(
                    "space-y-4 lg:space-y-8",
                    isLoading && "pointer-events-none opacity-50",
                )}
            >
                <div className="space-y-1.5 lg:space-y-3.5">
                    <h3 className="w-3/4 text-lg font-medium uppercase lg:text-2xl">
                        Форма сбора заявок на&nbsp;бронирование
                    </h3>
                    <div className="text-sm lg:text-lg">
                        Оставьте контактные данные нашему менеджеру,
                        и&nbsp;он&nbsp;свяжется с&nbsp;Вами для&nbsp;уточнения
                        деталей - предоплата не&nbsp;требуется
                    </div>
                </div>

                <div className="space-y-4 lg:space-y-8">
                    <Form.Field
                        control={form.control}
                        name="full_name"
                        render={({ field }) => (
                            <Form.Item>
                                <Form.Control>
                                    <Input placeholder="ФИО*" {...field} />
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
                                    <Input
                                        placeholder="Телефон*"
                                        {...field}
                                        autoComplete="phone"
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
                                        {...field}
                                        autoComplete="email"
                                    />
                                </Form.Control>

                                <Form.Message />
                            </Form.Item>
                        )}
                    />
                </div>

                <div className="space-y-3 lg:space-y-5">
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={formHasErrors || isLoading}
                    >
                        {isLoading ? <Spinner /> : "Подтвердить бронь"}
                    </Button>
                    <div className="text-gray max-md:leading-3 max-md:[&>*]:text-xs max-md:[&>*]:lg:text-base">
                        <span>
                            Нажимая на&nbsp;кнопку, вы&nbsp;даете согласие на{" "}
                        </span>
                        <Link
                            href={"/files/personal-data.pdf"}
                            className="text-primary"
                        >
                            обработку&nbsp;персональных&nbsp;данных
                        </Link>{" "}
                        <span> и соглашаетесь с </span>
                        <Link
                            href={"/files/privacy-policy.pdf"}
                            className="text-primary"
                        >
                            политикой&nbsp;конфиденциальности
                        </Link>
                    </div>
                </div>
            </form>
        </Form>
    );
}
