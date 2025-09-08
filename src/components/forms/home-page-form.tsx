"use client";

import { ZodHomePageSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";
import { Form } from "../ui/form";
import FooterBlock from "../home-page/blocks/footer";
import AboutBlock from "../home-page/blocks/about-block";
import ProductBlock from "../home-page/blocks/product-block";
import HeroBlock from "../home-page/blocks/hero-block";
import HeaderBlock from "../home-page/blocks/header-block";
import { toast } from "sonner";
import { useState } from "react";
import LoadingButton from "../ui/loading-button";
import { HomePageDocument } from "@/models/types/home-page";

const HomePageForm = ({
    currentValues,
}: {
    currentValues: HomePageDocument | null;
}) => {
    const [loading, setLoading] = useState(false);

    const defaultValues = currentValues
        ? {
              header: {
                  ...currentValues.header,
                  logo: currentValues.header.logo.url,
              },
              heroSection: {
                  ...currentValues.heroSection,
                  backgroundImage:
                      currentValues.heroSection.backgroundImage.url,
              },
              aboutSection: {
                  ...currentValues.aboutSection,
                  backgroundImage:
                      currentValues.aboutSection.backgroundImage.url,
              },
              productsSection: {
                  ...currentValues.productsSection,
                  featuredProduct: {
                      ...currentValues.productsSection.featuredProduct,
                      productImage:
                          currentValues.productsSection.featuredProduct
                              .productImage.url,
                  },
              },
              footer: {
                  ...currentValues.footer,
                  logo: currentValues.footer.logo.url,
                  backgroundImage: currentValues.footer.backgroundImage.url,
              },
          }
        : {
              header: {
                  logo: "",
                  headerMenu: [
                      {
                          name: "",
                          url: "",
                      },
                      {
                          name: "",
                          url: "",
                      },
                      {
                          name: "",
                          url: "",
                      },
                      {
                          name: "",
                          url: "",
                      },
                  ],
              },
              heroSection: {
                  title: "",
                  description: "",
                  backgroundImage: "",
                  ctaButton: { text: "", url: "" },
              },
              aboutSection: {
                  title: "",
                  description: "",
                  subHeading: "",
                  backgroundImage: "",
                  sectionTitle: "",
                  sectionDescription: "",
              },
              productsSection: {
                  title: "",
                  description: "",
                  featuredProduct: {
                      productImage: "",
                      productTitle: "",
                      productDescription: "",
                      keyBenefits: [],
                  },
              },
              footer: {
                  logo: "",
                  address: "",
                  email: "",
                  backgroundImage: "",
                  getInTouchSection: {
                      title: "",
                      description: "",
                      twitterUrl: "",
                      facebookUrl: "",
                      instagramUrl: "",
                      followUs: "",
                  },
              },
          };

    const form = useForm<z.infer<typeof ZodHomePageSchema>>({
        resolver: zodResolver(ZodHomePageSchema),
        defaultValues,
    });

    async function handleHomePageUpdate(
        values: z.infer<typeof ZodHomePageSchema>
    ) {
        try {
            setLoading(true);
            const response = await fetch("/api/home-page", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((res) => res.json());

            if (response.success) {
                toast.success("Home page updated successfully");
            }
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleHomePageUpdate)}
                className="bg-gray-100 border border-gray-200 p-6 rounded-md w-full space-y-10 @container"
                id="home-page-form"
            >
                <HeaderBlock form={form} />
                <HeroBlock form={form} />
                <AboutBlock form={form} />
                <ProductBlock form={form} />
                <FooterBlock form={form} />

                <LoadingButton
                    type="submit"
                    className="w-full"
                    isLoading={loading}
                    disabled={loading}
                >
                    Publish
                </LoadingButton>
            </form>
        </Form>
    );
};

export default HomePageForm;
