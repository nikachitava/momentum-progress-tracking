export interface IFilterMenuItem {
    title: string;
    isOpen: boolean;
    onClick: () => void;
    children: React.ReactNode;
}