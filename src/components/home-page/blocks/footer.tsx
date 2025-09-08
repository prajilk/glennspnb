import FileUploader from "@/components/file-uploader";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ZodHomePageSchema } from "@/lib/zod-schema";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import type z from "zod";

const FooterBlock = ({
    form,
}: {
    form: UseFormReturn<z.infer<typeof ZodHomePageSchema>>;
}) => {
    return (
        <div className="space-y-2">
            <h4 className="text-xs font-semibold">
                Footer<span className="text-red-600">*</span>
            </h4>
            <div
                className={
                    "flex flex-col gap-4 bg-gray-200 p-4 rounded-sm border border-gray-300"
                }
            >
                <div className="flex flex-col @lg:flex-row gap-4 w-full">
                    <div className="space-y-2">
                        <h4 className="text-xs font-semibold">
                            Logo<span className="text-red-600">*</span>
                        </h4>
                        <FileUploader
                            // @ts-expect-error: Ignore
                            form={form}
                            path="footer.logo"
                            className="w-full @lg:w-52"
                        />
                        <p
                            data-slot="form-message"
                            className={"text-destructive text-sm"}
                        >
                            {form.formState.errors.footer?.logo?.message}
                        </p>
                    </div>
                    <div className="w-full space-y-2">
                        <FormField
                            control={form.control}
                            name="footer.address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="space-y-2 w-full">
                                            <h4 className="text-xs font-semibold">
                                                Address
                                                <span className="text-red-600">
                                                    *
                                                </span>
                                            </h4>
                                            <Textarea
                                                placeholder={"Address"}
                                                className={
                                                    "w-full bg-accent/70"
                                                }
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="footer.email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="space-y-2 w-full">
                                            <h4 className="text-xs font-semibold">
                                                Email
                                                <span className="text-red-600">
                                                    *
                                                </span>
                                            </h4>
                                            <Input
                                                placeholder={"Email"}
                                                className={
                                                    "w-full bg-accent/70"
                                                }
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <h4 className="text-xs font-semibold">
                        Background Image <span className="text-red-600">*</span>
                    </h4>
                    <FileUploader
                        // @ts-expect-error: Ignore
                        form={form}
                        path="footer.backgroundImage"
                        className="w-full"
                    />
                    <p
                        data-slot="form-message"
                        className={"text-destructive text-sm"}
                    >
                        {form.formState.errors.footer?.backgroundImage?.message}
                    </p>
                </div>

                <div className="space-y-2">
                    <h4 className="text-xs font-semibold">
                        Get in Touch Section
                        <span className="text-red-600">*</span>
                    </h4>
                    <div
                        className={
                            "flex flex-col bg-gray-300 gap-4 p-4 rounded-sm border border-gray-300"
                        }
                    >
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="footer.getInTouchSection.title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="space-y-2 w-full">
                                                <h4 className="text-xs font-semibold">
                                                    Title
                                                    <span className="text-red-600">
                                                        *
                                                    </span>
                                                </h4>
                                                <Input
                                                    placeholder={"Title"}
                                                    className={
                                                        "w-full bg-accent/70"
                                                    }
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="footer.getInTouchSection.description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="space-y-2 w-full">
                                                <h4 className="text-xs font-semibold">
                                                    Description
                                                    <span className="text-red-600">
                                                        *
                                                    </span>
                                                </h4>
                                                <Textarea
                                                    placeholder={"Description"}
                                                    className={
                                                        "w-full bg-accent/70"
                                                    }
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="footer.getInTouchSection.twitterUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="space-y-2 w-full">
                                                <h4 className="text-xs font-semibold">
                                                    Twitter url
                                                </h4>
                                                <Input
                                                    placeholder={"Twitter url"}
                                                    className={
                                                        "w-full bg-accent/70"
                                                    }
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="footer.getInTouchSection.facebookUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="space-y-2 w-full">
                                                <h4 className="text-xs font-semibold">
                                                    Facebook url
                                                </h4>
                                                <Input
                                                    placeholder={"Facebook url"}
                                                    className={
                                                        "w-full bg-accent/70"
                                                    }
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="footer.getInTouchSection.instagramUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="space-y-2 w-full">
                                                <h4 className="text-xs font-semibold">
                                                    Instagram url
                                                </h4>
                                                <Input
                                                    placeholder={
                                                        "Instagram url"
                                                    }
                                                    className={
                                                        "w-full bg-accent/70"
                                                    }
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="footer.getInTouchSection.followUs"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="space-y-2 w-full">
                                                <h4 className="text-xs font-semibold">
                                                    Follow us:
                                                </h4>
                                                <Input
                                                    placeholder={"Follow us:"}
                                                    className={
                                                        "w-full bg-accent/70"
                                                    }
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FooterBlock;
