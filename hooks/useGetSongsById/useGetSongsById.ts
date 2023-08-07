import { Song } from "@/types";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useMemo, useState } from "react";

const useGetSongsById = (id?: string) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [song, setSong] = useState<Song | undefined>(undefined);
    const { supabaseClient } = useSessionContext();

    useEffect(() => {
        if (!id) {
            return;
        }
        setIsLoading(true);

        const fetchSongs = async () => {
            const { data, error } = await supabaseClient
                .from("songs")
                .select("*")
                .eq("id", id)
                .single();
            if (error) {
                setIsLoading(false);
                return toast.error(error.message);
            }

            setSong(data as Song);
            setIsLoading(false);
        };

        fetchSongs();
    }, [id, supabaseClient]);

    return useMemo(
        () => ({
            isLoading,
            song,
        }),
        [song, isLoading]
    );
};

export default useGetSongsById;
