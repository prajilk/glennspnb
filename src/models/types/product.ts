export type ProductDocument = {
    _id: string;
    productName: string;
    productTitle: string;
    description: string;
    keyBenefits: string[];
    image: {
        url: string;
        publicId: string;
    };
};
