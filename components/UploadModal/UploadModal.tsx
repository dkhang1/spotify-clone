"use client";

import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import uniqid from "uniqid";

import { useUser } from "@/hooks/useUser/useUser";
import useUploadModal from "@/hooks/useUploadModal/useUploadModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import Button from "../Button/Button";

export default function UploadModal() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const uploadModal = useUploadModal();
    const supabaseClient = useSupabaseClient();
    const { user } = useUser();
    const { handleSubmit, reset, register } = useForm<FieldValues>({
        defaultValues: {
            author: "",
            title: "",
            song: null,
            image: null,
        },
    });

    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            uploadModal.onClose();
        }
    };

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);
            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            // validate field
            if (!imageFile && !songFile && !user) {
                toast.error("Missing fields");
                return;
            }

            const uniqueID = uniqid();
            // upload song to supabase bucket
            const { data: songData, error: songError } =
                await supabaseClient.storage
                    .from("songs")
                    .upload(`song-${values.title}-${uniqueID}`, songFile, {
                        cacheControl: "3600",
                        upsert: false,
                    });
            if (songError) {
                setIsLoading(false);
                return toast.error("Failed to upload song");
            }

            //upload image to supabase bucket
            const { data: imageData, error: imageError } =
                await supabaseClient.storage
                    .from("images")
                    .upload(`image-${values.title}-${uniqueID}`, imageFile, {
                        cacheControl: "3600",
                        upsert: false,
                    });
            if (imageError) {
                setIsLoading(false);
                return toast.error("Failed to upload image");
            }

            // create song
            const { error: supabaseError } = await supabaseClient
                .from("songs")
                .insert({
                    user_id: user?.id,
                    title: values.title,
                    author: values.author,
                    song_path: songData.path,
                    image_path: imageData.path,
                });
            if (supabaseError) {
                return toast.error(supabaseError.message);
            }

            // success
            router.refresh();
            setIsLoading(false);
            toast.success("Song created !");
            reset();
            uploadModal.onClose();
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            title="Add a song"
            description="Only MP3 file"
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-4"
            >
                <Input
                    id="title"
                    disabled={isLoading}
                    placeholder="Song title"
                    {...register("title", {
                        required: true,
                    })}
                />
                <Input
                    id="author"
                    disabled={isLoading}
                    placeholder="Author name"
                    {...register("author", {
                        required: true,
                    })}
                />
                <div>
                    <div className="pb-1">Select a song file</div>
                    <Input
                        id="song"
                        disabled={isLoading}
                        type="file"
                        placeholder="Song file"
                        accept=".mp3"
                        {...register("song", {
                            required: true,
                        })}
                    />
                </div>
                <div>
                    <div className="pb-1">Select an image</div>
                    <Input
                        id="image"
                        disabled={isLoading}
                        type="file"
                        placeholder="Image file"
                        accept="image/*"
                        {...register("image", {
                            required: true,
                        })}
                    />
                </div>
                <Button disabled={isLoading} type="submit">
                    Create
                </Button>
            </form>
        </Modal>
    );
}
