"use client";

import { Menu } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import Link from "next/link";
import type { HomePageDocument } from "@/models/types/home-page";
import { Button } from "../ui/button";
import { useState } from "react";

type HeaderProps = Pick<HomePageDocument["header"], "headerMenu">;

const Sidenav = ({ headerMenu }: HeaderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    if (!headerMenu || headerMenu.length === 0) return null;
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="md:hidden">
                <Menu />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="sr-only">Sidenav</SheetTitle>
                    <SheetDescription className="sr-only">
                        Sidenav
                    </SheetDescription>
                </SheetHeader>
                <ul className="px-5 space-y-5">
                    {headerMenu.slice(0, 3).map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.url}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Link
                            href={headerMenu.at(-1)?.url || "#contact"}
                            onClick={() => setIsOpen(false)}
                        >
                            <Button className="rounded-full uppercase tracking-wider px-6 pt-2.5 pb-2 h-fit">
                                {headerMenu.at(-1)?.name || "Contact Us"}
                            </Button>
                        </Link>
                    </li>
                </ul>
            </SheetContent>
        </Sheet>
    );
};

export default Sidenav;
