export interface IFilterMenuContext {
    selectedDepartments: number[];
    setSelectedDepartments: React.Dispatch<React.SetStateAction<number[]>>;

    selectedPriorities: number[];
    setSelectedPriorities: React.Dispatch<React.SetStateAction<number[]>>;

    selectedEmployees: number[];
    setSelectedEmployees: React.Dispatch<React.SetStateAction<number[]>>;
}
