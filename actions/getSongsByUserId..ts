import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/dist/client/components/headers";

const getSongsByUserId = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies,
    });

    const { data: seccionData, error: seccionError } =
        await supabase.auth.getSession();

    if (seccionError) {
        console.log(seccionError);
        return [];
    }

    const { data, error } = await supabase
        .from("songs")
        .select("*")
        .eq("user_id", seccionData.session?.user.id)
        .order("created_at", { ascending: false });

    if (error) {
        console.log(error.message);
    }

    return (data as any) || [];
};

export default getSongsByUserId;
