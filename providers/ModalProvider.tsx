"use client";

import { useEffect, useState } from "react";

import AuthModal from "@/components/AuthModal/AuthModal";
import UploadModal from "@/components/UploadModal/UploadModal";

export default function ModalProvider() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <AuthModal />
            <UploadModal />
        </>
    );
}
