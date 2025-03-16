import { z } from "zod";

export const createTaskFormSchema = z.object({
    name: z
        .string()
        .min(3, "მინიმუმ 3 სიმბოლო")
        .max(255, "მაქსიმუმ 255 სიმბოლო"),

    description: z
        .string()
        .max(255, "მაქსიმუმ 255 სიმბოლო")
        .optional()
        .superRefine((val, ctx) => {
            if (val && val.length < 4) {
                ctx.addIssue({
                    code: z.ZodIssueCode.too_small,
                    minimum: 4,
                    type: "string",
                    inclusive: true,
                    message: "მინიმუმ 4 სიმბოლო",
                });
            }
        }),

    priority_id: z.string({ required_error: "აუცილებელია" }),

    status_id: z.string({ required_error: "აუცილებელია" }),

    department_id: z.string({ required_error: "აუცილებელია" }),

    employee_id: z.string({ required_error: "აუცილებელია" }),

    due_date: z.string().refine(
        (date) => {
            const selectedDate = new Date(date);
            selectedDate.setHours(0, 0, 0, 0); 
    
            const today = new Date();
            today.setHours(0, 0, 0, 0); 
            today.setDate(today.getDate() + 1); 
    
            return selectedDate >= today; 
        },
        {
            message: "წარსულ თარიღს ვერ მიუთითებთ",
        }
    ),
});

export type CreateTaskFormSchemaType = z.infer<typeof createTaskFormSchema>;
