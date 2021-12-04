const initCache = (): void => {
    if (!global.cache) {
        global.cache = new Map();
    }
};

const getMessageToCache = (date: string): string | undefined => {
    return global.cache.get(date);
};

const setMessageToCache = (date: string, message: string): void => {
    global.cache.clear();
    global.cache.set(date, message);
};

export { initCache, getMessageToCache, setMessageToCache };