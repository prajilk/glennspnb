import { Button } from "@/components/ui/button";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ZodHomePageSchema, ZodProductSchema } from "@/lib/zod-schema";
import { Plus, Trash2 } from "lucide-react";
import { Path, useFieldArray, type UseFormReturn } from "react-hook-form";
import type z from "zod";

const BenefitsBlock = ({
    form,
    path,
}: {
    form: UseFormReturn<
        z.infer<typeof ZodHomePageSchema | typeof ZodProductSchema>
    >;
    path: Path<z.infer<typeof ZodHomePageSchema | typeof ZodProductSchema>>;
}) => {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        // @ts-expect-error: Ignore
        name: path,
    });

    return (
        <div className="space-y-2">
            {fields.map((field, index) => (
                <FormField
                    key={field.id}
                    control={form.control}
                    // @ts-expect-error: Ignore
                    name={`${path}.${index}`}
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex gap-2 items-center">
                                <FormControl>
                                    {/* @ts-expect-error: Ignore */}
                                    <Input
                                        placeholder="Enter benefit"
                                        className="bg-accent/70"
                                        {...field}
                                    />
                                </FormControl>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => remove(index)}
                                >
                                    <Trash2
                                        size={20}
                                        className="text-red-500"
                                    />
                                </Button>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            ))}

            <Button
                className="w-full bg-accent/70 border border-accent cursor-pointer hover:bg-accent/50"
                variant={"outline"}
                // @ts-expect-error: Ignore
                onClick={() => append("")}
                type="button"
            >
                <Plus /> Add Benefit
            </Button>
        </div>
    );
};

export default BenefitsBlock;
