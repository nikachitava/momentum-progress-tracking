export const mapToOptions = <T extends Record<string, any>>(
    items: T[],
    valueKey: keyof T,
    labelKey: keyof T | (keyof T)[],
    iconKey?: keyof T
): { value: string; label: string; icon?: string }[] => {
    return items.map((item) => {
        const label = Array.isArray(labelKey)
            ? labelKey.map((key) => item[key]).join(" ")
            : String(item[labelKey]);

        const option: { value: string; label: string; icon?: string } = {
            value: String(item[valueKey]),
            label,
        };

        if (iconKey && item[iconKey] !== undefined) {
            option.icon = String(item[iconKey]);
        }

        return option;
    });
};
