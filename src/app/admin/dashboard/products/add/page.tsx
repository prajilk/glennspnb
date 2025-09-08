import ProductAddForm from "@/components/forms/product-add-form";

const ProductAddPage = () => {
    return (
        <main className="max-w-3xl mx-auto w-full">
            <h1 className="text-3xl font-bold mb-10">Add new Product</h1>
            <ProductAddForm />
        </main>
    );
};

export default ProductAddPage;
