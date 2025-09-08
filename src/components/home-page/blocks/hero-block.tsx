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
import type { UseFormReturn } from "react-hook-form";
import type z from "zod";

const HeroBlock = ({
    form,
}: {
    form: UseFormReturn<z.infer<typeof ZodHomePageSchema>>;
}) => {
    return (
        <div className="space-y-2">
            <h4 className="text-xs font-semibold">
                Hero Section<span className="text-red-600">*</span>
            </h4>
            <div className="flex flex-col gap-4 bg-gray-200 p-4 rounded-sm border border-gray-300">
                <FormField
                    control={form.control}
                    name="heroSection.title"
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
                    name="heroSection.description"
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
                <div className="space-y-2">
                    <h4 className="text-xs font-semibold">
                        Background Image <span className="text-red-600">*</span>
                    </h4>
                    <FileUploader
                        // @ts-expect-error: Ignore
                        form={form}
                        path="heroSection.backgroundImage"
                        className="w-full"
                    />
                    <p
                        data-slot="form-message"
                        className={"text-destructive text-sm"}
                    >
                        {
                            form.formState.errors.heroSection?.backgroundImage
                                ?.message
                        }
                    </p>
                </div>

                <div className="space-y-2">
                    <h4 className="text-xs font-semibold">
                        CTA Button <span className="text-red-600">*</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                        <FormField
                            control={form.control}
                            name="heroSection.ctaButton.text"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Button text"
                                            className="bg-accent/70 w-full"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="heroSection.ctaButton.url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="URL"
                                            className="bg-accent/70 w-full"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroBlock;
