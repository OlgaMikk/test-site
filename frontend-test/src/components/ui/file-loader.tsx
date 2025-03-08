import { Dispatch, useId, useRef } from "react";

import { Paperclip, Plus } from "lucide-react";

import { cn } from "@/utils/cn";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    file: File | null;
    setFile: Dispatch<File | null>;
}
export const FileInput: React.FC<InputProps> = (props) => {
    const id = useId();

    const ref = useRef<HTMLInputElement | null>(null);

    const {
        placeholder = "Загрузка файла",
        accept = "application/pdf",
        disabled,
        file,
        setFile,
    } = props;

    return (
        <div
            className={cn(
                "flex w-full flex-col gap-5",
                disabled && "pointer-events-none opacity-60",
            )}
        >
            <div className="flex flex-row items-center gap-2.5">
                <label htmlFor={id}>
                    <div className="flex cursor-pointer flex-row items-center gap-2.5 transition hover:opacity-60">
                        <Paperclip
                            className={cn(
                                "flex size-5 shrink-0",
                                file ? "text-black" : "text-gray",
                            )}
                        />
                        <span
                            className={cn(
                                "text-[16px] lg:text-[18px]",
                                file ? "text-primary" : "text-gray",
                            )}
                        >
                            {file?.name ? file.name : placeholder}
                        </span>
                    </div>
                    <input
                        id={id}
                        type="file"
                        ref={ref}
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                                setFile(e.target?.files[0]);
                            }
                        }}
                        multiple={false}
                        accept={accept}
                        className="hidden"
                    />
                </label>
                {file ? (
                    <button
                        onClick={() => {
                            setFile(null);
                            if (ref.current) {
                                ref.current.value = "";
                            }
                        }}
                        className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary transition hover:opacity-60"
                    >
                        <Plus className="size-3 rotate-45 text-white" />
                    </button>
                ) : null}
            </div>
        </div>
    );
};
