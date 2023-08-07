import { Song } from "@/types";
import useAuthModal from "../useAuthModal/useAuthModal";
import usePlayer from "../usePlayer/usePlayer";
import { useUser } from "../useUser/useUser";

const useOnPlay = (songs: Song[]) => {
    const player = usePlayer();
    const authModel = useAuthModal();
    const { user } = useUser();

    const onPlay = (id: string) => {
        if (!user) {
            return authModel.onOpen();
        }
        player.setId(id);
        player.setIds(songs.map((song) => song.id));
    };

    return onPlay;
};

export default useOnPlay;
