import { extractPublicId, uploadFile } from "@/config/cloudinary.config";

type UploadResult = { url: string; publicId: string | null } | null;

async function processImages<T extends Record<string, string>>(
    fields: T,
    folder: string
) {
    // @ts-expect-error: Ignore
    const images: Record<keyof T, UploadResult> = {};

    for (const [key, value] of Object.entries(fields) as [keyof T, string][]) {
        try {
            if (value.startsWith("data:image/")) {
                images[key] = await uploadFile(value, folder);
            } else {
                const publicId = extractPublicId(value);
                images[key] = { url: value, publicId };
            }

            if (images[key] === null) {
                // uploadFile returned null (unexpected)
                throw new Error(`Unable to upload image: ${String(key)}`);
            }
        } catch (err) {
            // stop at first failure
            return {
                error: (err as Error).message ?? err,
                images: null,
            };
        }
    }

    return { images, error: null };
}

export { processImages };
