export const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[1].length === 11) ? match[1] : null;
};

export const getImgUrl = (img) => {
    if (!img) return null;
    if (typeof img === "string") return img.trim() || null;
    if (typeof img === "object") return (img.url && img.url.trim()) ? img.url.trim() : (img.src && img.src.trim() ? img.src.trim() : null);
    return null;
};
