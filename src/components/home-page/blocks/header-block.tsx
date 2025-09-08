import FileUploader from "@/components/file-uploader";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ZodHomePageSchema } from "@/lib/zod-schema";
import type { UseFormReturn } from "react-hook-form";
import type z from "zod";

const HeaderBlock = ({
    form,
}: {
    form: UseFormReturn<z.infer<typeof ZodHomePageSchema>>;
}) => {
    return (
        <div className="space-y-2">
            <h4 className="text-xs font-semibold">
                Header<span className="text-red-600">*</span>
            </h4>
            <div className="flex flex-col @lg:flex-row gap-4 bg-gray-200 p-4 rounded-sm border border-gray-300">
                <div className="space-y-2">
                    <h4 className="text-xs font-semibold">
                        Logo<span className="text-red-600">*</span>
                    </h4>
                    <FileUploader
                        // @ts-expect-error: Ignore
                        form={form}
                        path="header.logo"
                        className="w-full @lg:w-52"
                    />
                    <p
                        data-slot="form-message"
                        className={"text-destructive text-sm"}
                    >
                        {form.formState.errors.header?.logo?.message}
                    </p>
                </div>

                <div className="space-y-2 w-full">
                    <h4 className="text-xs font-semibold">
                        Header Menu<span className="text-red-600">*</span>
                    </h4>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="grid grid-cols-2 gap-2">
                            <FormField
                                control={form.control}
                                name="header.headerMenu.0.name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Menu 1"
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
                                name="header.headerMenu.0.url"
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
                        <div className="grid grid-cols-2 gap-2">
                            <FormField
                                control={form.control}
                                name="header.headerMenu.1.name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Menu 2"
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
                                name="header.headerMenu.1.url"
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
                        <div className="grid grid-cols-2 gap-2">
                            <FormField
                                control={form.control}
                                name="header.headerMenu.2.name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Menu 3"
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
                                name="header.headerMenu.2.url"
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
                        <div className="grid grid-cols-2 gap-2">
                            <FormField
                                control={form.control}
                                name="header.headerMenu.3.name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Menu 4"
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
                                name="header.headerMenu.3.url"
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
        </div>
    );
};

export default HeaderBlock;
