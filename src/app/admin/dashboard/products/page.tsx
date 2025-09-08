import ProductsTable from "@/components/data-table/products-table";
import connectDB from "@/config/mongoose";
import Product from "@/models/product";

const ProductsPage = async () => {
    await connectDB();
    const products = JSON.parse(JSON.stringify(await Product.find({})));
    if (!products) {
        return <div>No products found</div>;
    }

    return (
        <main className="max-w-4xl mx-auto w-full">
            <h1 className="text-3xl font-bold mb-10">Products</h1>
            <ProductsTable productData={products} />
        </main>
    );
};

export default ProductsPage;
