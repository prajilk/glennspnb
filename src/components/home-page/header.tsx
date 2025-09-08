import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { HomePageDocument } from "@/models/types/home-page";
import Sidenav from "../sheet/sidenav";

type HeaderProps = Pick<HomePageDocument["header"], "logo" | "headerMenu">;

const Header = ({ logo, headerMenu }: HeaderProps) => {
    if (!logo || !headerMenu) return null;
    return (
        <header className="flex absolute w-full items-center justify-between max-w-7xl mx-auto px-5 py-3 md:px-10 md:py-6">
            <Image
                // src={"/local/Logo-with-black-text.webp"}
                src={logo.url}
                alt="Logo"
                width={120}
                height={120}
            />
            <ul className="items-center md:gap-10 lg:gap-16 uppercase hidden md:flex">
                {headerMenu.slice(0, 3).map((item) => (
                    <li key={item.name}>
                        <Link href={item.url}>{item.name}</Link>
                    </li>
                ))}
                <li>
                    <Link href={headerMenu.at(-1)?.url || "#contact"}>
                        <Button className="rounded-full uppercase tracking-wider px-6 pt-2.5 pb-2 h-fit">
                            {headerMenu.at(-1)?.name}
                        </Button>
                    </Link>
                </li>
            </ul>
            <Sidenav headerMenu={headerMenu} />
        </header>
    );
};

export default Header;
