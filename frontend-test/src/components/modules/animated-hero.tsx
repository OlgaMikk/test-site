"use client";

import { useRef } from "react";

import { useFollowPointer } from "@/hooks/browser/use-follow-pointer";

import { AnimateCube } from "./abstract-cube";

export function AnimatedHero() {
    const ref = useRef<HTMLDivElement | null>(null);

    const { x, y } = useFollowPointer(ref);

    return (
        <>
            <AnimateCube
                className="-bottom-10 -left-10 -z-10 lg:-left-20 lg:bottom-10"
                ref={ref}
                style={{
                    transform: `translate(${x / 80}px, ${
                        -y / 80
                    }px) scale(1.25)`,
                }}
            />
            <AnimateCube
                className="-right-10 top-0 -z-10"
                ref={ref}
                style={{
                    transform: `translate(${-x / 120}px, ${
                        y / 100
                    }px) scale(0.75)`,
                }}
            />
        </>
    );
}
