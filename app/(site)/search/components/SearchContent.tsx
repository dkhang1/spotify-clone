"use client";

import LikeButton from "@/components/LikeButton/LikeButton";
import MediaItem from "@/components/MediaItem/MediaItem";
import useOnPlay from "@/hooks/useOnPlay/useOnPlay";
import { Song } from "@/types";

type SearchContentProps = {
    songs: Song[];
};

export default function SearchContent({ songs }: SearchContentProps) {
    const onPlay = useOnPlay(songs);

    if (songs.length === 0) {
        return (
            <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
                No songs found.
            </div>
        );
    }
    return (
        <div className="flex flex-col gap-y-2 w-full px-6">
            {songs.map((data) => {
                return (
                    <div
                        key={data.id}
                        className="flex items-center gap-x-4 w-full"
                    >
                        <div className="flex-1">
                            <MediaItem
                                data={data}
                                onClick={(id: string) => onPlay(id)}
                            />
                        </div>
                        <LikeButton songId={data.id} />
                    </div>
                );
            })}
        </div>
    );
}
