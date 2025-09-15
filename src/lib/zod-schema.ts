import { z } from "zod";

export const ZodAuthSchema = z.object({
    email: z.email({ message: "Invalid email" }),
    password: z.string().min(8, "Password must be 8 or more characters long"),
});

export const ZodHomePageSchema = z.object({
    header: z.object({
        logo: z.url({ message: "Invalid logo url" }),
        headerMenu: z.array(
            z.object({
                name: z.string(),
                url: z.string(),
            })
        ),
    }),
    heroSection: z.object({
        title: z
            .string()
            .min(5, "Title must be 5 or more characters long")
            .max(255, "Title must be 255 or less characters long"),
        description: z.string({ message: "Description is required" }),
        backgroundImage: z.url({ message: "Invalid background image url" }),
        ctaButton: z.object(
            {
                text: z.string(),
                url: z.string(),
            },
            { message: "CTA button is required" }
        ),
    }),
    aboutSection: z.object({
        title: z
            .string()
            .min(5, "Title must be 5 or more characters long")
            .max(255, "Title must be 255 or less characters long"),
        description: z.string({ message: "Description is required" }),
        subHeading: z.string().optional(),
        backgroundImage: z.url({ message: "Invalid background image url" }),
        sectionTitle: z
            .string()
            .min(5, "Section title must be 5 or more characters long")
            .max(255, "Section title must be 255 or less characters long"),
        sectionDescription: z.string({
            message: "Section description is required",
        }),
    }),
    productsSection: z.object({
        title: z
            .string()
            .min(5, "Title must be 5 or more characters long")
            .max(255, "Title must be 255 or less characters long"),
        description: z.string({ message: "Description is required" }),
        featuredProduct: z.object({
            productImage: z.url({ message: "Invalid product image url" }),
            productTitle: z
                .string()
                .min(5, "Product title must be 5 or more characters long")
                .max(255, "Product title must be 255 or less characters long"),
            productName: z
                .string()
                .min(5, "Title must be 5 or more characters long")
                .max(100, "Title must be 100 or less characters long"),
            productDescription: z.string({
                message: "Product description is required",
            }),
            keyBenefits: z.array(z.string()),
        }),
    }),
    footer: z.object({
        logo: z.url({ message: "Invalid logo url" }),
        address: z.string().min(5, "Address must be 5 or more characters long"),
        email: z.email({ message: "Invalid email" }),
        backgroundImage: z.url({ message: "Invalid background image url" }),
        getInTouchSection: z.object({
            title: z.string().optional(),
            description: z.string({ message: "Description is required" }),
            twitterUrl: z.url({ message: "Invalid twitter url" }).optional(),
            facebookUrl: z.url({ message: "Invalid facebook url" }).optional(),
            instagramUrl: z
                .url({ message: "Invalid instagram url" })
                .optional(),
            followUs: z.string().optional(),
        }),
    }),
});

export const ZodProductSchema = z.object({
    productName: z.string().min(3, "Product name must be 3 or more characters"),
    productTitle: z
        .string()
        .min(5, "Product title must be 5 or more characters"),
    description: z.string().min(5, "Description must be 5 or more characters"),
    keyBenefits: z.array(z.string()).min(1, "Key benefits must be at least 1"),
    image: z.url({ message: "Invalid image url" }),
});
