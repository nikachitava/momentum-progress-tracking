export interface ICustomSelectOption {
    name: string;
    label: string;
    placeholder?: string;
    options: {
        value: string;
        label: string;
        icon?: string;
    }[];
    requirements?: {
        id: string;
        label: string;
        validator: (value: string) => boolean;
    }[];
    defaultValue?: string;
    disabled?: boolean;
    icon?: boolean;
}