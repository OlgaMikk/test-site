import { useEffect, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import useSWRMutation from "swr/mutation";

import { Dialog } from "@/components/ui/dialog";
import { postConfirm, postReservation } from "@/queries/client";
import { FlatType, ReservationData } from "@/types";
import { cn } from "@/utils/cn";
import { parseBackendErrors } from "@/utils/parse-backend-errors";

import { CodeVerificationForm } from "./code-verification";
import { FlatDetails } from "./details";
import { FlatReservationForm } from "./form";
import { SuccessReserved } from "./success-reserved";

interface FlatInfoDialogProps {
    open: boolean;
    onClose: () => void;
    flatInfo?: FlatType;
    projectId: number;
    projectSlug?: string;
}

export type DialogState = {
    flat: string;
    page: string;
    view: "detail" | "form";
};

export function FlatInfoDialog({
    open,
    onClose,
    flatInfo,
    projectId,
}: FlatInfoDialogProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [codeSend, setCodeSend] = useState(false);
    const [codeVerified, setCodeVerified] = useState(false);
    const [userData, setUserData] = useState<ReservationData>({
        full_name: "",
        code: "",
        email: "",
        phone: "",
        room: flatInfo?.id ? String(flatInfo.id) : "?",
        project: projectId,
    });

    const [resendCountdown, setResendCountdown] = useState(0);

    useEffect(() => {
        if (resendCountdown) {
            const resendInterval = setInterval(() => {
                setResendCountdown((prev) => prev - 1);
            }, 1000);

            return () => {
                clearInterval(resendInterval);
            };
        }
    }, [resendCountdown]);

    const {
        flat: parsedFlat,
        page: parsedPage,
        view: parsedView,
    } = queryString.parse(searchParams.toString()) as unknown as DialogState;

    const { trigger: sendCode, isMutating: sendCodeLoading } = useSWRMutation(
        "/api/callback/confirm/",
        postConfirm,
    );

    const {
        trigger: verifyCode,
        isMutating: verifyCodeLoading,
        error: verifyCodeError,
    } = useSWRMutation("/api/callback/reservation/", postReservation);

    const handleClose = () => {
        onClose();
    };

    useEffect(() => {
        if (!open) {
            setCodeSend(false);
            setCodeVerified(false);
        }
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <Dialog.Content
                closeButtonOutside={parsedView === "detail"}
                className={cn(
                    "px-3 py-5 lg:px-6 lg:py-7",
                    parsedView === "detail" && "lg:min-w-[935px]",
                )}
            >
                {parsedView === "detail" ? (
                    <FlatDetails
                        flatInfo={flatInfo}
                        onReserve={() => {
                            router.push(
                                pathname +
                                    "?" +
                                    queryString.stringify({
                                        view: "form",
                                        page: parsedPage,
                                        flat: parsedFlat,
                                    }),
                                {
                                    scroll: false,
                                },
                            );
                        }}
                    />
                ) : undefined}

                {parsedView === "form" && !codeSend ? (
                    <FlatReservationForm
                        defaultValues={userData}
                        isLoading={sendCodeLoading}
                        onSubmit={(data) => {
                            sendCode({
                                email: data.email,
                                project: data.project,
                            }).then(() => {
                                setUserData(data);
                                setCodeSend(true);
                                setResendCountdown(30);
                            });
                        }}
                    />
                ) : undefined}

                {parsedView === "form" && codeSend && !codeVerified ? (
                    <CodeVerificationForm
                        error={parseBackendErrors(verifyCodeError)}
                        resendCode={() => {
                            if (userData) {
                                sendCode({
                                    email: userData.email,
                                    project: userData.project,
                                }).then(() => {
                                    setResendCountdown(30);
                                });
                            }
                        }}
                        resetCountdown={resendCountdown}
                        isLoading={verifyCodeLoading}
                        verifyCode={(code) => {
                            verifyCode({
                                ...userData,
                                code: code,
                                room: flatInfo?.flat
                                    ? String(flatInfo.id)
                                    : "1",
                            }).then(() => {
                                setCodeVerified(true);
                            });
                        }}
                    />
                ) : undefined}

                {parsedView === "form" && codeSend && codeVerified ? (
                    <SuccessReserved onClose={handleClose} />
                ) : undefined}
            </Dialog.Content>
        </Dialog>
    );
}
