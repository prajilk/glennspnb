import { Schema, model, models } from "mongoose";
import { ProductDocument } from "./types/product";

const ProductSchema = new Schema<ProductDocument>(
    {
        productName: {
            type: String,
            required: true,
        },
        productTitle: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        keyBenefits: {
            type: [String],
            required: true,
        },
        image: {
            url: {
                type: String,
                required: true,
            },
            publicId: {
                type: String,
            },
        },
    },
    { versionKey: false }
);

const Product =
    models?.Product || model<ProductDocument>("Product", ProductSchema);
export default Product;
