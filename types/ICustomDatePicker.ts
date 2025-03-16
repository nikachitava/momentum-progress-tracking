export interface ICustomDatePicker {
    name: string;
    label: string;
    requirements: {
        id: string;
        label: string;
        validator: (value: string) => boolean;
    }[]
}