import dayjs from "dayjs";

export const standardDateFormat = "YYYY-MM-DD HH:mm:00";
export const formatDate = (date) => dayjs(date).format(standardDateFormat);
