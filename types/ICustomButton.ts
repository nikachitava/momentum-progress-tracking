export interface ICustomButton {
    title: string;
    onClick: () => void;
    icon?: React.ReactNode;
    fill?: boolean;
    otherStyles?: string;
    type?: "submit" | "reset" | "button" | undefined;
}