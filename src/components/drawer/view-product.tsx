"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProductDocument } from "@/models/types/product";
import Image from "next/image";
import { type ReactNode, useState } from "react";

export function ViewProduct({
    children,
    product,
}: {
    children: ReactNode;
    product: ProductDocument;
}) {
    const [open, setOpen] = useState(false);
    const isMobile = useIsMobile();

    if (!isMobile) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>{children}</DialogTrigger>
                <DialogContent className="min-w-[80%]">
                    <DialogHeader>
                        <DialogTitle className="sr-only">
                            {product.productName}
                        </DialogTitle>
                        <DialogDescription className="sr-only">
                            {product.productTitle}
                        </DialogDescription>
                    </DialogHeader>
                    <Content product={product} />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger>{children}</DrawerTrigger>
            <DrawerContent className="min-h-[90%]">
                <DrawerHeader className="text-left">
                    <DrawerTitle className="sr-only">
                        {product.productName}
                    </DrawerTitle>
                    <DrawerDescription className="sr-only">
                        {product.productTitle}
                    </DrawerDescription>
                </DrawerHeader>
                <div className="px-3 overflow-y-scroll">
                    <Content product={product} />
                </div>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

function Content({ product }: { product: ProductDocument }) {
    return (
        <div className="grid md:grid-cols-2 gap-5">
            <div className="w-full lg:w-11/12 aspect-square relative rounded-4xl overflow-hidden">
                <Image
                    src={product.image.url}
                    alt={product.productTitle}
                    fill
                />
            </div>
            <div className="space-y-4 pt-5">
                <h2 className="text-2xl lg:text-3xl font-black max-w-sm">
                    {product.productTitle}
                </h2>
                <div className="text-sm">
                    <span className="font-bold">Description: </span>
                    <p className="mt-1 md:mt-0 lg:mt-1 max-w-xl">
                        {product.description}
                    </p>
                </div>
                <ul className="list-disc text-sm">
                    <span className="font-bold block mb-1 md:mb-0 lg:mb-1">
                        Key Benefits:{" "}
                    </span>
                    {product.keyBenefits.map((benefit) => (
                        <li key={benefit} className="ml-4">
                            {benefit}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
