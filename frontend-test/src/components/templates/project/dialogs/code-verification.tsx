import { useState } from "react";

import { Spinner } from "@/components/modules/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";

export function CodeVerificationForm({
    resendCode,
    verifyCode,
    resetCountdown,
    isLoading,
    error,
}: {
    resendCode: () => void;
    verifyCode: (code: string) => void;
    resetCountdown: number;
    isLoading: boolean;
    error: string;
}) {
    const [code, setCode] = useState("");

    return (
        <div className={cn(isLoading && "pointer-events-none opacity-50")}>
            <div className="mb-6 space-y-3.5 lg:mb-12">
                <h3 className="max-w-80 text-lg font-medium uppercase lg:text-2xl">
                    Подтвердите email
                </h3>
                <div className="max-w-64 text-sm lg:text-lg">
                    Введите&nbsp;код, отправленный вам на&nbsp;электронную почту
                </div>
            </div>

            <div className="mb-4 flex flex-col gap-y-2 lg:mb-8">
                <Input
                    placeholder="0000"
                    value={code}
                    onChange={(e) => {
                        setCode(e.target.value);
                    }}
                    max={10}
                    maxLength={10}
                />

                <p className="h-6 text-sm font-medium text-destructive">
                    {error}
                </p>
            </div>

            <Button
                onClick={() => {
                    verifyCode(code);
                }}
                className="mb-2 w-full lg:mb-8"
            >
                {isLoading ? <Spinner /> : "Подтвердить"}
            </Button>

            <div className="flex items-center justify-center">
                <div className="text-sm lg:text-lg">Не получили код?</div>
                <Button
                    onClick={() => {
                        resendCode();
                    }}
                    disabled={!!resetCountdown}
                    variant="ghost"
                    className="text-sm lg:text-lg"
                >
                    Выслать повторно{" "}
                    {resetCountdown ? `${resetCountdown}с` : undefined}
                </Button>
            </div>
        </div>
    );
}
