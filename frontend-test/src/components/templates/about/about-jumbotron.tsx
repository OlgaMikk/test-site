import Image from "next/image";

export function AboutJumbotron() {
    return (
        <section className="overflow-hidden pb-[50px] lg:pb-0">
            <div className="container">
                <div className="relative flex shrink-0 flex-col lg:mx-[-50px] lg:h-[500px] lg:w-[calc(100%+100px)] lg:flex-row">
                    <div className="my-[65px] flex w-full flex-col px-[50px] max-lg:pl-0 lg:my-auto lg:w-1/2">
                        <h1 className="mb-2.5 font-sans text-[50px] font-bold uppercase leading-none text-primary lg:text-[70px]">
                            lennar group
                        </h1>
                        <p className="text-lg leading-normal">
                            — это обособленный инвестиционно‐строительный
                            холдинг созданный в 2022 г. для целей строительства
                            качественного, современного жилья, объектов
                            социальной инфраструктуры и бизнес пространств на
                            территории г. Москвы, г. Санкт-Петербург и ДВФО
                        </p>
                    </div>
                    <div className="right-0 top-0 flex size-full w-[calc(100%+32px)] shrink-0 bg-gray-bg max-lg:mx-[-16px] max-lg:h-[300px] lg:absolute lg:w-1/2">
                        <Image
                            src="/images/about/about-building.png"
                            width={500}
                            height={500}
                            alt=""
                            className="flex size-full shrink-0 object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
