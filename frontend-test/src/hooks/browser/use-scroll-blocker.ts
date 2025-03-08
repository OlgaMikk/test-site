import { useEffect } from 'react';

export const useScrollBlocker = (block: boolean) => {
    useEffect(() => {
        if (block) document.body.classList.add('overflow-hidden');
        else document.body.classList.remove('overflow-hidden');
    }, [block]);
};
