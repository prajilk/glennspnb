import { Schema, model, models } from "mongoose";
import { HomePageDocument } from "./types/home-page";

const HomePageSchema = new Schema<HomePageDocument>(
    {
        header: {
            logo: {
                url: {
                    type: String,
                    required: true,
                },
                publicId: {
                    type: String,
                },
            },
            headerMenu: [
                {
                    name: {
                        type: String,
                        required: true,
                    },
                    url: {
                        type: String,
                        required: true,
                    },
                },
            ],
        },
        heroSection: {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            backgroundImage: {
                url: {
                    type: String,
                    required: true,
                },
                publicId: {
                    type: String,
                },
            },
            ctaButton: {
                text: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
                },
            },
        },
        aboutSection: {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            subHeading: {
                type: String,
            },
            backgroundImage: {
                url: {
                    type: String,
                    required: true,
                },
                publicId: {
                    type: String,
                },
            },
            sectionTitle: {
                type: String,
                required: true,
            },
            sectionDescription: {
                type: String,
                required: true,
            },
        },
        productsSection: {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
            },
            featuredProduct: {
                productImage: {
                    url: {
                        type: String,
                        required: true,
                    },
                    publicId: {
                        type: String,
                    },
                },
                productTitle: {
                    type: String,
                    required: true,
                },
                productDescription: {
                    type: String,
                    required: true,
                },
                keyBenefits: [
                    {
                        type: String,
                        required: true,
                    },
                ],
            },
        },
        footer: {
            logo: {
                url: {
                    type: String,
                    required: true,
                },
                publicId: {
                    type: String,
                },
            },
            address: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
            backgroundImage: {
                url: {
                    type: String,
                    required: true,
                },
                publicId: {
                    type: String,
                },
            },
            getInTouchSection: {
                title: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                    required: true,
                },
                twitterUrl: {
                    type: String,
                },
                facebookUrl: {
                    type: String,
                },
                instagramUrl: {
                    type: String,
                },
                followUs: {
                    type: String,
                },
            },
        },
    },
    { versionKey: false }
);

const HomePage =
    models?.HomePage || model<HomePageDocument>("HomePage", HomePageSchema);
export default HomePage;
