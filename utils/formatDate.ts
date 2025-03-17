export const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("ka-GE", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};