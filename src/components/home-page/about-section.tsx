import { HomePageDocument } from "@/models/types/home-page";

type AboutSectionProps = Pick<
    HomePageDocument["aboutSection"],
    | "title"
    | "description"
    | "subHeading"
    | "backgroundImage"
    | "sectionTitle"
    | "sectionDescription"
>;

const AboutSection = ({
    title,
    description,
    subHeading,
    backgroundImage,
    sectionTitle,
    sectionDescription,
}: AboutSectionProps) => {
    if (
        !title ||
        !description ||
        !subHeading ||
        !backgroundImage ||
        !sectionTitle ||
        !sectionDescription
    )
        return null;
    return (
        <section
            id="about-us"
            className="max-w-7xl mx-auto px-5 py-14 md:px-10 md:py-20 items-center text-center space-y-3"
        >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black">
                {title}
            </h1>
            <p className="max-w-5xl mx-auto text-sm md:text-lg">
                {description}
            </p>
            <h2 className="md:text-xl lg:text-2xl font-black text-[#939393]">
                {subHeading}
            </h2>

            <div
                className="grid md:grid-cols-2 min-h-[30rem] md:min-h-[35rem] mt-16"
                style={{
                    backgroundImage: `url(${backgroundImage.url})`,
                    backgroundPosition: "right",
                }}
            >
                <div className="hidden md:block"></div>
                <div className="bg-[#975355]/90 flex flex-col gap-3 items-start justify-center px-4">
                    <h3 className="text-4xl font-black text-white">
                        {sectionTitle}
                    </h3>
                    <p className="text-lg text-white text-left leading-tight max-w-md">
                        {sectionDescription}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
