export type HomePageDocument = {
    _id: string;
    header: {
        logo: {
            url: string;
            publicId: string;
        };
        headerMenu: {
            name: string;
            url: string;
        }[];
    };
    heroSection: {
        title: string;
        description: string;
        backgroundImage: {
            url: string;
            publicId: string;
        };
        ctaButton: {
            text: string;
            url: string;
        };
    };
    aboutSection: {
        title: string;
        description: string;
        subHeading?: string;
        backgroundImage: {
            url: string;
            publicId: string;
        };
        sectionTitle: string;
        sectionDescription: string;
    };
    productsSection: {
        title: string;
        description?: string;
        featuredProduct: {
            productImage: {
                url: string;
                publicId: string;
            };
            productTitle: string;
            productDescription: string;
            keyBenefits: string[];
        };
    };
    footer: {
        logo: {
            url: string;
            publicId: string;
        };
        address: string;
        email: string;
        backgroundImage: {
            url: string;
            publicId: string;
        };
        getInTouchSection: {
            title: string;
            description: string;
            twitterUrl?: string;
            facebookUrl?: string;
            instagramUrl?: string;
            followUs?: string;
        };
    };
};
