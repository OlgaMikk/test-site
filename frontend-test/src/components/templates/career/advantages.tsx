"use client";

import Image from "next/image";

const advantages = [
    {
        title: "Командная работа",
        description:
            "Работаем в атмосфере взаимного уважения, ценим каждого члена команды",
        order: "1",
    },
    {
        title: "Ориентация на результат",
        description:
            "Мы не боимся ставить перед собой амбициозные цели и идти к ним",
        order: "2",
    },
    {
        title: "Честность и порядочность",
        description:
            "Говорим правду, честно признаем свои ошибки и исправляем их",
        order: "3",
    },
    {
        title: "Непрерывное развитие",
        description:
            "Постоянно совершенствуем наши процессы и наш продукт, гибко реагируем на изменения",
        order: "4",
    },
];
interface CareerAdvantageProps {
    title: string;
    description: string;
    order: string;
}
export function CareerAdvantage({
    title,
    description,
    order,
}: CareerAdvantageProps) {
    return (
        <div className="relative flex w-full flex-col gap-2.5 overflow-hidden rounded bg-gray-bg px-4 pb-16 pt-6 lg:px-6 lg:py-8">
            <h3 className="z-20 text-xl font-medium">{title}</h3>
            <p className="z-20 max-w-[280px] text-base">{description}</p>
            <span className="absolute bottom-[20px] right-5 z-0 text-[100px] font-medium text-white md:bottom-[25px]  md:text-[115px]">
                {order}
            </span>
        </div>
    );
}
export function CareerAdvantagesTemplate() {
    return (
        <section className="py-[50px] lg:py-[60px]">
            <div className="container">
                <div className="flex w-full flex-col gap-10">
                    <div className="flex w-full flex-col gap-[20px] lg:flex-row lg:gap-[30px]">
                        <h1 className="flex w-full text-[26px] font-bold leading-tight lg:max-w-[300px] lg:text-[28px]">
                            Корпоративная культура
                        </h1>
                        <p className="flex max-w-[580px] flex-1 text-base lg:max-w-[730px] lg:text-xl">
                            Для нас важны увлеченность процессом, рост через
                            решение сложных задач и удовольствие от результата.
                            Мы любим конкурентную среду и соревнование за каждую
                            победу — это то, что придает нашей работе динамику и
                            закономерно приводит к увеличению масштабов,
                            расширению горизонтов и росту амбиций. Нам нравится
                            сложность девелопмента, позволяющая соприкасаться с
                            разными сферами, использовать множество инструментов
                            и создавать целостные продукты.
                        </p>
                    </div>
                    <div className="flex w-full flex-col-reverse gap-[20px] lg:flex-row lg:gap-[30px]">
                        <div className="flex h-auto w-full overflow-hidden rounded max-lg:max-h-[250px] lg:max-w-[300px]">
                            <Image
                                src={"/images/career/team.png"}
                                alt=""
                                width={300}
                                height={400}
                                className="h-auto w-full object-cover object-center"
                            />
                        </div>
                        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
                            {advantages.map((advantage) => (
                                <CareerAdvantage
                                    key={advantage.order}
                                    {...advantage}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
