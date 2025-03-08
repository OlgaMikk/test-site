export const getMonth = (month?: number) => {
    if (!month) {
        return "";
    }

    const selectedMonth = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
    ].find((_, idx) => idx + 1 === month);

    return selectedMonth ? selectedMonth : "";
};
