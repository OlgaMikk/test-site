import Image from "next/image";

export function LocationTimeAdvantage({
    icon,
    title,
    subTitle,
}: {
    icon: string;
    title: string;
    subTitle: string;
}) {
    return (
        <div className={"flex flex-col gap-1"}>
            <p className="text-lg font-semibold"> {title}</p>
            <div className="flex flex-row items-center gap-2.5">
                <Image
                    src={icon}
                    height={24}
                    width={24}
                    alt={title}
                    className={"size-6"}
                />
                <span className={"text-xl text-destructive"}>{subTitle}</span>
            </div>
        </div>
    );
}

export function LocationAdvantage({
    icon,
    title,
}: {
    icon: string;
    title: string;
}) {
    return (
        <div
            className={
                "flex w-full max-w-[160px] flex-col items-center justify-start gap-3 lg:max-w-[180px]"
            }
        >
            <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-primary">
                <Image
                    src={icon}
                    height={24}
                    width={24}
                    alt={title}
                    className={"size-6"}
                />
            </div>
            <span className={"text-wrap text-center text-base text-black"}>
                {title}
            </span>
        </div>
    );
}
