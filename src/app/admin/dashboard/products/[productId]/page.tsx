import ProductAddForm from "@/components/forms/product-add-form";
import connectDB from "@/config/mongoose";
import Product from "@/models/product";
import { ProductDocument } from "@/models/types/product";

const ProductPage = async ({
    params,
}: {
    params: Promise<{ productId: string }>;
}) => {
    const productId = (await params).productId;
    await connectDB();
    const product = JSON.parse(
        JSON.stringify(await Product.findById(productId))
    ) as ProductDocument;
    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <main className="max-w-3xl mx-auto w-full">
            <h1 className="text-3xl font-bold mb-10">{product.productName}</h1>
            <ProductAddForm action="edit" defaultValues={product} />
        </main>
    );
};

export default ProductPage;
