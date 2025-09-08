import connectDB from "@/config/mongoose";
import EmailSubscriber from "@/models/email-subscribers";
import EmailSubscribersTable from "@/components/data-table/email-subscribers-table";

const EmailSubscribersPage = async () => {
    await connectDB();
    const emails = JSON.parse(JSON.stringify(await EmailSubscriber.find({})));
    if (!emails) {
        return <div>No products found</div>;
    }

    return (
        <main className="max-w-4xl mx-auto w-full">
            <h1 className="text-3xl font-bold mb-10">Email Subscribers</h1>
            <EmailSubscribersTable emails={emails} />
        </main>
    );
};

export default EmailSubscribersPage;
