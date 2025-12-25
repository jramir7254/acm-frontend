import { z } from "zod";

export const imageUrlSchemaClient = z
    .url("Must be a valid URL")
    .max(300, "URL must be less than 300 characters")
    .refine(async (url) => await loadsAsImage(url), {
        message: "URL could not be loaded as an image",
    });



export function loadsAsImage(url: string): Promise<boolean> {
    return new Promise((resolve) => {
        if (['jpg', 'jpeg', 'png'].some(str => url.endsWith(str))) resolve(true)
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.crossOrigin = "anonymous";
        img.src = url;
    });
}
