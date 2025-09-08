"use server";

import { deleteFile } from "@/config/cloudinary.config";
import { withDbConnectAndActionAuth } from "@/lib/with-db-connect-and-auth";
import Product from "@/models/product";
import { revalidatePath } from "next/cache";

export async function deleteProductsAction(ids: string[]) {
    try {
        await withDbConnectAndActionAuth();
        // 1. Fetch products to get public_ids
        const products = await Product.find(
            { _id: { $in: ids } },
            "image.publicId"
        );

        // 2. Delete images from Cloudinary
        const deletePromises = products.map((p) =>
            deleteFile(p.image.publicId)
        );
        await Promise.all(deletePromises);

        // 3. Delete products from DB
        const deleteResult = await Product.deleteMany({ _id: { $in: ids } });

        revalidatePath("/admin/dashboard/products");
        revalidatePath("/");

        return {
            success: true,
            message: `${deleteResult.deletedCount}/${ids.length} products deleted`,
        };
    } catch (error) {
        console.log(error);
        return {
            error: true,
            message:
                error instanceof Error ? error.message : "Something went wrong",
        };
    }
}
