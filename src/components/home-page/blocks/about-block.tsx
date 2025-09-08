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

const AboutBlock = ({
    form,
}: {
    form: UseFormReturn<z.infer<typeof ZodHomePageSchema>>;
}) => {
    return (
        <div className="space-y-2">
            <h4 className="text-xs font-semibold">
                About Section<span className="text-red-600">*</span>
            </h4>
            <div
                className={
                    "flex flex-col gap-4 bg-gray-200 p-4 rounded-sm border border-gray-300"
                }
            >
                <FormField
                    control={form.control}
                    name="aboutSection.title"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="space-y-2 w-full">
                                    <h4 className="text-xs font-semibold">
                                        Title
                                        <span className="text-red-600">*</span>
                                    </h4>
                                    <Input
                                        placeholder={"Title"}
                                        className={"w-full bg-accent/70"}
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
                    name="aboutSection.description"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="space-y-2 w-full">
                                    <h4 className="text-xs font-semibold">
                                        Description
                                        <span className="text-red-600">*</span>
                                    </h4>
                                    <Textarea
                                        placeholder={"Description"}
                                        className={"w-full bg-accent/70"}
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
                    name="aboutSection.subHeading"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="space-y-2 w-full">
                                    <h4 className="text-xs font-semibold">
                                        Sub Heading
                                    </h4>
                                    <Input
                                        placeholder={"Sub Heading"}
                                        className={"w-full bg-accent/70"}
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="space-y-2">
                    <h4 className="text-xs font-semibold">
                        Background Image<span className="text-red-600">*</span>
                    </h4>
                    <FileUploader
                        // @ts-expect-error: Ignore
                        form={form}
                        path="aboutSection.backgroundImage"
                        className="w-full"
                    />
                    <p
                        data-slot="form-message"
                        className={"text-destructive text-sm"}
                    >
                        {
                            form.formState.errors.aboutSection?.backgroundImage
                                ?.message
                        }
                    </p>
                </div>

                <FormField
                    control={form.control}
                    name="aboutSection.sectionTitle"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="space-y-2 w-full">
                                    <h4 className="text-xs font-semibold">
                                        Section Title
                                        <span className="text-red-600">*</span>
                                    </h4>
                                    <Input
                                        placeholder={"Section Title"}
                                        className={"w-full bg-accent/70"}
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
                    name="aboutSection.sectionDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="space-y-2 w-full">
                                    <h4 className="text-xs font-semibold">
                                        Section Description
                                        <span className="text-red-600">*</span>
                                    </h4>
                                    <Textarea
                                        placeholder={"Section Description"}
                                        className={"w-full bg-accent/70"}
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
    );
};

export default AboutBlock;
