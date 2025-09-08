"use client";

import { AlertCircleIcon, ImageUpIcon, XIcon } from "lucide-react";

import { useFileUpload } from "@/hooks/use-file-upload";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Path, UseFormReturn } from "react-hook-form";
import type z from "zod";
import type { ZodHomePageSchema, ZodProductSchema } from "@/lib/zod-schema";
import { useEffect } from "react";

export default function FileUploader({
    form,
    path,
    className,
}: {
    form: UseFormReturn<
        z.infer<typeof ZodHomePageSchema | typeof ZodProductSchema>
    >;
    path: Path<z.infer<typeof ZodHomePageSchema | typeof ZodProductSchema>>;
    className?: string;
}) {
    const maxSizeMB = 2;
    const maxSize = maxSizeMB * 1024 * 1024; // 2MB default

    const [
        { files, isDragging, errors },
        {
            handleDragEnter,
            handleDragLeave,
            handleDragOver,
            handleDrop,
            openFileDialog,
            removeFile,
            getInputProps,
        },
    ] = useFileUpload({
        accept: "image/*",
        maxSize,
    });

    const previewUrl = form.getValues(path) || null;

    useEffect(() => {
        const file = files[0]?.file;
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string; // "data:image/png;base64,...."
            form.setValue(path, base64String, {
                shouldValidate: true, // ensures zod schema validation runs
                shouldDirty: true, // marks the field as dirty
            });
        };
        reader.readAsDataURL(file as File);

        // Cleanup to avoid memory leaks if component unmounts
        return () => reader.abort();
    }, [files, form, path]);

    return (
        <div className={cn("flex flex-col gap-2 w-52", className)}>
            <div className="relative">
                {/* Drop area */}
                <button
                    type="button"
                    onClick={openFileDialog}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    data-dragging={isDragging || undefined}
                    className={
                        "w-full border-input bg-accent/70 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none has-[input:focus]:ring-[3px]"
                    }
                >
                    <input
                        {...getInputProps()}
                        className="sr-only"
                        aria-label="Upload file"
                    />
                    {previewUrl ? (
                        <div className="absolute inset-0">
                            <Image
                                src={
                                    (previewUrl !== "" &&
                                        (previewUrl as string)) ||
                                    "/placeholder.png"
                                }
                                alt={files[0]?.file?.name || "Uploaded image"}
                                className="size-full object-contain"
                                width={200}
                                height={150}
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
                            <div
                                className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
                                aria-hidden="true"
                            >
                                <ImageUpIcon className="size-4 opacity-60" />
                            </div>
                            <p className="mb-1.5 text-sm font-medium">
                                Drop your image here or click to browse
                            </p>
                            <p className="text-muted-foreground text-xs">
                                Max size: {maxSizeMB}MB
                            </p>
                        </div>
                    )}
                </button>
                {previewUrl && (
                    <div className="absolute top-4 right-4">
                        <button
                            type="button"
                            className="focus-visible:border-ring focus-visible:ring-ring/50 z-50 flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
                            onClick={() => {
                                removeFile(files[0]?.id);
                                form.setValue(path, "");
                            }}
                            aria-label="Remove image"
                        >
                            <XIcon className="size-4" aria-hidden="true" />
                        </button>
                    </div>
                )}
            </div>

            {errors.length > 0 && (
                <div
                    className="text-destructive flex items-center gap-1 text-xs"
                    role="alert"
                >
                    <AlertCircleIcon className="size-3 shrink-0" />
                    <span>{errors[0]}</span>
                </div>
            )}
        </div>
    );
}
