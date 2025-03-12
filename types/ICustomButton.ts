export interface ICustomButton {
    title: string;
    onClick: () => void;
    icon?: React.ReactNode;
    otherStyles?: string;
}