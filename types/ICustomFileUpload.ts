export interface ICustomFileUpload {
    name: string;
    label: string;
    requirements: {
        id: string;
        label: string;
        validator: (file: File | null) => boolean;
    }[];
    acceptedFileTypes?: string;
}