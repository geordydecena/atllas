import axios from 'axios';
import { getErrorMessage } from '../../utils/utils';
import { LOCAL_SERVER_URL, SEARCH_CACHE_KEY, NUM_ROWS } from '../../constants/constants';
import { cache } from './cache/cache';

export default async function handler(req, res) {
    try {
        const { index, updateCache, field, asc, search } = req.body

        const cachedData = cache.get(SEARCH_CACHE_KEY);
        if (cachedData && !updateCache) {
            return res.status(200).json({
                users: cachedData.slice(index, index + NUM_ROWS),
            });
        }
        const { data: { data } } = await axios.post(`${LOCAL_SERVER_URL}/users/search`, { field, asc, search });
        cache.set(SEARCH_CACHE_KEY, data.users);

        res.status(200).json({
            users: data.users.slice(index, index + NUM_ROWS),
            count: data.count
        });
    } catch (e) {
        res.status(400).json({ message: getErrorMessage(e) });
    }
}