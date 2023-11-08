import axios from 'axios';
import { getErrorMessage } from '../../utils/utils';
import { cache } from './cache/cache';
import { localServerURL } from '../../constants/constants';

export default async function handler(req, res) {
    try {
        const { id } = req.body;
        const cachedData = cache.get(id);
        if (cachedData) {
            return res.status(200).json({ data: cachedData });
        }
        const { data } = await axios.post(`${localServerURL}/users/details`, req.body);
        cache.set(id, data.data);

        res.status(200).json(data);
    } catch (e) {
        res.status(400).json({ message: getErrorMessage(e) });
    }
}