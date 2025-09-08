import HomePageForm from "@/components/forms/home-page-form";
import connectDB from "@/config/mongoose";
import HomePage from "@/models/home-page";

export default async function Page() {
    await connectDB();

    const homePage = JSON.parse(JSON.stringify(await HomePage.findOne()));

    return (
        <main className="max-w-3xl mx-auto w-full">
            <h1 className="text-3xl font-bold mb-10">Home Page</h1>
            <HomePageForm currentValues={homePage} />
        </main>
    );
}
