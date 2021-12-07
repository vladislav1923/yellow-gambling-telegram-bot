/* eslint-disable no-var */
/* https://javascript.plainenglish.io/typescript-and-global-variables-in-node-js-59c4bf40cb31 */
import { Redis } from 'ioredis';

declare global {
    var cacheStore: Redis;
}
export { };