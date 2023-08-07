"use client";

import Box from "@/components/Box/Box";

export default function Error() {
    return (
        <Box className="h-full flex justify-center items-center flex-col">
            <div className=" text-2xl text-neutral-400">404</div>
            <div className="text-neutral-400">
                Oops something went wrong !!!
            </div>
        </Box>
    );
}
