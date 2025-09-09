import { error400, error500, success200 } from "@/lib/response";
import { AuthenticatedRequest } from "@/lib/types/auth-request";
import { processImages } from "./helper";
import { withDbConnectAndAuth } from "@/lib/with-db-connect-and-auth";
import { ZodHomePageSchema } from "@/lib/zod-schema";
import HomePage from "@/models/home-page";
import { revalidatePath } from "next/cache";

async function postHandler(req: AuthenticatedRequest) {
    try {
        const data = await req.json();
        const result = ZodHomePageSchema.safeParse(data);
        if (!result.success) {
            return error400("Invalid request body");
        }

        // usage
        const { images, error } = await processImages(
            {
                headerLogo: result.data.header.logo,
                heroBackgroundImage: result.data.heroSection.backgroundImage,
                aboutSectionBackgroundImage:
                    result.data.aboutSection.backgroundImage,
                productImage:
                    result.data.productsSection.featuredProduct.productImage,
                footerLogo: result.data.footer.logo,
                footerBackgroundImage: result.data.footer.backgroundImage,
            },
            "home-page"
        );

        if (error || images === null) {
            return error500({
                error,
            });
        }

        await HomePage.findOneAndUpdate(
            {},
            {
                header: {
                    logo: {
                        url: images.headerLogo?.url,
                        publicId: images.headerLogo?.publicId,
                    },
                    headerMenu: result.data.header.headerMenu,
                },
                heroSection: {
                    title: result.data.heroSection.title,
                    description: result.data.heroSection.description,
                    backgroundImage: {
                        url: images.heroBackgroundImage?.url,
                        publicId: images.heroBackgroundImage?.publicId,
                    },
                    ctaButton: {
                        text: result.data.heroSection.ctaButton.text,
                        url: result.data.heroSection.ctaButton.url,
                    },
                },
                aboutSection: {
                    title: result.data.aboutSection.title,
                    description: result.data.aboutSection.description,
                    subHeading: result.data.aboutSection.subHeading,
                    backgroundImage: {
                        url: images.aboutSectionBackgroundImage?.url,
                        publicId: images.aboutSectionBackgroundImage?.publicId,
                    },
                    sectionTitle: result.data.aboutSection.sectionTitle,
                    sectionDescription:
                        result.data.aboutSection.sectionDescription,
                },
                productsSection: {
                    title: result.data.productsSection.title,
                    description: result.data.productsSection.description,
                    featuredProduct: {
                        productImage: {
                            url: images.productImage?.url,
                            publicId: images.productImage?.publicId,
                        },
                        productTitle:
                            result.data.productsSection.featuredProduct
                                .productTitle,
                        productDescription:
                            result.data.productsSection.featuredProduct
                                .productDescription,
                        keyBenefits:
                            result.data.productsSection.featuredProduct
                                .keyBenefits,
                    },
                },
                footer: {
                    logo: {
                        url: images.footerLogo?.url,
                        publicId: images.footerLogo?.publicId,
                    },
                    address: result.data.footer.address,
                    email: result.data.footer.email,
                    backgroundImage: {
                        url: images.footerBackgroundImage?.url,
                        publicId: images.footerBackgroundImage?.publicId,
                    },
                    getInTouchSection: {
                        title: result.data.footer.getInTouchSection.title,
                        description:
                            result.data.footer.getInTouchSection.description,
                        twitterUrl:
                            result.data.footer.getInTouchSection.twitterUrl,
                        facebookUrl:
                            result.data.footer.getInTouchSection.facebookUrl,
                        instagramUrl:
                            result.data.footer.getInTouchSection.instagramUrl,
                        followUs: result.data.footer.getInTouchSection.followUs,
                    },
                },
            },
            { upsert: true }
        );

        revalidatePath("/");

        return success200({
            success: true,
            message: "Successful",
        });
    } catch (error) {
        return error500({
            message:
                error instanceof Error ? error.message : "Something went wrong",
        });
    }
}

export const POST = withDbConnectAndAuth(postHandler);
