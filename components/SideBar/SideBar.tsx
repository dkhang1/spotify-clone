"use client";
import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { Song } from "@/types";

import Box from "../Box/Box";
import SideBarItem from "../SideBarItem/SideBarItem";
import Library from "../Library/Library";

type SideBarProps = {
    children: React.ReactNode;
    songs: Song[];
};

const SideBar = ({ children, songs }: SideBarProps) => {
    const pathName = usePathname();
    const routes = useMemo(
        () => [
            {
                icon: HiHome,
                label: "Home",
                active: pathName !== "/search",
                href: "/",
            },
            {
                icon: BiSearch,
                label: "Search",
                active: pathName === "/search",
                href: "/search",
            },
        ],
        [pathName]
    );

    return (
        <div className="flex h-screen">
            <div className="hidden md:flex flex-col gap-y-2 bg-black h-full p-2 w-[300px]">
                <Box>
                    <div className="flex flex-col gap-y-4 px-5 py-4">
                        {routes.map((route) => (
                            <SideBarItem
                                key={route.label}
                                {...route}
                            ></SideBarItem>
                        ))}
                    </div>
                </Box>
                <Box className="overflow-y-auto h-full">
                    <Library songs={songs} />
                </Box>
            </div>
            <main className="w-full h-full p-2">{children}</main>
        </div>
    );
};

export default SideBar;
