"use client";

import { MyUserContextProvider } from "../hooks/useUser/useUser";

type UserProviderProps = {
    children: React.ReactNode;
};

export default function UserProvider({ children }: UserProviderProps) {
    return <MyUserContextProvider>{children}</MyUserContextProvider>;
}
