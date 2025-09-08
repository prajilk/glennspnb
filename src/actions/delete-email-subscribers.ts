"use server";

import { withDbConnectAndActionAuth } from "@/lib/with-db-connect-and-auth";
import EmailSubscriber from "@/models/email-subscribers";
import { revalidatePath } from "next/cache";

export async function deleteEmailSubscribersAction(ids: string[]) {
    try {
        await withDbConnectAndActionAuth();

        const deleteResult = await EmailSubscriber.deleteMany({
            _id: { $in: ids },
        });

        revalidatePath("/admin/dashboard/email-subscribers");

        return {
            success: true,
            message: `${deleteResult.deletedCount}/${ids.length} emails deleted`,
        };
    } catch (error) {
        return {
            error: true,
            message:
                error instanceof Error ? error.message : "Something went wrong",
        };
    }
}
