export interface ICustomButton {
    title: string;
    onClick: () => void;
    icon?: React.ReactNode;
    fill?: boolean;
    otherStyles?: string;
}