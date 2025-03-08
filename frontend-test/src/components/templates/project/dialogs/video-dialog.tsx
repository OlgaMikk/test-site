import { Dialog } from "@/components/ui/dialog";

export function VideoDialog({
    open,
    onClose,
    video_url,
}: {
    open: boolean;
    onClose: () => void;
    video_url: string;
}) {
    return (
        <Dialog key="video-dialog" open={open} onOpenChange={onClose}>
            <Dialog.Content
                className="flex min-h-[80%] min-w-[80%] shrink-0 flex-col bg-black p-0"
                closeButtonOutside
            >
                <div className="flex size-full flex-1 overflow-hidden rounded">
                    <iframe
                        className="flex h-auto w-full"
                        src={video_url}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                </div>
            </Dialog.Content>
        </Dialog>
    );
}
