import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import SideBar from "@/components/SideBar/SideBar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId.";

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
                    </UserProvider>
                </SupabaseProvider>
            </body>
        </html>
    );
}
