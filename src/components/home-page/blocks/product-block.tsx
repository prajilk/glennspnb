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
import BenefitsBlock from "./benefits-block";

const ProductBlock = ({
    form,
}: {
    form: UseFormReturn<z.infer<typeof ZodHomePageSchema>>;
}) => {
    return (
        <div className="space-y-2">
            <h4 className="text-xs font-semibold">
                Products Section<span className="text-red-600">*</span>
            </h4>
            <div
                className={
                    "flex flex-col gap-4 bg-gray-200 p-4 rounded-sm border border-gray-300"
                }
            >
                <FormField
                    control={form.control}
                    name="productsSection.title"
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
                    name="productsSection.description"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="space-y-2 w-full">
                                    <h4 className="text-xs font-semibold">
                                        Description
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
                        Featured Product<span className="text-red-600">*</span>
                    </h4>
                    <div
                        className={
                            "flex flex-col gap-4 bg-gray-300 p-4 rounded-sm border border-gray-300"
                        }
                    >
                        <div className="space-y-2">
                            <h4 className="text-xs font-semibold">
                                Product Image
                                <span className="text-red-600">*</span>
                            </h4>
                            <FileUploader
                                // @ts-expect-error: Ignore
                                form={form}
                                path="productsSection.featuredProduct.productImage"
                                className="w-full"
                            />
                            <p
                                data-slot="form-message"
                                className={"text-destructive text-sm"}
                            >
                                {
                                    form.formState.errors.productsSection
                                        ?.featuredProduct?.productImage?.message
                                }
                            </p>
                        </div>
                        <FormField
                            control={form.control}
                            name="productsSection.featuredProduct.productName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="space-y-2 w-full">
                                            <h4 className="text-xs font-semibold">
                                                Product Name
                                                <span className="text-red-600">
                                                    *
                                                </span>
                                            </h4>
                                            <Input
                                                placeholder={"Product Name"}
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
                            name="productsSection.featuredProduct.productTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="space-y-2 w-full">
                                            <h4 className="text-xs font-semibold">
                                                Product Title
                                                <span className="text-red-600">
                                                    *
                                                </span>
                                            </h4>
                                            <Input
                                                placeholder={"Product Title"}
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
                            name="productsSection.featuredProduct.productDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="space-y-2 w-full">
                                            <h4 className="text-xs font-semibold">
                                                Product Description
                                                <span className="text-red-600">
                                                    *
                                                </span>
                                            </h4>
                                            <Textarea
                                                placeholder={
                                                    "Product Description"
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

                        <div className="space-y-2">
                            <h4 className="text-xs font-semibold">
                                Key Benefits
                                <span className="text-red-600">*</span>
                            </h4>
                            <BenefitsBlock
                                // @ts-expect-error: Ignore
                                form={form}
                                path="productsSection.featuredProduct.keyBenefits"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductBlock;
