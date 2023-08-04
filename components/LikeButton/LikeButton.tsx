"use client";

import { useRouter } from "next/navigation";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-hot-toast";

import useAuthModal from "@/hooks/useAuthModal/useAuthModal";
import { useUser } from "@/hooks/useUser/useUser";

type LikeButtonProps = {
    songId: string;
};

export default function LikeButton({ songId }: LikeButtonProps) {
    const [isLiked, setIsLiked] = useState<boolean>(false);

    const router = useRouter();
    const { supabaseClient } = useSessionContext();

    const { user } = useUser();
    const authModal = useAuthModal();

    useEffect(() => {
        if (!user?.id) {
            return;
        }

        const fetchData = async () => {
            const { data, error } = await supabaseClient
                .from("liked_songs")
                .select("*")
                .eq("user_id", user.id)
                .eq("song_id", songId)
                .single();
            if (!error && data) {
                setIsLiked(true);
            }
        };

        fetchData();
    }, [user?.id, songId, supabaseClient]);

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    const handleLike = async () => {
        if (!user) {
            return authModal.onOpen();
        }
        if (isLiked) {
            const { error } = await supabaseClient
                .from("liked_songs")
                .delete()
                .eq("user_id", user.id)
                .eq("song_id", songId);
            if (error) {
                toast.error(error.message);
            } else {
                setIsLiked(false);
            }
        } else {
            const { error } = await supabaseClient.from("liked_songs").insert({
                song_id: songId,
                user_id: user.id,
            });
            if (error) {
                toast.error(error.message);
            } else {
                setIsLiked(true);
                toast.success("Liked!!!");
            }
        }
        router.refresh();
    };

    return (
        <button className="hover:opacity-75 transition" onClick={handleLike}>
            <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
        </button>
    );
}
