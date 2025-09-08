import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import localFont from "next/font/local";

export const myriadPro = localFont({
    src: "../../public/fonts/MyriadPro-Regular.otf", // Path relative to the file importing it
    display: "swap", // Or 'optional', 'block', 'fallback'
});

export const metadata: Metadata = {
    title: "Glenn's P&B",
    description:
        "High Quality, Affordable and Innovative Nutraceutical Solutions",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${myriadPro.className} antialiased tracking-wider`}
            >
                {children}
                <Toaster />
            </body>
        </html>
    );
}
