"use client";

import z from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "../ui/form";
import { ZodProductSchema } from "@/lib/zod-schema";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "../ui/loading-button";
import FileUploader from "../file-uploader";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import BenefitsBlock from "../home-page/blocks/benefits-block";
import { ProductDocument } from "@/models/types/product";

const ProductAddForm = ({
    defaultValues,
    action = "add",
}: {
    defaultValues?: ProductDocument;
    action?: "add" | "edit";
}) => {
    const [loading, setLoading] = useState(false);

    const values =
        action === "edit"
            ? {
                  productName: defaultValues?.productName,
                  productTitle: defaultValues?.productTitle,
                  description: defaultValues?.description,
                  keyBenefits: defaultValues?.keyBenefits,
                  image: defaultValues?.image.url,
              }
            : {
                  description: "",
                  keyBenefits: [],
                  productName: "",
                  productTitle: "",
                  image: "",
              };

    const form = useForm<z.infer<typeof ZodProductSchema>>({
        resolver: zodResolver(ZodProductSchema),
        defaultValues: values,
    });

    async function handleHomePageUpdate(
        values: z.infer<typeof ZodProductSchema>
    ) {
        try {
            setLoading(true);
            const method = action === "add" ? "POST" : "PUT";
            const url =
                action === "add"
                    ? "/api/products"
                    : `/api/products?id=${defaultValues?._id}`;
            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }).then((res) => res.json());
            console.log(response, "<-=== Res");

            if (response.success) {
                if (action === "add") {
                    toast.success("Product created successfully");
                    form.reset();
                } else {
                    toast.success("Product updated successfully");
                    form.reset({
                        productName: response.data.productName,
                        productTitle: response.data.productTitle,
                        description: response.data.description,
                        keyBenefits: response.data.keyBenefits,
                        image: response.data.image,
                    });
                }
            } else {
                toast.error(response.error ?? "Something went wrong");
            }
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleHomePageUpdate)}
                className="bg-gray-100 border border-gray-200 p-6 rounded-md w-full space-y-10"
            >
                <div className="space-y-2">
                    <h4 className="text-xs font-semibold">
                        Product details<span className="text-red-600">*</span>
                    </h4>
                    <div
                        className={
                            "flex flex-col gap-4 bg-gray-200 p-4 rounded-sm border border-gray-300"
                        }
                    >
                        <FormField
                            control={form.control}
                            name="productName"
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
                                                placeholder={"Product name"}
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
                            name="productTitle"
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
                                                placeholder={"Product title"}
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
                            name="description"
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
                        <div className="space-y-2">
                            <h4 className="text-xs font-semibold">
                                Product Image
                                <span className="text-red-600">*</span>
                            </h4>
                            <FileUploader
                                // @ts-expect-error: Ignore
                                form={form}
                                path="image"
                                className="w-full"
                            />
                            <p
                                data-slot="form-message"
                                className={"text-destructive text-sm"}
                            >
                                {form.formState.errors.image?.message}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-xs font-semibold">
                                Key Benefits
                                <span className="text-red-600">*</span>
                            </h4>
                            <BenefitsBlock
                                // @ts-expect-error: Ignore
                                form={form}
                                path="keyBenefits"
                            />
                            <p
                                data-slot="form-message"
                                className={"text-destructive text-sm"}
                            >
                                {form.formState.errors.keyBenefits?.message}
                            </p>
                        </div>
                    </div>
                </div>

                <LoadingButton
                    type="submit"
                    className="w-full"
                    isLoading={loading}
                    disabled={
                        loading ||
                        !form.formState.isValid ||
                        !form.formState.isDirty
                    }
                >
                    Publish
                </LoadingButton>
            </form>
        </Form>
    );
};

export default ProductAddForm;
