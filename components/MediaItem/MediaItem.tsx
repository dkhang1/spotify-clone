"use client";
import { Song } from "@/types";
import Image from "next/image";

import useLoadingImage from "@/hooks/useLoadImage/useLoadImage";

type MediaItemProps = {
    data: Song;
    onClick?: (id: string) => void;
};

export default function MediaItem({ data, onClick }: MediaItemProps) {
    const imageUrl = useLoadingImage(data);

    const handleClick = () => {
        if (onClick) {
            return onClick(data.id);
        }
    };
    return (
        <div
            onClick={handleClick}
            className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
        >
            <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
                <Image
                    fill
                    src={imageUrl || "/images/liked.png"}
                    alt="song image"
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="truncate text-white">{data.title}</p>
                <p className="truncate text-neutral-400 text-sm">
                    {data.author}
                </p>
            </div>
        </div>
    );
}
