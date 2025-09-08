import { HomePageDocument } from "@/models/types/home-page";
import { Button } from "../ui/button";
import Link from "next/link";

type HeroSectionProps = Pick<
    HomePageDocument["heroSection"],
    "title" | "description" | "backgroundImage" | "ctaButton"
>;

const HeroSection = ({
    title,
    description,
    backgroundImage,
    ctaButton,
}: HeroSectionProps) => {
    if (!title || !description || !backgroundImage || !ctaButton) return null;

    return (
        <section
            id="#"
            className="max-h-screen min-h-[40rem] max-w-7xl mx-auto px-5 py-3 md:px-10 md:py-6 grid md:grid-cols-2 items-center"
            style={{
                backgroundImage: `url(${backgroundImage.url})`,
                backgroundSize: "cover",
                backgroundPosition: "top",
            }}
        >
            <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black md:max-w-md">
                    {title}
                </h1>
                <p className="text-base lg:text-lg max-w-xs leading-tight">
                    {description}
                </p>
                <Link href={ctaButton.url}>
                    <Button className="rounded-full h-fit pb-2 pt-3 px-5 lg:text-lg font-bold">
                        {ctaButton.text}
                    </Button>
                </Link>
            </div>
        </section>
    );
};

export default HeroSection;
