import moment from "moment";

const fileFormat = (url) => {

    const fileExt = url.split(".").pop();

    if (
        fileExt === "mp4" ||
        fileExt === "webm" ||
        fileExt === "ogg"
    ) return "video";
    if (
        fileExt === "mp3" ||
        fileExt === "wav"
    ) return "audio";
    if (
        fileExt === "png" ||
        fileExt === "jpg" ||
        fileExt === "jpeg" ||
        fileExt === "gif"
    ) return "image";

    return "file";



}

const transformImage = (url = "", width = 100) => {
    if (typeof url !== "string" || !url) {
        console.error('Invalid URL:', url);
        return ''; // Or return a default placeholder URL
    }

    const newUrl = url.replace("upload/", `upload/dpr_auto/w_${width}/`);
    return newUrl;
};


const getLast7Days = () => {
    const currentDate = moment();

    const last7Days = [];

    for (let i = 0; i < 7; i++) {
        const dayDate = currentDate.clone().subtract(i, "days")
        const dayName = dayDate.format("dddd")

        last7Days.unshift(dayName)
    }

    return last7Days
}

const getOrSaveFromLoclStorage = ({ key, value, get }) => {
    if (get) {
        const storedValue = localStorage.getItem(key);
        try {
            return storedValue ? JSON.parse(storedValue) : null;
        } catch (error) {
            console.error(`Error parsing JSON from localStorage key "${key}":`, error);
            return null;
        }
    } else {
        localStorage.setItem(key, JSON.stringify(value));
    }
}


export { fileFormat, transformImage, getLast7Days, getOrSaveFromLoclStorage };