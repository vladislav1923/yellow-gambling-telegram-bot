import IORedis from 'ioredis';
import { env, exit } from 'process';

const initCacheStore = async (): Promise<void> => {
    const { REDIS_PORT, REDIS_EXPIRE_SECONDS } = env;
    if (!REDIS_PORT || !REDIS_EXPIRE_SECONDS) {
        console.error('Env redis variables are not defined');
        exit(1);
    }

    global.cacheStore = new IORedis(REDIS_PORT);
    console.log('Cache store connected');
};

const getFromCache = async (key: string): Promise<string | null> => {
    const record = await global.cacheStore.get(key);
    if (record) {
        console.log(`Record by ${key} extract from cache`);
        return record;
    }

    return null;
};

const setToCache = async (key: string, value: string): Promise<void> => {
    const { REDIS_EXPIRE_SECONDS } = env;
    await global.cacheStore.set(key, value, 'EX', REDIS_EXPIRE_SECONDS);
    const keys = await global.cacheStore.keys('*');
    console.log(`Record named ${key} has been cached. Cache store includes ${keys.length} records`);
};

export { initCacheStore, getFromCache, setToCache };