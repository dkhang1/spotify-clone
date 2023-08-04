"use client";

import qs from "query-string";

import useDebounce from "@/hooks/useDebounce/useDebounce";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "../Input/Input";

type Props = {};

export default function SearchInput({}: Props) {
    const router = useRouter();
    const [value, setValue] = useState<string>("");
    const debouncedValue = useDebounce<string>(value, 500);

    useEffect(() => {
        const query = {
            title: debouncedValue,
        };

        const url = qs.stringifyUrl({
            url: "/search",
            query: query,
        });

        router.push(url);
    }, [router, debouncedValue]);

    return (
        <Input
            placeholder="Find your song"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}
