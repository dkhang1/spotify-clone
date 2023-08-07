"use client";

import useGetSongsById from "@/hooks/useGetSongsById/useGetSongsById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer/usePlayer";
import PlayerContent from "../PlayerContent/PlayerContent";

const Player = () => {
    const player = usePlayer();
    const { song } = useGetSongsById(player.activeId);

    const songUrl = useLoadSongUrl(song!);

    if (!song || !songUrl || !player.activeId) {
        return null;
    }

    return (
        <div
            className="
        fixed 
        bottom-0 
        bg-black 
        w-full 
        py-2 
        h-[80px] 
        px-4
      "
        >
            <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
        </div>
    );
};

export default Player;
