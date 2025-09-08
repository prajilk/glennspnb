import { HomePageDocument } from "@/models/types/home-page";
import Image from "next/image";
import Link from "next/link";
import Instagram from "../icons/instagram";
import X from "../icons/x";
import Facebook from "../icons/facebook";
import SubscribeForm from "../forms/subscribe-form";

type FooterProps = Pick<
    HomePageDocument["footer"],
    "logo" | "address" | "backgroundImage" | "email" | "getInTouchSection"
>;

const Footer = ({
    logo,
    address,
    backgroundImage,
    email,
    getInTouchSection,
}: FooterProps) => {
    return (
        <footer
            id="contact-us"
            className="max-w-7xl mx-auto px-5 py-14 md:px-10 md:py-20 grid grid-cols-3 gap-2 text-white bg-gray-500 relative after:absolute after:inset-0 after:bg-[#343434]/50"
            style={{
                backgroundImage: `url(${backgroundImage.url})`,
                backgroundSize: "cover",
                backgroundPosition: "0% 40%",
            }}
        >
            <div className="flex flex-col justify-between gap-10 md:gap-0 col-span-2 md:col-span-1 z-10 flex-1">
                <Image
                    // src={"/local/Logo-white.webp"}
                    src={logo.url}
                    alt="Logo"
                    width={150}
                    height={150}
                />
                <div className="text-[#fbfbfb]">
                    <p className="max-w-[12rem] mb-3">{address}</p>
                    <span>Email: {email}</span>
                </div>
            </div>
            <div className="pl-5 z-10">
                <span className="text-lg font-bold block mb-3">Links</span>
                <ul className="space-y-3 text-[#fbfbfb]">
                    <li>
                        <Link href={"#"}>Home</Link>
                    </li>
                    <li>
                        <Link href={"#products"}>Products</Link>
                    </li>
                    <li>
                        <Link href={"#about-us"}>About</Link>
                    </li>
                </ul>
            </div>
            <div className="space-y-3 col-span-3 md:col-span-1 mt-10 md:mt-0 z-10">
                <h6 className="text-2xl font-bold">
                    {getInTouchSection.title}
                </h6>
                <p className="text-sm">{getInTouchSection.description}</p>
                <SubscribeForm />
                <div className="pt-5 space-y-3">
                    <ul className="flex gap-3">
                        {getInTouchSection.twitterUrl && (
                            <li>
                                <Link
                                    href={getInTouchSection.twitterUrl}
                                    target="_blank"
                                >
                                    <X />
                                </Link>
                            </li>
                        )}
                        {getInTouchSection.facebookUrl && (
                            <li>
                                <Link
                                    href={getInTouchSection.facebookUrl}
                                    target="_blank"
                                >
                                    <Facebook />
                                </Link>
                            </li>
                        )}
                        {getInTouchSection.instagramUrl && (
                            <li>
                                <Link
                                    href={getInTouchSection.instagramUrl}
                                    target="_blank"
                                >
                                    <Instagram />
                                </Link>
                            </li>
                        )}
                    </ul>
                    <span>
                        follow us: {getInTouchSection.followUs || "@Glenn'sp&b"}
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
