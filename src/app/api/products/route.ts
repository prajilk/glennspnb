import { error400, error500, success200, success201 } from "@/lib/response";
import { AuthenticatedRequest } from "@/lib/types/auth-request";
import { processImages } from "../home-page/helper";
import { withDbConnectAndAuth } from "@/lib/with-db-connect-and-auth";
import { ZodProductSchema } from "@/lib/zod-schema";
import Product from "@/models/product";
import { revalidatePath } from "next/cache";

async function postHandler(req: AuthenticatedRequest) {
    try {
        const data = await req.json();
        const result = ZodProductSchema.safeParse(data);
        if (!result.success) {
            return error400("Invalid request body");
        }

        const { images, error } = await processImages(
            {
                image: result.data.image,
            },
            "products"
        );

        if (error || images === null) {
            return error500({
                error,
            });
        }

        await Product.create({
            productName: result.data.productName,
            productTitle: result.data.productTitle,
            description: result.data.description,
            keyBenefits: result.data.keyBenefits,
            image: {
                url: images.image?.url,
                publicId: images.image?.publicId,
            },
        });

        return success201({
            success: true,
            message: "Successful",
        });
    } catch (error) {
        console.log(error);
        return error500({
            message:
                error instanceof Error ? error.message : "Something went wrong",
        });
    }
}

async function putHandler(req: AuthenticatedRequest) {
    try {
        const data = await req.json();
        const result = ZodProductSchema.safeParse(data);
        if (!result.success) {
            return error400("Invalid request body");
        }

        const productId = req.nextUrl.searchParams.get("id");
        if (!productId) {
            return error400("Product id is required");
        }

        const { images, error } = await processImages(
            {
                image: result.data.image,
            },
            "products"
        );

        if (error || images === null) {
            return error500({
                error,
            });
        }

        await Product.updateOne(
            { _id: productId },
            {
                $set: {
                    productName: result.data.productName,
                    productTitle: result.data.productTitle,
                    description: result.data.description,
                    keyBenefits: result.data.keyBenefits,
                    image: {
                        url: images.image?.url,
                        publicId: images.image?.publicId,
                    },
                },
            }
        );

        revalidatePath("/admin/dashboard/products");

        return success200({
            success: true,
            message: "Successful",
            data: { ...result.data, image: images.image?.url },
        });
    } catch (error) {
        console.log(error);
        return error500({
            message:
                error instanceof Error ? error.message : "Something went wrong",
        });
    }
}

export const POST = withDbConnectAndAuth(postHandler);
export const PUT = withDbConnectAndAuth(putHandler);
