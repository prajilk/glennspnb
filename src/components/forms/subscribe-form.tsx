"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { subscribeAction } from "@/actions/subscribe";
import { toast } from "sonner";

const SubscribeForm = () => {
    return (
        <form
            className="space-y-3 pt-2"
            onSubmit={() =>
                toast.success("Subscribed successfully", { richColors: true })
            }
        >
            <Input
                placeholder="Email"
                className="bg-white text-black"
                required
                type="email"
                name="email"
            />
            <Button
                type="submit"
                formAction={subscribeAction}
                className="rounded-full text-white bg-gradient-to-r from-[#de3c4c] to-[#931c22] font-bold tracking-widest px-6 pt-3 pb-2.5 cursor-pointer"
            >
                SUBSCRIBE
            </Button>
        </form>
    );
};

export default SubscribeForm;
