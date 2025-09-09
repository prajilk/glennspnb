"use server";

import EmailSubscriber from "@/models/email-subscribers";

export async function subscribeAction(formData: FormData) {
    const email = formData.get("email");
    if (!email) return;

    try {
        await EmailSubscriber.create({
            email,
        });
    } catch {
        return;
    }
}
