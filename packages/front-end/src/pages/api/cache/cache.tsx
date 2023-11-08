const LRUCache = require('lru-cache');
export const cache = new LRUCache({ max: 100 });