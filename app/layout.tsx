import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import SideBar from "@/components/SideBar/SideBar";
import Player from "@/components/Player/Player";

import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";

import getSongsByUserId from "@/actions/getSongsByUserId.";
import Error from "./(site)/error";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Spotify",
    description: "Music Streamming App",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const userSongs = await getSongsByUserId();

    return (
        <html lang="en">
            <body className={font.className}>
                <ToasterProvider />
                <SupabaseProvider>
                    <UserProvider>
                        <ModalProvider />
                        <SideBar songs={userSongs}>{children}</SideBar>
                        <Player />
                    </UserProvider>
                </SupabaseProvider>
            </body>
        </html>
    );
}
