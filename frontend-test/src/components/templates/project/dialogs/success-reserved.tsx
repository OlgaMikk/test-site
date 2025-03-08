import { Button } from "@/components/ui/button";

export function SuccessReserved({ onClose }: { onClose: () => void }) {
    return (
        <div className="flex flex-col gap-3 lg:gap-5">
            <h3 className="w-full text-center text-lg font-medium uppercase lg:text-2xl">
                Ваша заявка принята, <br />
                спасибо!
            </h3>
            <div className="mx-auto mb-2.5 max-w-96 text-center text-sm lg:mb-4 lg:text-lg">
                Мы уже начали ее обрабатывать. Пожалуйста, ожидайте звонка,
                мы&nbsp;свяжемся с Вами в ближайшее время
            </div>
            <Button onClick={onClose}>Буду ждать</Button>
        </div>
    );
}
