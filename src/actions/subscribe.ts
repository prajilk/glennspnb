"use server";

import EmailSubscriber from "@/models/email-subscribers";
import { revalidatePath } from "next/cache";

export async function subscribeAction(formData: FormData) {
    const email = formData.get("email");
    if (!email) return;

    try {
        await EmailSubscriber.create({
            email,
        });
        revalidatePath("/admin/dashboard/email-subscribers");
    } catch {
        return;
    }
}
