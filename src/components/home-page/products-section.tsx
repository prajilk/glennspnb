import { HomePageDocument } from "@/models/types/home-page";
import { ProductDocument } from "@/models/types/product";
import Image from "next/image";
import { ViewProduct } from "../drawer/view-product";

type ProductsSectionProps = Pick<
    HomePageDocument["productsSection"],
    "title" | "description" | "featuredProduct"
> & {
    products: ProductDocument[];
};

const ProductsSection = ({
    title,
    description,
    featuredProduct,
    products,
}: ProductsSectionProps) => {
    if (!title || !featuredProduct) return null;
    return (
        <section id="products" className="bg-[#f2f2f2]">
            <div className="max-w-7xl mx-auto px-5 py-14 md:px-10 md:py-20">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black">
                    {title}
                </h1>
                <p className="max-w-5xl mx-auto text-sm md:text-lg">
                    {description}
                </p>
                <div className="hidden md:grid md:grid-cols-2 gap-5 mt-10 md:mt-14 lg:mt-20">
                    <div className="w-full lg:w-11/12 aspect-square relative rounded-4xl overflow-hidden">
                        <Image
                            src={featuredProduct.productImage.url}
                            alt={featuredProduct.productTitle}
                            fill
                        />
                    </div>
                    <div className="space-y-4 pt-5 md:pt-0 lg:pt-10">
                        <h2 className="text-2xl lg:text-4xl font-black max-w-sm">
                            {featuredProduct.productTitle}
                        </h2>
                        <div>
                            <span className="font-bold">Description: </span>
                            <p className="mt-1 md:mt-0 lg:mt-1 max-w-xl">
                                {featuredProduct.productDescription}
                            </p>
                        </div>
                        <ul className="list-disc">
                            <span className="font-bold block mb-1 md:mb-0 lg:mb-1">
                                Key Benefits:{" "}
                            </span>
                            {featuredProduct.keyBenefits.map((benefit) => (
                                <li key={benefit} className="ml-4">
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="md:hidden">
                    <ViewProduct
                        product={{
                            _id: "abcd",
                            productName: featuredProduct.productTitle,
                            productTitle: featuredProduct.productTitle,
                            description: featuredProduct.productDescription,
                            image: featuredProduct.productImage,
                            keyBenefits: featuredProduct.keyBenefits,
                        }}
                        className="w-full mt-10"
                    >
                        <div className="flex flex-col justify-center items-center gap-4 w-full">
                            <div className="relative w-full aspect-square">
                                <Image
                                    src={featuredProduct.productImage.url}
                                    alt={featuredProduct.productTitle}
                                    fill
                                    className="object-cover rounded-3xl"
                                />
                            </div>
                            <div className="text-xl font-semibold text-[#1f2124] bg-white rounded-md px-4 py-1 border">
                                {featuredProduct.productName}
                            </div>
                        </div>
                    </ViewProduct>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7 gap-y-10 mt-10 md:mt-20">
                    {products
                        ?.sort((a, b) =>
                            a.productName.localeCompare(b.productName)
                        )
                        .map((product) => (
                            <ViewProduct key={product._id} product={product}>
                                <div className="flex flex-col justify-center items-center gap-4 w-full">
                                    <div className="relative w-full aspect-square">
                                        <Image
                                            src={product.image.url}
                                            alt={product.productName}
                                            fill
                                            className="object-cover rounded-3xl"
                                        />
                                    </div>
                                    <div className="text-xl font-semibold text-[#1f2124] bg-white rounded-md px-4 py-1 border">
                                        {product.productName}
                                    </div>
                                </div>
                            </ViewProduct>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default ProductsSection;
