export interface ICustomInput {
    name: string;
    label: string;
    placeholder?: string;
    requirements: {
        id: string;
        label: string;
        validator: (value: string) => boolean;
    }[];
}
