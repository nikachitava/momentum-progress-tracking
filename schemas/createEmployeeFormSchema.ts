import { z } from "zod";

const nameRegex = /^[a-zA-Zა-ჰ\s]+$/;

export const MAX_FILE_SIZE = 600 * 1024;

export const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

export const createEmployeeFormSchema = z.object({
    firstName: z
        .string()
        .min(2, { message: "სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს" })
        .max(255, { message: "სახელი არ უნდა აღემატებოდეს 255 სიმბოლოს" })
        .regex(nameRegex, {
            message:
                "სახელი უნდა შეიცავდეს მხოლოდ ქართულ ან ლათინურ სიმბოლოებს",
        }),
    lastName: z
        .string()
        .min(2, { message: "გვარი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს" })
        .max(255, { message: "გვარი არ უნდა აღემატებოდეს 255 სიმბოლოს" })
        .regex(nameRegex, {
            message: "გვარი უნდა შეიცავდეს მხოლოდ ქართულ ან ლათინურ სიმბოლოებს",
        }),
    avatar: z
        .any()
        .refine((files) => files?.length > 0, {
            message: "სურათი სავალდებულოა",
        })
        .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
            message: `ფაილის ზომა უნდა იყოს მაქსიმუმ 600kb`,
        })
        .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
            message: `გთხოვთ ატვირთოთ მხოლოდ სურათის ფაილები (JPEG, JPG, PNG)`,
        }),
    departmentId: z.string({
        required_error: "გთხოვთ აირჩიოთ დეპარტამენტი",
    }).min(1, "აუცილებელია"),
});

export type CreateEmployeeFormSchemaType = z.infer<
    typeof createEmployeeFormSchema
>;

// export type CreateEmployeeFormSchemaType = {
//     firstName: string;
//     lastName: string;
//     avatar: File;
//     departmentId: string;
// }
