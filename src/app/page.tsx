import AboutSection from "@/components/home-page/about-section";
import Footer from "@/components/home-page/footer";
import Header from "@/components/home-page/header";
import HeroSection from "@/components/home-page/hero-section";
import ProductsSection from "@/components/home-page/products-section";
import connectDB from "@/config/mongoose";
import HomePage from "@/models/home-page";
import Product from "@/models/product";
import { HomePageDocument } from "@/models/types/home-page";
import { ProductDocument } from "@/models/types/product";

export default async function Home() {
    await connectDB();
    const homePage = JSON.parse(
        JSON.stringify(await HomePage.findOne())
    ) as HomePageDocument | null;
    const products = JSON.parse(
        JSON.stringify(await Product.find({}))
    ) as ProductDocument[];
    if (!homePage) return <>Website Content Not Found!</>;

    return (
        <main>
            <Header {...homePage.header} />
            <HeroSection {...homePage.heroSection} />
            <AboutSection {...homePage.aboutSection} />
            <ProductsSection
                {...homePage.productsSection}
                products={products || []}
            />
            <Footer {...homePage.footer} />
        </main>
    );
}
