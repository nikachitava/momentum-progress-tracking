export interface IDropdownCheckboxItem {
    title: string;
	isSelected: boolean;
	onSelect: () => void;
	icon?: string;
}