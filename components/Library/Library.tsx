"use client";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import { Song } from "@/types";
import MediaItem from "../MediaItem/MediaItem";

import useAuthModal from "@/hooks/useAuthModal/useAuthModal";
import { useUser } from "@/hooks/useUser/useUser";
import useUploadModal from "@/hooks/useUploadModal/useUploadModal";

type LibraryProps = {
    songs: Song[];
};

export default function Library({ songs }: LibraryProps) {
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const { user } = useUser();

    const onClick = () => {
        if (!user) {
            authModal.onOpen();
        } else {
            uploadModal.onOpen();
        }
    };
    return (
        <div className="flex flex-col ">
            <div className="flex items-center justify-between px-5 py-4">
                <div className="inline-flex items-center gap-x-2">
                    <TbPlaylist className="text-neutral-400" size={26} />
                    <p className="text-neutral-400 font-medium text-md">
                        Your library
                    </p>
                </div>
                <AiOutlinePlus
                    onClick={onClick}
                    size={20}
                    className="text-neutral-400 cursor-pointer hover:text-white"
                />
            </div>
            <div className=" flex flex-col gap-y-2 mt-4 px-3">
                {songs.map((data) => {
                    return (
                        <MediaItem
                            key={data.id}
                            data={data}
                            onClick={() => {}}
                        />
                    );
                })}
            </div>
        </div>
    );
}
